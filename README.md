# React Native AEP Media Extension

## Notice of deprecation

Since *April 25, 2023*, [Apple has required](https://developer.apple.com/news/?id=jd9wcyov) apps submitted to the App Store to be built with Xcode 14.1 or later. The Experience Platform Mobile SDKs and extensions outlined below were built with prior versions of Xcode and are no longer compatible with iOS and iPadOS given Apple’s current App Store requirements. Consequently, on *August 31, 2023*, Adobe will be deprecating support for the following Experience Platform Mobile SDKs and wrapper extensions:

- [ACP iOS SDK](https://developer.adobe.com/client-sdks/previous-versions/documentation/sdk-versions/#ios)
- [Cordova](https://developer.adobe.com/client-sdks/previous-versions/documentation/sdk-versions/#cordova)
- [Flutter for ACP](https://developer.adobe.com/client-sdks/previous-versions/documentation/sdk-versions/#flutter)
- [React Native for ACP](https://developer.adobe.com/client-sdks/previous-versions/documentation/sdk-versions/#react-native)
- [Xamarin](https://developer.adobe.com/client-sdks/previous-versions/documentation/sdk-versions/#xamarin)

After *August 31, 2023*, applications already submitted to the App Store that contain these SDKs and wrapper extensions will continue to operate, however, Adobe will not be providing security updates or bug fixes, and these SDKs and wrapper extensions will be provided as-is exclusive of any warranty, due to the App Store policy outlined above.

We encourage all customers to migrate to the latest Adobe Experience Platform versions of the Mobile SDK to ensure continued compatibility and support. Documentation for the latest versions of the Adobe Experience Platform Mobile SDKs can be found [here](https://developer.adobe.com/client-sdks/documentation/current-sdk-versions/). The iOS migration guide can be found [here](https://developer.adobe.com/client-sdks/previous-versions/documentation/migrate-to-swift/).

---

[![npm version](https://badge.fury.io/js/%40adobe%2Freact-native-acpmedia.svg)](https://www.npmjs.com/package/@adobe/react-native-acpmedia) 
[![npm downloads](https://img.shields.io/npm/dm/@adobe/react-native-acpmedia)](https://www.npmjs.com/package/@adobe/react-native-acpmedia)
[![CircleCI](https://img.shields.io/circleci/project/github/adobe/react-native-acpmedia/main.svg?logo=circleci)](https://circleci.com/gh/adobe/workflows/react-native-acpmedia) 
[![license](https://img.shields.io/npm/l/@adobe/react-native-acpmedia.svg)](https://github.com/adobe/react-native-acpmedia/blob/main/LICENSE)

`@adobe/react-native-acpmedia` is a wrapper around the iOS, tvOS and Android [AEP Media SDK](https://developer.adobe.com/client-sdks/previous-versions/documentation/adobe-media-analytics/) to allow for integration with React Native applications. Functionality to enable Adobe Media Analytics is provided entirely through JavaScript documented below.

## Installation

You need to install the SDK with [npm](https://www.npmjs.com/) and configure the native Android/iOS project in your react native project. Before installing the Media extension it is recommended to begin by installing the [Core extension](https://github.com/adobe/react-native-acpcore) and the [Analytics extension](https://github.com/adobe/react-native-acpanalytics).

> Note: If you are new to React Native we suggest you follow the [React Native Getting Started](<https://facebook.github.io/react-native/docs/getting-started.html>) page before continuing.

### 1. Create React Native project

First create a React Native project:

```bash
react-native init MyReactApp
```
> Note: Follow [React Native tvos support](https://reactnative.dev/blog/2020/03/26/version-0.62#moving-apple-tv-to-react-native-tvos) to create app with tvos target.

### 2. Install JavaScript packages

Install and link the `@adobe/react-native-acpmedia` package:

```bash
cd MyReactApp
npm install @adobe/react-native-acpmedia
```

#### 2.1 Link
- **React Native 0.60+**


[CLI autolink feature](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) links the module while building the app.


- **React Native <= 0.59**


```bash
react-native link @adobe/react-native-acpmedia
```

*Note* For `iOS` using `cocoapods`, run:

```bash
cd ios/ && pod install
```


## Tests
This project contains jest unit tests which are contained in the `__tests__` directory, to run the tests locally:
```
make run-tests-locally
```

## Usage

### Media

##### Importing the extension:
```javascript
import {ACPMedia} from '@adobe/react-native-acpmedia';
```

##### Getting the extension version:

```javascript
ACPMedia.extensionVersion().then(version => console.log("AdobeExperienceSDK: ACPMedia version: " + version));
```

##### Registering the extension with ACPCore:

> Note: It is recommended to initialize the SDK via native code inside your AppDelegate and MainApplication in iOS and Android respectively.

##### **iOS**
```objective-c
#import <RCTACPMedia/ACPMedia.h>

[ACPMedia registerExtension];
```

##### **Android:**
```java
import com.adobe.marketing.mobile.Media;

Media.registerExtension();
```

#### Media API:

##### Create a media tracker:
```javascript
ACPMedia.createTracker().then(tracker =>
  this.setState({currentTracker: tracker})
);
```

##### Create a media tracker with optional configuration:
```javascript
var config = new Object();
config[ACPMediaConstants.ACPMediaKeyConfigChannel] = "customer-channel";
config[ACPMediaConstants.ACPMediaKeyConfigDownloadedContent] = true;
ACPMedia.createTrackerWithConfig(config).then(tracker =>
  this.setState({currentTracker: tracker})
);
```

##### Create a Media object:
```javascript
let mediaObject = ACPMedia.createMediaObject("media-name", "media-id", 60, ACPMediaConstants.ACPMediaStreamTypeVod, ACPMediaType.Video);
```

##### Create an AdBreak object:
```javascript
let adBreakObject = ACPMedia.createAdBreakObject("adbreak-name", 1, 0);
```

##### Create an Ad object:
```javascript
let adObject = ACPMedia.createAdObject("media-name", "ad-id", 1, 30);
```

##### Create a chapter object:
```javascript
let chapterObject = ACPMedia.createChapterObject('chapter-name', 2, 30, 1);
```

##### Create a QoE object:
```javascript
let qoeObject = ACPMedia.createQoEObject(1000000, 2, 25, 10);
```

##### Create a State object:
```javascript
let stateObject = ACPMedia.createStateObject(ACPMediaConstants.ACPMediaPlayerStateFullScreen);
```

#### Media Tracker API:

##### trackSessionStart:
```javascript
let mediaObject = ACPMedia.createMediaObject("media-name", "media-id", 60, ACPMediaConstants.ACPMediaStreamTypeVod, ACPMediaType.Video);
var mediaMetadata = new Object();
mediaMetadata[ACPMediaConstants.ACPVideoMetadataKeyShow] = "Sample Show";
mediaMetadata[ACPMediaConstants.ACPVideoMetadataKeySeason] = "Sample Season";

// Custom metadata keys
mediaMetadata["isUserLoggedIn"] = "false";
mediaMetadata["tvStation"] = "Sample TV station";

tracker.trackSessionStart(mediaObject, mediaMetadata);
```

##### trackPlay:
```javascript
tracker.trackPlay();
```

##### trackPause:
```javascript
tracker.trackPause();
```

##### trackComplete:
```javascript
tracker.trackComplete();
```

##### trackSessionEnd:
```javascript
tracker.trackSessionEnd();
```

##### trackError:
```javascript
tracker.trackError("errorId");
```

#### trackEvent APIs

**Tracking AdBreaks**

##### trackEvent(AdBreakStart):
```javascript
let adBreakObject = ACPMedia.createAdBreakObject("adbreakName", 1, 0);
tracker.trackEvent(ACPMediaEvent.EventAdBreakStart, adBreakObject, null);
```

##### trackEvent(AdBreakComplete):
```javascript
tracker.trackEvent(ACPMediaEvent.EventAdBreakComplete, null, null);
```

**Tracking ads**

##### trackEvent(AdStart):
```javascript
let adObject = ACPMedia.createAdObject("adName", "adId", 1.0, 20.0);
var adMetadata = new Object();
adMetadata[ACPMediaConstants.ACPAdMetadataKeyAdvertiser] = "SampleAdvertiser";

tracker.trackEvent(ACPMediaEvent.EventAdStart, adObject, adMetadata);
```

##### trackEvent(AdSkip):
```javascript
tracker.trackEvent(ACPMediaEvent.EventAdSkip, null, null);
```

##### trackEvent(AdComplete):
```javascript
tracker.trackEvent(ACPMediaEvent.EventAdComplete, null, null);
```

**Tracking chapters**

##### trackEvent(ChapterStart):
```javascript
let chapterObject = ACPMedia.createChapterObject("chapterName", 1.0, 30.0, 1.0);
var chapterMetadata = new Object();
chapterMetadata["segmentType"] = "Sample segment type";

tracker.trackEvent(ACPMediaEvent.EventChapterStart, chapterObject, chapterMetadata);
```

##### trackEvent(ChapterSkip):
```javascript
tracker.trackEvent(ACPMediaEvent.EventChapterSkip, null, null);
```

##### trackEvent(ChapterComplete):
```javascript
tracker.trackEvent(ACPMediaEvent.EventChapterComplete, null, null);
```

**Tracking Player States**

##### trackEvent(StateStart):
```javascript
let stateObject = ACPMedia.createStateObject(ACPMediaConstants.ACPMediaPlayerStateFullScreen);

tracker.trackEvent(ACPMediaEvent.EventStateStart, stateObject, null);
```

##### trackEvent(StateEnd):
```javascript
let stateObject = ACPMedia.createStateObject(ACPMediaConstants.ACPMediaPlayerStateFullScreen);

tracker.trackEvent(ACPMediaEvent.EventStateEnd, stateObject, null);
```

**Tracking Playback events**

##### trackEvent(BufferStart):
```javascript
tracker.trackEvent(ACPMediaEvent.EventBufferStart, null, null);
```

##### trackEvent(BufferComplete):
```javascript
tracker.trackEvent(ACPMediaEvent.EventBufferComplete, null, null);
```

##### trackEvent(SeekStart):
```javascript
tracker.trackEvent(ACPMediaEvent.EventSeekStart, null, null);
```

##### trackEvent(SeekComplete):
```javascript
tracker.trackEvent(ACPMediaEvent.EventSeekComplete, null, null);
```

**Tracking bitrate changes**

##### trackEvent(BitrateChange):
```javascript
// If the new bitrate value is available provide it to the tracker.
let qoeObject = ACPMedia.createQoEObject(2000000, 4, 23, 11);
tracker.updateQoEObject(qoeObject);

tracker.trackEvent(ACPMediaEvent.EventBitrateChange, null, null);
```

##### updateCurrentPlayhead:
```javascript
tracker.updateCurrentPlayhead(1);
```

##### updateQoEObject:
```javascript
let qoeObject = ACPMedia.createQoEObject(1000000, 2, 25, 10);
tracker.updateQoEObject(qoeObject);
```

#### Media Constants:

##### MediaType:

This defines the type of a media that is currently tracked.

```javascript
import {ACPMediaType} from '@adobe/react-native-acpmedia';

ACPMediaType.Video
ACPMediaType.Audio
```

##### StreamType:

This defines the stream type of the content that is currently tracked.

```javascript
import {ACPMediaConstants} from '@adobe/react-native-acpmedia';

ACPMediaConstants.ACPMediaStreamTypeVod
ACPMediaConstants.ACPMediaStreamTypeLive
ACPMediaConstants.ACPMediaConstantsACPMediaStreamTypeLinear
ACPMediaConstants.ACPMediaStreamTypePodcast
ACPMediaConstants.ACPMediaStreamTypeAudiobook
ACPMediaConstants.ACPMediaStreamTypeAod
```

##### Standard video constants

This defines the standard metadata keys for video streams.

```javascript
import {ACPMediaConstants} from '@adobe/react-native-acpmedia';

ACPMediaConstants.ACPVideoMetadataKeyShow
ACPMediaConstants.ACPVideoMetadataKeySeason
ACPMediaConstants.ACPVideoMetadataKeyEpisode
ACPMediaConstants.ACPVideoMetadataKeyAssetId
ACPMediaConstants.ACPVideoMetadataKeyGenre
ACPMediaConstants.ACPVideoMetadataKeyFirstAirDate
ACPMediaConstants.ACPVideoMetadataKeyFirstDigitalDate
ACPMediaConstants.ACPVideoMetadataKeyRating
ACPMediaConstants.ACPVideoMetadataKeyOriginator
ACPMediaConstants.ACPVideoMetadataKeyNetwork
ACPMediaConstants.ACPVideoMetadataKeyShowType
ACPMediaConstants.ACPVideoMetadataKeyAdLoad
ACPMediaConstants.ACPVideoMetadataKeyMvpd
ACPMediaConstants.ACPVideoMetadataKeyAuthorized
ACPMediaConstants.ACPVideoMetadataKeyDayPart
ACPMediaConstants.ACPVideoMetadataKeyFeed
ACPMediaConstants.ACPVideoMetadataKeyStreamFormat
```

##### Standard audio constants

This defines the standard metadata keys for audio streams.

```javascript
import {ACPMediaConstants} from '@adobe/react-native-acpmedia';

ACPMediaConstants.ACPAudioMetadataKeyArtist
ACPMediaConstants.ACPAudioMetadataKeyAlbum
ACPMediaConstants.ACPAudioMetadataKeyLabel
ACPMediaConstants.ACPAudioMetadataKeyAuthor
ACPMediaConstants.ACPAudioMetadataKeyStation
ACPMediaConstants.ACPAudioMetadataKeyPublisher
```

##### Standard ad constants

This defines the standard metadata keys for ads.

```javascript
import {ACPMediaConstants} from '@adobe/react-native-acpmedia';

ACPMediaConstants.ACPAdMetadataKeyAdvertiser
ACPMediaConstants.ACPAdMetadataKeyCampaignId
ACPMediaConstants.ACPAdMetadataKeyCreativeId
ACPMediaConstants.ACPAdMetadataKeyPlacementId
ACPMediaConstants.ACPAdMetadataKeySiteId
ACPMediaConstants.ACPAdMetadataKeyCreativeUrl
```

##### Player state constants

```javascript
import {ACPMediaConstants} from '@adobe/react-native-acpmedia';

ACPMediaConstants.ACPMediaPlayerStateFullScreen
ACPMediaConstants.ACPMediaPlayerStatePictureInPicture
ACPMediaConstants.ACPMediaPlayerStateClosedCaption
ACPMediaConstants.ACPMediaPlayerStateInFocus
ACPMediaConstants.ACPMediaPlayerStateMute
```

##### Media events

This defines the type of a tracking event.

```javascript
import {ACPMediaEvent} from '@adobe/react-native-acpmedia';

ACPMediaEvent.EventAdBreakStart
ACPMediaEvent.EventAdBreakComplete
ACPMediaEvent.EventAdStart
ACPMediaEvent.EventAdComplete
ACPMediaEvent.EventAdSkip
ACPMediaEvent.EventChapterStart
ACPMediaEvent.EventChapterComplete
ACPMediaEvent.EventChapterSkip
ACPMediaEvent.EventSeekStart
ACPMediaEvent.EventSeekComplete
ACPMediaEvent.EventBufferStart
ACPMediaEvent.EventBufferComplete
ACPMediaEvent.EventBitrateChange
```

##### Media resume

Constant to denote that the current tracking session is resuming a previously closed session. This information must be provided when starting a tracking session.

```javascript
import {ACPMediaConstants} from '@adobe/react-native-acpmedia';

ACPMediaConstants.ACPMediaKeyMediaResumed
```

## Contributing
See [CONTRIBUTING](CONTRIBUTING.md)

## License
See [LICENSE](LICENSE)
