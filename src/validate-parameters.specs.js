const assert = require('assert');
const validateParameters = require('./validate-parameters');

describe('validateParameters', () => {
  function validParameters() {
    return {
      sourceImage: 'splash.png',
      searchRoot: './',
      platforms: 'ios',
    };
  }

  it('should provide a default source image', () => {
    const params = validParameters();
    delete params.sourceImage;
    const parameters = validateParameters(params);
    assert.equal(parameters.sourceImage, 'splash.png');
  });

  it('should provide a default search root', () => {
    const params = validParameters();
    delete params.searchRoot;
    const parameters = validateParameters(params);
    assert.equal(parameters.searchRoot, './');
  });

  it('should provide a default set of platforms', () => {
    const params = validParameters();
    delete params.platforms;
    const parameters = validateParameters(params);
    assert.deepEqual(parameters.platforms, ['ios']);
  });

  it('should reject invalid platforms', () => {
    const params = validParameters();
    params.platforms = 'jos';
    assert.throws(() => validateParameters(params), /jos.*not a valid platform/);
  });
});
