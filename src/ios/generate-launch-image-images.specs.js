const fs = require('fs');
const expect = require('chai').expect;
const generateLaunchImageImages = require('./generate-launch-image-images');
const deleteIfExists = require('../utils/delete-if-exists');
const fileExists = require('../utils/file-exists');

const sourceImage = 'splash.png';

describe('generate-launch-image-images', () => {
  it.only('should be able to generate launch image images for the React Native App', () => {
    const files = [
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimage/ipad-1024x768-1x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimage/ipad-1536x2048-2x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimage/ipad-2048x1536-2x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimage/ipad-768x1024-1x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimage/iphone-1125x2436-3x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimage/iphone-1242x2208-3x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimage/iphone-2208x1242-3x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimage/iphone-2436x1125-3x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimage/iphone-320x480-1x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimage/iphone-640x1136-2x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimage/iphone-640x960-2x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimage/iphone-750x1334-2x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimage/tv-1920x1080-1x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimage/tv-3840x2160-2x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimages/ipad-1024x768-1x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimages/ipad-1536x2048-2x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimages/ipad-2048x1536-2x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimages/ipad-768x1024-1x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimages/iphone-1125x2436-3x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimages/iphone-1242x2208-3x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimages/iphone-2208x1242-3x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimages/iphone-2436x1125-3x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimages/iphone-320x480-1x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimages/iphone-640x1136-2x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimages/iphone-640x960-2x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimages/iphone-750x1334-2x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimages/tv-1920x1080-1x.png',
      'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimages/tv-3840x2160-2x.png',
    ];

    const launchImagesFolder = 'test/ReactNativeApp/ios/ReactNativeApp/Images.xcassets/LaunchImage.launchimage';
    if (!fs.existsSync(launchImagesFolder)) fs.mkdirSync(launchImagesFolder);

    //  Delete all of the files we're expecting to create, then generate them.
    return Promise.all(files.map(deleteIfExists))
      .then(() => (
        generateLaunchImageImages(sourceImage, launchImagesFolder)
      ))
      .then(() => Promise.all(files.map(fileExists)))
      .then((filesDoExist) => {
        filesDoExist.forEach((exists, index) => {
          expect(exists, `${files[index]} should be generated`).to.equal(true);
        });
      });
  });

  it('should be able to generate launch image images for the Cordova iconset', () => {
    const files = [
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/ipad-40x40-1x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/ipad-29x29-2x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/ipad-29x29-1x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/iphone-60x60-2x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/iphone-57x57-2x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/iphone-57x57-1x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/iphone-40x40-2x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/iphone-29x29-2x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/iphone-29x29-1x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/ipad-40x40-2x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/ipad-50x50-2x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/ipad-50x50-1x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/ipad-72x72-1x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/ipad-72x72-2x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/ipad-76x76-1x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/ipad-76x76-2x.png',
      'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset/ios-marketing-1024x1024-1x.png',
    ];

    //  Delete all of the files we're expecting to create, then generate them.
    return Promise.all(files.map(deleteIfExists))
      .then(() => (
        generateLaunchImageImages(sourceImage, 'test/CordovaApp/platforms/ios/ionic_app/Images.xcassets/AppIcon.appiconset')
      ))
      .then(() => Promise.all(files.map(fileExists)))
      .then((filesDoExist) => {
        filesDoExist.forEach((exists, index) => {
          expect(exists, `${files[index]} should be generated`).to.equal(true);
        });
      });
  });

  it('should be able to generate launch image images for the Native iconset', () => {
    const files = [
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/ipad-40x40-1x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/ipad-29x29-2x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/ipad-29x29-1x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/iphone-60x60-2x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/iphone-57x57-2x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/iphone-57x57-1x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/iphone-40x40-2x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/iphone-29x29-2x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/iphone-29x29-1x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/ipad-40x40-2x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/ipad-50x50-2x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/ipad-50x50-1x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/ipad-72x72-1x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/ipad-72x72-2x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/ipad-76x76-1x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/ipad-76x76-2x.png',
      'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset/ios-marketing-1024x1024-1x.png',
    ];

    //  Delete all of the files we're expecting to create, then generate them.
    return Promise.all(files.map(deleteIfExists))
      .then(() => (
        generateLaunchImageImages(sourceImage, 'test/NativeApp/ios/native_app/Assets.xcassets/AppIcon.appiconset')
      ))
      .then(() => Promise.all(files.map(fileExists)))
      .then((filesDoExist) => {
        filesDoExist.forEach((exists, index) => {
          expect(exists, `${files[index]} should be generated`).to.equal(true);
        });
      });
  });
});
