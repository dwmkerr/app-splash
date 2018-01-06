const expect = require('chai').expect;
const generate = require('./generate');

describe('generate', () => {
  it('should be able to generate test splash images', () => {
    const parameters = {
      sourceImage: 'splash.png',
      searchPath: './',
    };

    //  Delete all of the files we're expecting to create, then generate them.
    return generate(parameters).then((results) => {
      expect(results).not.to.equal(null);
      expect(results.launchImages.length).to.equal(3);
    });
  });
});
