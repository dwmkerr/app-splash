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

    //  Normally we would modify the contents file, but it might not exist. If
    //  it doesn't, then create it from the template.
    const contentsPath = path.join(launchImageFolder, 'Contents.json');
    if (!fs.existsSync(contentsPath)) {
      fs.writeFileSync(contentsPath, JSON.stringify(contentsTemplate, null, 2), 'utf-8');
    }

    //  We've got the launch image folder. Get the contents Json.
    const contents = JSON.parse(fs.readFileSync(contentsPath, 'utf8'));
    contents.images = [];

    //  We currently have an issue where not each image has a size, so for now
    //  skip any image which doesn't yet have a size defined.
    const images = contentsTemplate.images.filter((image) => {
      if (image.size) return true;
      console.log(`Warning: unknown image size for ${image.idiom} ${image.orientation} ${image.extent} ${image.scale}`);
      return false;
    });

    //  Generate each image in the full icon set, updating the contents.
    return Promise.all(images.map((image) => {
      const targetName = `${image.idiom}-${image.size}-${image.scale}.png`;
      const targetPath = path.join(launchImageFolder, targetName);
      const targetScale = parseInt(image.scale.slice(0, 1), 10);
      const targetSize = image.size.split('x').map(p => p * targetScale).join('x');
      return resizeImage(sourceImage, targetPath, targetSize)
        .then(() => {
          results.images.push(targetName);
          contents.images.push({
            orientation: image.orientation,
            extent: image.extent,
            'minimum-system-version': image['minimum-system-version'],
            subtype: image.subtype,
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
