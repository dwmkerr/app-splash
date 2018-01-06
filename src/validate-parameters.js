module.exports = function validateParameters(parameters) {
  //  Validate or assign the source image.
  const sourceImage = parameters.sourceImage || 'splash.png';

  //  Validate or assign the search path.
  const searchRoot = parameters.searchRoot || './';

  //  Validate or assign the platforms.
  const platformsString = parameters.platforms || 'ios';
  const platforms = platformsString.split(',');
  for (let i = 0; i < platforms.length; i += 1) {
    if (!/android|ios/.test(platforms[i])) {
      throw new Error(`${platforms[i]} is not a valid platform.`);
    }
  }

  return { sourceIcon, searchRoot, platforms };
};
