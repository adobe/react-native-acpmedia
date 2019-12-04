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

const EventAdBreakStart = "AdBreakStart";
const EventAdBreakComplete = "EventAdBreakComplete";
const EventAdStart = "EventAdStart";
const EventAdComplete = "EventAdComplete";
const EventAdSkip = "EventAdSkip";
const EventChapterStart = "EventChapterStart";
const EventChapterComplete = "EventChapterComplete";
const EventChapterSkip = "EventChapterSkip";
const EventSeekStart = "EventSeekStart";
const EventSeekComplete = "EventSeekComplete";
const EventBufferStart = "EventBufferStart";
const EventBufferComplete = "EventBufferComplete";
const EventBitrateChange = "EventBitrateChange";


class ACPMediaEvent {

  static get EventAdBreakStart() {
    return EventAdBreakStart;
  }

  static get EventAdBreakComplete() {
    return EventAdBreakComplete;
  }

  static get EventAdStart() {
    return EventAdStart;
  }

  static get EventAdComplete() {
    return EventAdComplete;
  }

  static get EventAdSkip() {
    return EventAdSkip;
  }

  static get EventChapterStart() {
    return EventChapterStart;
  }

  static get EventChapterComplete() {
    return EventChapterComplete;
  }

  static get EventChapterSkip() {
    return EventChapterSkip;
  }

  static get EventSeekStart() {
    return EventSeekStart;
  }

  static get EventSeekComplete() {
    return EventSeekComplete;
  }

  static get EventBufferStart() {
    return EventBufferStart;
  }

  static get EventBufferComplete() {
    return EventBufferComplete;
  }

  static get EventBitrateChange() {
    return EventBitrateChange;
  }

}

module.exports = ACPMediaEvent;
