# ACPMediaTVapp

> Note: Commands are assuming you're in the root directory of the repository.

> Note: If you are new to React Native we suggest you follow the [React Native Getting Started](<https://facebook.github.io/react-native/docs/getting-started.html>) page before continuing.

How to run the sample app:

### Add your App Id:
In `ios/**/AppDelegate.m`, find the call to `configureWithAppId` and add your app id.

In `android/**/MainApplication.java`, find the call to `configureWithAppId` and add your app id.

#### Run instructions for TVOS:

```
cd sample/ACPMediaTVapp/ && npm install && cd ios/ && pod update && cd .. && npx react-native run-ios  --simulator "Apple TV" --scheme "ACPMediaTVapp-tvOS"
```

or
```
cd sample/ACPMediaTVapp/ && npm install && cd ios/ && pod update
```
Then, open the ACPMediaTVapp.xcworkspace project under the `ios` directory and hit run.

#### Run instructions for Android:

Have an Android emulator running (quickest way to get started), or a device connected. https://developer.android.com/studio/run/emulator-commandline

```
cd sample/ACPMediaTVApp/ && npm install && react-native run-android
```

### Troubleshooting

If you're having issues running the sample app, ensure you can at least run a default react native app.

```
react-native init MyReactApp
cd MyReactApp
react-native run-ios or react-native run-android
```
