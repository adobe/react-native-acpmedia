/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.

@flow
@format
*/

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, ScrollView, NativeModules} from 'react-native';
import {ACPCore} from '@adobe/react-native-acpcore';
import {ACPMedia, ACPMediaTracker, ACPMediaConstants, ACPMediaType, ACPMediaEvent} from '@adobe/react-native-acpmedia';

type Props = {};
export default class App extends Component<Props> {

  constructor() {
       super();
       this.state = {
           currentTracker: undefined
     }
   }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ marginTop: 75 }}>
        <Text style={styles.welcome}>ACPMedia Test App</Text>
        <Button title="ACPCore::extensionVersion()" onPress={() => this.coreExtensionVersion()}/>
        <Button title="ACPMedia::extensionVersion()" onPress={() => this.mediaExtensionVersion()}/>
        <Button title="ACPMedia::createTracker()" onPress={() => this.createTracker()}/>
        <Button title="ACPMedia::createTrackerWithConfig(...)" onPress={() => this.createTrackerWithConfig()}/>
        <Button title="ACPMediaTracker::trackSessionStart(...)" onPress={() => this.trackSessionStart()}/>
        <Button title="ACPMediaTracker::trackPlay()" onPress={() => this.trackPlay()}/>
        <Button title="ACPMediaTracker::trackPause()" onPress={() => this.trackPause()}/>
        <Button title="ACPMediaTracker::trackComplete()" onPress={() => this.trackComplete()}/>
        <Button title="ACPMediaTracker::trackSessionEnd()" onPress={() => this.trackSessionEnd()}/>
        <Button title="ACPMediaTracker::trackError(...)" onPress={() => this.trackError()}/>
        <Button title="ACPMediaTracker::trackEvent(...)" onPress={() => this.trackEvent()}/>
        <Button title="ACPMediaTracker::updateCurrentPlayhead(...)" onPress={() => this.updateCurrentPlayhead()}/>
        <Button title="ACPMediaTracker::updateQoEObject(...)" onPress={() => this.updateQoEObject()}/>
        </ScrollView>
      </View>
    );
  }

  coreExtensionVersion() {
    ACPCore.extensionVersion().then(version => console.log("AdobeExperienceSDK: ACPCore version: " + version));
  }

  mediaExtensionVersion() {
    ACPMedia.extensionVersion().then(version => console.log("AdobeExperienceSDK: ACPMedia version: " + version));
  }

  createTracker() {
    ACPMedia.createTracker().then(tracker =>
      this.setState({currentTracker: tracker})
    ).catch(err => console.log(err));
  }

  createTrackerWithConfig() {
    var config = new Object();
    config[ACPMediaConstants.ACPMediaKeyConfigChannel] = "customer-channel";
    config[ACPMediaConstants.ACPMediaKeyConfigDownloadedContent] = true;
    ACPMedia.createTrackerWithConfig(config).then(tracker =>
      this.setState({currentTracker: tracker})
    ).catch(err => console.log(err));
  }

  // Tracker API's
  trackSessionStart() {
    let mediaObject = ACPMedia.createMediaObject("media-name", "media-id", 60, ACPMediaConstants.ACPMediaStreamTypeVod, ACPMediaType.Video);
    var mediaMetadata = new Object();
    mediaMetadata[ACPMediaConstants.ACPVideoMetadataKeyShow] = "Sample Show";
    mediaMetadata[ACPMediaConstants.ACPVideoMetadataKeySeason] = "Sample Season";

    // Custom metadata keys
    mediaMetadata["isUserLoggedIn"] = "false";
    mediaMetadata["tvStation"] = "Sample TV station";

    this.state.currentTracker.trackSessionStart(mediaObject, mediaMetadata);
  }

  trackPlay() {
    this.state.currentTracker.trackPlay();
  }

  trackPause() {
    this.state.currentTracker.trackPause();
  }

  trackComplete() {
    this.state.currentTracker.trackComplete();
  }

  trackSessionEnd() {
    this.state.currentTracker.trackSessionEnd();
  }

  trackError() {
    this.state.currentTracker.trackError("errorId");
  }

  trackEvent() {
      let adBreakObject = ACPMedia.createAdBreakObject("adbreak-name", 1, 0);
      this.state.currentTracker.trackEvent(ACPMediaEvent.AdBreakStart, adBreakObject, null);
  }

  updateCurrentPlayhead() {
    this.state.currentTracker.updateCurrentPlayhead(1);
  }

  updateQoEObject() {
    let qoeObject = ACPMedia.createQoEObject(1000000, 2, 25, 10);
    this.state.currentTracker.updateQoEObject(qoeObject);
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 22,
    textAlign: 'center',
    margin: 10,
  }
});
