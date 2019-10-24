
# React Native AEP Media Extension

[![npm version](https://badge.fury.io/js/%40adobe%2Freact-native-acpmedia.svg)](https://badge.fury.io/js/%40adobe%2Freact-native-acpmedia) ![npm](https://img.shields.io/npm/dm/@adobe/react-native-acpmedia) [![CircleCI](https://img.shields.io/circleci/project/github/adobe/react-native-acpmedia/master.svg?logo=circleci)](https://circleci.com/gh/adobe/workflows/react-native-acpmedia) ![NPM](https://img.shields.io/npm/l/@adobe/react-native-acpmedia.svg)

> Note: This package is currently in beta, use with caution. ⚠️

`@adobe/react-native-acpmedia` is a wrapper around the iOS and Android [AEP Media SDK](https://aep-sdks.gitbook.io/docs/using-mobile-extensions/adobe-media-analytics) to allow for integration with React Native applications. Functionality to enable Adobe Media Analytics is provided entirely through JavaScript documented below.


## Installation

You need to install the SDK with [npm](https://www.npmjs.com/) and configure the native Android/iOS project in your react native project. Before installing the Media extension it is recommended to begin by installing the [Core extension](https://github.com/adobe/react-native-acpcore) and the [Analytics extension](https://github.com/adobe/react-native-acpanalytics).

> Note: If you are new to React Native we suggest you follow the [React Native Getting Started](<https://facebook.github.io/react-native/docs/getting-started.html>) page before continuing.

### 1. Create React Native project

First create a React Native project:

```bash
react-native init MyReactApp
```

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

### [Media](https://aep-sdks.gitbook.io/docs/using-mobile-extensions/adobe-media-analytics)

##### Importing the extension:
```javascript
import {ACPMedia} from '@adobe/react-native-acpmedia';
```

##### Getting the extension version:

```javascript
ACPMedia.extensionVersion().then(version => console.log("AdobeExperienceSDK: ACPMedia version: " + version));
```

##### Registering the extension with ACPCore:

> Note: It is recommended to initialize the SDK via native code inside your AppDelegate and MainApplication in iOS and Android respectively. However, you can still initialize the SDK in Javascript. For more information see how to initialize [Core](https://github.com/adobe/react-native-acpcore#initializing-the-sdk).

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

```javascript
ACPMedia.registerExtension();
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

##### Create a media object:
```javascript
let mediaObject = ACPMedia.createMediaObject("media-name", "media-id", 60, ACPMediaConstants.ACPMediaStreamTypeVod, ACPMediaType.Video);
```

##### Create a AdBreak object:
```javascript
let adBreakObject = ACPMedia.createAdBreakObject("adbreak-name", 1, 0);
```

##### Create a ad object:
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

##### trackEvent:
```javascript
let adBreakObject = ACPMedia.createAdBreakObject("adbreak-name", 1, 0);
tracker.trackEvent(ACPMediaEvent.AdBreakStart, adBreakObject, null);
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

##### Media events

This defines the type of a tracking event.

```javascript
import {ACPMediaEvent} from '@adobe/react-native-acpmedia';

ACPMediaEvent.AdBreakStart
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
