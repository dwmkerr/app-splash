const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const findXCAssetsFolders = require('./ios/find-xcassets-folders');
const generateLaunchImageImages = require('./ios/generate-launch-image-images');
const validateParameters = require('./validate-parameters');

module.exports = function generate(parameters) {
  //  Validate and coerce the parameters.
  const { sourceImage, searchRoot, platforms } = validateParameters(parameters);

  //  Set up the results object.
  const results = { launchImages: [] };

  return findXCAssetsFolders(searchRoot)
    .then((xcAssetsFolder) => {
      //  Ensure we have a launch images folder.
      const launchImagesFolder = path.join(xcAssetsFolder, 'LaunchImages.launchimages');
      if (!fs.existsSync(launchImagesFolder)) fs.mkdirSync(launchImagesFolder);
      return launchImagesFolder;
    })
    .then(launchImages => Promise.all(launchImages.map((launchImageFolder) => {
      if (!platforms.includes('ios')) return null;

      console.log(`Found iOS launch image folder: ${launchImageFolder}...`);

      return generateLaunchImageImages(sourceImage, launchImageFolder)
        .then(({ images }) => {
          results.launchImages.push({ launchImageFolder, images });
          launchImages.forEach((launchImage) => {
            console.log(`    ${chalk.green('✓')}  Generated ${launchImage}`);
          });
          console.log(`    ${chalk.green('✓')}  Updated Contents.json`);
        });
    })))
    .then(() => results);
};
