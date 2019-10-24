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

'use strict';

const RCTACPMedia = require('react-native').NativeModules.ACPMedia;
import ACPMediaConstants from './ACPMediaConstants';
import ACPMediaType from './models/ACPMediaType';
import ACPMediaTracker from './ACPMediaTracker';

module.exports = {

  /**
   * @brief Returns the current version of the ACPMedia Extension.
   */
  extensionVersion(): Promise<string> {
    return Promise.resolve(RCTACPMedia.extensionVersion());
  },

  /**
   * @brief Registers the ACPMedia extension with the Core Event Hub.
   */
  registerExtension() {
    RCTACPMedia.registerExtension();
  },

  createTracker(): Promise<string> {
    return RCTACPMedia.createTracker().then(trackerId => Promise.resolve(new ACPMediaTracker(trackerId))).catch(err => Promise.reject(err));
  },

  createTrackerWithConfig(config: {string: any}): Promise<string> {
    return RCTACPMedia.createTrackerWithConfig(config).then(trackerId => Promise.resolve(new ACPMediaTracker(trackerId))).catch(err => Promise.reject(err));
  },

  /**
   * @brief Creates an instance of the Media info object.
   *
   * @param name The name of the media
   * @param mediaId The unqiue identifier for the media
   * @param length The length of the media in seconds
   * @param streamType The stream type as a string. Use the pre-defined constants for vod, live, and linear content
   * @param mediaType The media type of the stream
   */
  createMediaObject(name: String, mediaId: String, length: number, streamType: String, mediaType: ACPMediaType) {
    var ret = new Object();
    ret[ACPMediaConstants.ACPMediaKeyMediaName] = name;
    ret[ACPMediaConstants.ACPMediaKeyMediaId] = mediaId;
    ret[ACPMediaConstants.ACPMediaKeyMediaLength] = length;
    ret[ACPMediaConstants.ACPMediaKeyMediaStreamType] = streamType;
    ret[ACPMediaConstants.ACPMediaKeyMediaType] = (mediaType == ACPMediaType.Audio) ? "audio" : "video";

    return ret;
  },

  /**
   * @brief Creates an instance of the AdBreak info object.
   *
   * @param name The name of the ad break
   * @param position The position of the ad break in the content starting with 1
   * @param startTime The start time of the ad break relative to the main media
   */
  createAdBreakObject(name: String, position: number, startTime: number) {
    var ret = new Object();
    ret[ACPMediaConstants.ACPMediaKeyAdBreakName] = name;
    ret[ACPMediaConstants.ACPMediaKeyAdBreakPosition] = position;
    ret[ACPMediaConstants.ACPMediaKeyAdBreakStartTime] = startTime;

    return ret;
  },

  /**
   * @brief Creates an instance of the Ad info object.
   *
   * @param name The name of the ad
   * @param adId The unique id for the ad
   * @param position The start position of the ad
   * @param length The length of the ad in seconds
   */
  createAdObject(name: String, adId: String, position: number, length: number) {
    var ret = new Object();
    ret[ACPMediaConstants.ACPMediaKeyAdName] = name;
    ret[ACPMediaConstants.ACPMediaKeyAdId] = adId;
    ret[ACPMediaConstants.ACPMediaKeyAdPosition] = position;
    ret[ACPMediaConstants.ACPMediaKeyAdLength] = length;

    return ret;
  },

  /**
   * @brief Creates an instance of the Chapter info object.
   *
   * @param name The name of the chapter
   * @param position The position of the chapter
   * @param length The length of the chapter in seconds
   * @param startTime The start time of the chapter relative to the main media
   */
  createChapterObject(name: String, position: number, length: number, startTime: number) {
    var ret = new Object();
    ret[ACPMediaConstants.ACPMediaKeyChapterName] = name;
    ret[ACPMediaConstants.ACPMediaKeyChapterPosition] = position;
    ret[ACPMediaConstants.ACPMediaKeyChapterLength] = length;
    ret[ACPMediaConstants.ACPMediaKeyChapterStartTime] = startTime;

    return ret;
  },

  /**
   * @brief Creates an instance of the QoE info object.
   *
   * @param bitrate The bitrate of media in bits per second
   * @param startupTime The start up time of media in seconds
   * @param fps The current frames per second information
   * @param droppedFrames The number of dropped frames so far
   */
  createQoEObject(bitrate: number, startupTime: number, fps: number, droppedFrames: number) {
    var ret = new Object();
    ret[ACPMediaConstants.ACPMediaKeyQoEBitrate] = bitrate;
    ret[ACPMediaConstants.ACPMediaKeyQoEStartupTime] = startupTime;
    ret[ACPMediaConstants.ACPMediaKeyQoEFps] = fps;
    ret[ACPMediaConstants.ACPMediaKeyQoEDroppedFrames] = droppedFrames;

    return ret;
  }

};
