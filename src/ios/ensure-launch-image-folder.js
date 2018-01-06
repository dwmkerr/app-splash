const find = require('../utils/find');

//  Given a search root, finds all iOS xcassets folders.
module.exports = function findXCAssetsFolders(searchRoot) {
  return find(searchRoot, (file, stat) => {
    //  exclude node modules from the search.
    if (file.match(/node_modules/)) return false;

    //  only grab the launchimage folders.
    return file.match(/Images.xcassets/) && stat.isDirectory();
  });
};
