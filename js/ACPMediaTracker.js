/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License"),
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
import ACPMediaType from './models/ACPMediaType';

class ACPMediaTracker {
  trackerId:   string;

  // WARNING: Do not call this directly, instead use the tracker creation API's in ACPMedia.
  constructor(trackerId: string) {
    this.trackerId = trackerId;
  }

  /**
 * @brief Method to track the start of a viewing session.
 *
 * @param mediaInfo NSDictionary instance created using createMediaObjectWithName method
 * @param contextData NSDictionary instance containing the context data associated with the media
 */
  trackSessionStart(mediaInfo: {string: any}, contextData: {string: any}) {
    RCTACPMedia.trackSessionStart(this.trackerId, mediaInfo, contextData);
  }

  /**
   * @brief Method to track media play or resume after a previous pause.
   */
  trackPlay() {
    RCTACPMedia.trackPlay(this.trackerId);
  }

  /**
   * @brief Method to track media pause.
   */
  trackPause() {
    RCTACPMedia.trackPause(this.trackerId);
  }

  /**
   * @brief Method to track media complete.
   */
  trackComplete() {
    RCTACPMedia.trackComplete(this.trackerId);
  }

  /**
   * @brief Method to track the end of a viewing session.
   *
   * This method must be called even if the user does not view the media to completion.
   */
  trackSessionEnd() {
    RCTACPMedia.trackSessionEnd(this.trackerId);
  }

  /**
   * @brief Method to track an error in media playback.
   *
   * @param errorId Error Id
   */
   trackError(error: string) {
     RCTACPMedia.trackError(this.trackerId, error);
   }

   /**
    * @brief Method to track media event.
    *
    * @param event Media event
    * @param info Info object for AdBreakStart, AdStart and ChapterStart events. Pass nil for other events.
    * @param data NSDictionary instance containing context data for AdStart and ChapterStart events. Pass nil for other events.
    */
    trackEvent(event: ACPMediaEvent, info: {string: any}, data: {string: any}) {
      RCTACPMedia.trackEvent(this.trackerId, event, info, data);
    }

    /**
     * @brief This method should be called when media playhead changes for accurate tracking.
     *
     * @param time Current position of the playhead. For VOD, value is specified in seconds from the beginning of the media item.
     * For live streaming, return playhead position if available or the current UTC time in seconds otherwise.
     */
     updateCurrentPlayhead(time: number) {
       RCTACPMedia.updateCurrentPlayhead(this.trackerId, time);
     }

     /**
      * @brief This method should be called during a playback session with recently available QoE data.
      *
      * @param qoeObject NSDictionary instance containing current QoE information
      */
      updateQoEObject(qoeObject: {string: any}) {
        RCTACPMedia.updateQoEObject(this.trackerId, qoeObject);
      }

}

module.exports = ACPMediaTracker;
