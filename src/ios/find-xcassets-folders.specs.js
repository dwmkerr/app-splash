const expect = require('chai').expect;
const findXCAssetsFolders = require('./find-xcassets-folders');

describe('find-xcassets-folders', () => {
  it('should not find any xcasset folders in the node_modules/ folder', () => {
    return findXCAssetsFolders('./node_modules').then((xcassetsFolders) => {
      expect(xcassetsFolders.length).to.equal(0);
    });
  });

  it('should be able to find the React Native xcasset folder', () => {
    return findXCAssetsFolders('./test/ReactNativeApp').then((xcassetsFolders) => {
      expect(xcassetsFolders.length).to.equal(1);
      expect(xcassetsFolders).to.include('test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets');
    });
  });

  it('should be able to find the React Native xcasset folder with a deep search path', () => {
    return findXCAssetsFolders('./test/ReactNativeApp/ios/ReactNativeApp').then((xcassetsFolders) => {
      expect(xcassetsFolders.length).to.equal(1);
      expect(xcassetsFolders).to.include('test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets');
    });
  });

  it('should be able to find the Cordova xcasset folder', () => {
    return findXCAssetsFolders('./test/CordovaApp').then((xcassetsFolders) => {
      expect(xcassetsFolders.length).to.equal(1);
      expect(xcassetsFolders).to.include('test/CordovaApp/platforms/ios/ionic_app/Images.xcassets');
    });
  });

  it('should be able to find the Native xcasset folder', () => {
    return findXCAssetsFolders('./test/NativeApp').then((xcassetsFolders) => {
      expect(xcassetsFolders.length).to.equal(1);
      expect(xcassetsFolders).to.include('test/NativeApp/ios/native_app/Assets.xcassets');
    });
  });
});
