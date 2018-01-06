#!/usr/bin/env node

// We use Node 4 to keep compatibility high, so need the 'use strict' statement.
// eslint-disable-next-line
'use strict';

const chalk = require('chalk');
const program = require('commander');
const pack = require('../package.json');
const isImagemagickInstalled = require('../src/imagemagick/is-imagemagick-installed');
const generate = require('../src/generate');
const fileExists = require('../src/utils/file-exists');

//  Create the program.
program
  .version(pack.version);

//  Define the 'generate' command.
program
  .command('generate')
  .description('Generate all splash images from a single image')
  .option('-i, --image [image]', "The image to use. Defaults to 'splash.png'", 'splash.png')
  .option('-s, --search [optional]', "The folder to search from. Defaults to './'", './')
  .option('-p, --platforms [optional]', "The platforms to splash images for. Defaults to 'ios'", 'ios')
  .action(({ image, search, platforms }) => {
    isImagemagickInstalled()
      .catch((err) => { throw err; })
      .then((imageMagickInstalled) => {
        if (!imageMagickInstalled) {
          console.error('  Error: ImageMagick must be installed. Try:');
          console.error('    brew install imagemagick');
          return process.exit(1);
        }

        //  Check that we have a source image.
        return fileExists(image);
      })
      .then((exists) => {
        if (!exists) {
          console.error(`Source file '${image}' does not exist. Add the file or specify source image with the '--image' parameter.`);
          return process.exit(1);
        }
        //  Generate some icons.
        return generate({ sourceIcon: image, search, platforms });
      })
      .catch((generateErr) => {
        console.error(chalk.red(`An error occurred generating the splash images: ${generateErr.message}`));
        return process.exit(1);
      });
  });

//  Extend the help with some examples.
program.on('--help', () => {
  console.log('  Examples:');
  console.log('');
  console.log('    $ app-splash generate');
  console.log('    $ app-splash generate -i mysplash.png -s ./app/cordova-app');
  console.log('');
});

//  Parse the arguments. If we have no subcommand, show the help.
program.parse(process.argv);
if (program.args.length === 0) {
  program.help();
}
