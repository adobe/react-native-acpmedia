/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.

@format
*/

import { NativeModules } from 'react-native';
import ACPMedia from '../js/ACPMedia';
import ACPMediaTracker from '../js/ACPMediaTracker';
import ACPMediaType from '../js/models/ACPMediaType';
import ACPMediaConstants from '../js/ACPMediaConstants';
import ACPMediaEvent from '../js/models/ACPMediaEvent';

describe('ACPMediaTracker', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('ACPMediaTracker constructor should set ID', async () => {
    let id = 'testId';
    let tracker = new ACPMediaTracker(id);
    expect(tracker.trackerId).toBe(id);
  });

  test('trackSessionStart is called with correct parameters', async () => {
    let tracker = new ACPMediaTracker('testId');

    let name = "mediaName";
    let mediaId = "mediaId";
    let length = 20.0;
    let streamType = ACPMediaConstants.ACPMediaStreamTypeVod;
    let mediaType = ACPMediaType.Audio;

    let ret = ACPMedia.createMediaObject(name, mediaId, length, streamType, mediaType);
    let contextData = {"testKey": "testVal"};

    const spy = jest.spyOn(NativeModules.ACPMedia, 'trackSessionStart');
    tracker.trackSessionStart(ret, contextData);
    expect(spy).toHaveBeenCalledWith(tracker.trackerId, ret, contextData);
  });

  test('trackPlay is called with correct parameters', async () => {
    let tracker = new ACPMediaTracker('testId');

    const spy = jest.spyOn(NativeModules.ACPMedia, 'trackPlay');
    tracker.trackPlay();
    expect(spy).toHaveBeenCalledWith(tracker.trackerId);
  });

  test('trackPause is called with correct parameters', async () => {
    let tracker = new ACPMediaTracker('testId');

    const spy = jest.spyOn(NativeModules.ACPMedia, 'trackPause');
    tracker.trackPause();
    expect(spy).toHaveBeenCalledWith(tracker.trackerId);
  });

  test('trackComplete is called with correct parameters', async () => {
    let tracker = new ACPMediaTracker('testId');

    const spy = jest.spyOn(NativeModules.ACPMedia, 'trackComplete');
    tracker.trackComplete();
    expect(spy).toHaveBeenCalledWith(tracker.trackerId);
  });

  test('trackSessionEnd is called with correct parameters', async () => {
    let tracker = new ACPMediaTracker('testId');

    const spy = jest.spyOn(NativeModules.ACPMedia, 'trackSessionEnd');
    tracker.trackSessionEnd();
    expect(spy).toHaveBeenCalledWith(tracker.trackerId);
  });

  test('trackError is called with correct parameters', async () => {
    let tracker = new ACPMediaTracker('testId');
    let errorId = "errorId";

    const spy = jest.spyOn(NativeModules.ACPMedia, 'trackError');
    tracker.trackError(errorId);
    expect(spy).toHaveBeenCalledWith(tracker.trackerId, errorId);
  });

  test('trackEvent(EventAdBreakStart) is called with correct parameters', async () => {
    let tracker = new ACPMediaTracker('testId');
    let adBreakObject = ACPMedia.createAdBreakObject("adbreak-name", 1, 0);

    const spy = jest.spyOn(NativeModules.ACPMedia, 'trackEvent');
    tracker.trackEvent(ACPMediaEvent.EventAdBreakStart, adBreakObject, null);
    expect(spy).toHaveBeenCalledWith(tracker.trackerId, ACPMediaEvent.EventAdBreakStart, adBreakObject, null);
  });

  test('trackEvent(EventAdBreakComplete) is called with correct parameters', async () => {
    let tracker = new ACPMediaTracker('testId');
    const spy = jest.spyOn(NativeModules.ACPMedia, 'trackEvent');
    tracker.trackEvent(ACPMediaEvent.EventAdBreakComplete, null, null);
    expect(spy).toHaveBeenCalledWith(tracker.trackerId, ACPMediaEvent.EventAdBreakComplete, null, null);
  });

  test('trackEvent(EventAdStart) is called with correct parameters', async () => {
    let adObject = ACPMedia.createAdObject("adName", "adId", 1.0, 20.0);
    let data = {"testKey": "testVal"};
    let tracker = new ACPMediaTracker('testId');
    const spy = jest.spyOn(NativeModules.ACPMedia, 'trackEvent');
    tracker.trackEvent(ACPMediaEvent.EventAdStart, adObject, data);
    expect(spy).toHaveBeenCalledWith(tracker.trackerId, ACPMediaEvent.EventAdStart, adObject, data);
  });

  test('trackEvent(EventAdkip) is called with correct parameters', async () => {
    let tracker = new ACPMediaTracker('testId');
    const spy = jest.spyOn(NativeModules.ACPMedia, 'trackEvent');
    tracker.trackEvent(ACPMediaEvent.EventAdSkip, null, null);
    expect(spy).toHaveBeenCalledWith(tracker.trackerId, ACPMediaEvent.EventAdSkip, null, null);
  });

  test('trackEvent(EventAdComplete) is called with correct parameters', async () => {
    let tracker = new ACPMediaTracker('testId');
    const spy = jest.spyOn(NativeModules.ACPMedia, 'trackEvent');
    tracker.trackEvent(ACPMediaEvent.EventAdComplete, null, null);
    expect(spy).toHaveBeenCalledWith(tracker.trackerId, ACPMediaEvent.EventAdComplete, null, null);
  });

  test('trackEvent(EventChapterStart) is called with correct parameters', async () => {
    let chapterObject = ACPMedia.createChapterObject("chapterName", 1.0, 30.0, 1.0);
    let data = {"testKey": "testVal"};
    let tracker = new ACPMediaTracker('testId');
    const spy = jest.spyOn(NativeModules.ACPMedia, 'trackEvent');
    tracker.trackEvent(ACPMediaEvent.EventChapterStart, chapterObject, data);
    expect(spy).toHaveBeenCalledWith(tracker.trackerId, ACPMediaEvent.EventChapterStart, chapterObject, data);
  });

  test('trackEvent(EventChapterSkip) is called with correct parameters', async () => {
    let tracker = new ACPMediaTracker('testId');
    const spy = jest.spyOn(NativeModules.ACPMedia, 'trackEvent');
    tracker.trackEvent(ACPMediaEvent.EventChapterSkip, null, null);
    expect(spy).toHaveBeenCalledWith(tracker.trackerId, ACPMediaEvent.EventChapterSkip, null, null);
  });

  test('trackEvent(EventChapterComplete) is called with correct parameters', async () => {
    let tracker = new ACPMediaTracker('testId');
    const spy = jest.spyOn(NativeModules.ACPMedia, 'trackEvent');
    tracker.trackEvent(ACPMediaEvent.EventChapterComplete, null, null);
    expect(spy).toHaveBeenCalledWith(tracker.trackerId, ACPMediaEvent.EventChapterComplete, null, null);
  });

  test('trackEvent(EventStateStart) is called with correct parameters', async () => {
    let stateObject = ACPMedia.createStateObject(ACPMediaConstants.ACPMediaPlayerStateFullScreen);
    let tracker = new ACPMediaTracker('testId');
    const spy = jest.spyOn(NativeModules.ACPMedia, 'trackEvent');
    tracker.trackEvent(ACPMediaEvent.EventStateStart, stateObject, null);
    expect(spy).toHaveBeenCalledWith(tracker.trackerId, ACPMediaEvent.EventStateStart, stateObject, null);
  });

  test('trackEvent(EventStateEnd) is called with correct parameters', async () => {
    let stateObject = ACPMedia.createStateObject(ACPMediaConstants.ACPMediaPlayerStateFullScreen);
    let tracker = new ACPMediaTracker('testId');
    const spy = jest.spyOn(NativeModules.ACPMedia, 'trackEvent');
    tracker.trackEvent(ACPMediaEvent.EventStateEnd, stateObject, null);
    expect(spy).toHaveBeenCalledWith(tracker.trackerId, ACPMediaEvent.EventStateEnd, stateObject, null);
  });


  test('trackEvent(EventSeekStart) is called with correct parameters', async () => {
    let tracker = new ACPMediaTracker('testId');
    const spy = jest.spyOn(NativeModules.ACPMedia, 'trackEvent');
    tracker.trackEvent(ACPMediaEvent.EventSeekStart, null, null);
    expect(spy).toHaveBeenCalledWith(tracker.trackerId, ACPMediaEvent.EventSeekStart, null, null);

  });

  test('trackEvent(EventSeekComplete) is called with correct parameters', async () => {
    let tracker = new ACPMediaTracker('testId');
    const spy = jest.spyOn(NativeModules.ACPMedia, 'trackEvent');
    tracker.trackEvent(ACPMediaEvent.EventSeekComplete, null, null);
    expect(spy).toHaveBeenCalledWith(tracker.trackerId, ACPMediaEvent.EventSeekComplete, null, null);
  });

  test('trackEvent(EventBufferStart) is called with correct parameters', async () => {
    let tracker = new ACPMediaTracker('testId');
    const spy = jest.spyOn(NativeModules.ACPMedia, 'trackEvent');
    tracker.trackEvent(ACPMediaEvent.EventBufferStart, null, null);
    expect(spy).toHaveBeenCalledWith(tracker.trackerId, ACPMediaEvent.EventBufferStart, null, null);

  });

  test('trackEvent(EventBufferComplete) is called with correct parameters', async () => {
    let tracker = new ACPMediaTracker('testId');
    const spy = jest.spyOn(NativeModules.ACPMedia, 'trackEvent');
    tracker.trackEvent(ACPMediaEvent.EventBufferComplete, null, null);
    expect(spy).toHaveBeenCalledWith(tracker.trackerId, ACPMediaEvent.EventBufferComplete, null, null);
  });

  test('trackEvent(EventBitrateChange) is called with correct parameters', async () => {
    let tracker = new ACPMediaTracker('testId');
    const spy = jest.spyOn(NativeModules.ACPMedia, 'trackEvent');
    tracker.trackEvent(ACPMediaEvent.EventBitrateChange, null, null);
    expect(spy).toHaveBeenCalledWith(tracker.trackerId, ACPMediaEvent.EventBitrateChange , null, null);
  });

  test('updateCurrentPlayhead is called with correct parameters', async () => {
    let tracker = new ACPMediaTracker('testId');
    let playhead = 10.0;

    const spy = jest.spyOn(NativeModules.ACPMedia, 'updateCurrentPlayhead');
    tracker.updateCurrentPlayhead(playhead);
    expect(spy).toHaveBeenCalledWith(tracker.trackerId, playhead);
  });

  test('updateQoEObject is called with correct parameters', async () => {
    let tracker = new ACPMediaTracker('testId');
    let qoeObject = ACPMedia.createQoEObject(1000000, 2, 25, 10);

    const spy = jest.spyOn(NativeModules.ACPMedia, 'updateQoEObject');
    tracker.updateQoEObject(qoeObject);
    expect(spy).toHaveBeenCalledWith(tracker.trackerId, qoeObject);
  });

});
