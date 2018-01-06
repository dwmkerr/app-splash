const chalk = require('chalk');
const findLaunchImageFolders = require('./ios/find-launch-image-folders');
const generateLaunchImageImages = require('./ios/generate-launch-image-images');
const validateParameters = require('./validate-parameters');

module.exports = function generate(parameters) {
  //  Validate and coerce the parameters.
  const { sourceImage, searchRoot, platforms } = validateParameters(parameters);

  //  Set up the results object.
  const results = { launchImages: [] };

  return findLaunchImageImages(searchRoot)
    .then(launchImages => Promise.all(launchImages.map((launchImage) => {
      if (!platforms.includes('ios')) return null;

      console.log(`Found iOS launch image: ${launchImage}...`);

      return generateLaunchImageImages(sourceIcon, iconset)
        .then(({ images }) => {
          results.launchImages.push({ launchImage, images });
          launchImages.forEach((launchImage) => {
            console.log(`    ${chalk.green('✓')}  Generated ${launchImages}`);
          });
          console.log(`    ${chalk.green('✓')}  Updated Contents.json`);
        });
    })))
    .then(() => results);
};
