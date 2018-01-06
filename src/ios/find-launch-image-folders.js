const find = require('../utils/find');

//  Given a search root, finds all iOS launchimages.
module.exports = function findLauncImageFolders(searchRoot) {
  return find(searchRoot, (file, stat) => {
    //  exclude node modules from the search.
    if (file.match(/node_modules/)) return false;

    //  only grab the launchimage folders.
    return file.match(/LanchImage.launchimage/) && stat.isDirectory();
  });
};
