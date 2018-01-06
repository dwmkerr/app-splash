const expect = require('chai').expect;
const findLaunchImageFolders = require('./find-launch-image-folders');

describe('find-launch-image-folders', () => {
  it('should not find any iconsets in the node_modules/ folder', () => {
    return findLaunchImageFolders('./node_modules').then((iconsets) => {
      expect(iconsets.length).to.equal(0);
    });
  });

  it('should be able to find the React Native iconset', () => {
    return findLaunchImageFolders('./test/ReactNativeIconTest').then((iconsets) => {
      expect(iconsets.length).to.equal(1);
      expect(iconsets).to.include('test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset');
    });
  });

  it('should be able to find the React Native iconset with a deep search path', () => {
    return findLaunchImageFolders('./test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets').then((iconsets) => {
      expect(iconsets.length).to.equal(1);
      expect(iconsets).to.include('test/ReactNativeIconTest/ios/ReactNativeIconTest/Images.xcassets/AppIcon.appiconset');
    });
  });

  it('should be able to find the Cordova iconset', () => {
    return findLaunchImageFolders('./test/CordovaApp').then((iconsets) => {
      expect(iconsets.length).to.equal(1);
      expect(iconsets).to.include('test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset');
    });
  });

  it('should be able to find the Native iconset', () => {
    return findLaunchImageFolders('./test/NativeApp').then((iconsets) => {
      expect(iconsets.length).to.equal(1);
      expect(iconsets).to.include('test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset');
    });
  });
});
