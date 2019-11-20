# ReactNativeSample

This is a sample video player to demostrate how @adobe/react-native-acpmedia can be implemented.

> 1.  Code is implemented in React Native js file. (reactNativeBasicPlayerSample/App.js)

> 2.  Core, Analytics and Media extensions are registered on native platforms

> 3.  App can be run on Android and iOS platforms

> Note: Commands are assuming you're in the root directory of the repository.

> Note: If you are new to React Native we suggest you follow the [React Native Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) page before continuing.

## How to run the sample app:

Make sure device is connected to internet network

#### Add your App Id:

In `ios/**/AppDelegate.m`, find the call to `configureWithAppId` and add your app id.

In `android/**/MainApplication.java`, find the call to `configureWithAppId` and add your app id.

#### Run instructions for iOS:

Run Pod update and Run app

```
cd sample/ReactNativeBasicPlayerSample/ && npm install && cd ios/ && pod update && cd .. && react-native run-ios
```

> Note: If you see an error "Can't find simulator for "iPhoneX"", this is a known [issue](https://github.com/facebook/react-native/issues/23256) with React Native and you should try running the sample app inside of Xcode.

or

```
cd sample/ReactNativeBasicPlayerSample/ && npm install && cd ios/ && pod update
```

Then, open the Xcode project under the `ios` directory and hit run.

#### Run instructions for Android:

Have an Android emulator running (quickest way to get started), or a device connected. https://developer.android.com/studio/run/emulator-commandline

```
cd sample/ReactNativeBasicPlayerSample/ && npm install && react-native run-android
```

Components used in the Sample App: react-native-video, react-native-progress, react-native-vector-icons

Sample App supports portrait view.

#### Debug:

If app is not working

- Check if network is available on device/emulator
- Check App id is set properly for 'configureWithAppId'
