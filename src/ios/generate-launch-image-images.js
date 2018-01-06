const path = require('path');
const fs = require('fs');

const resizeImage = require('../resize/resize-image');
const contentsTemplate = require('./LaunchImage.launchimage.Contents.template.json');

//  Generate xCode launch images given a launchimage folder.
module.exports = function generateLaunchImageImages(sourceImage, launchImageFolder) {
  return new Promise((resolve, reject) => {
    //  Build the results object.
    const results = {
      images: [],
      contentsPath: null,
    };

    //  We've got the launch image folder. Get the contents Json.
    const contentsPath = path.join(launchImageFolder, 'Contents.json');
    const contents = JSON.parse(fs.readFileSync(contentsPath, 'utf8'));
    contents.images = [];

    //  Generate each image in the full icon set, updating the contents.
    return Promise.all(contentsTemplate.images.map((image) => {
      const targetName = `${image.idiom}-${image.size}-${image.scale}.png`;
      const targetPath = path.join(launchImageFolder, targetName);
      const targetScale = parseInt(image.scale.slice(0, 1), 10);
      const targetSize = image.size.split('x').map(p => p * targetScale).join('x');
      return resizeImage(sourceImage, targetPath, targetSize)
        .then(() => {
          results.icons.push(targetName);
          contents.images.push({
            size: image.size,
            idiom: image.idiom,
            scale: image.scale,
            filename: targetName,
          });
        });
    }))
    .then(() => {
      fs.writeFile(contentsPath, JSON.stringify(contents, null, 2), (err) => {
        if (err) return reject(err);
        results.contentsPath = contentsPath;
        return resolve(results);
      });
    });
  });
};
