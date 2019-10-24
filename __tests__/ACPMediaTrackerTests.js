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

  test('trackEvent is called with correct parameters', async () => {
    let tracker = new ACPMediaTracker('testId');
    let adBreakObject = ACPMedia.createAdBreakObject("adbreak-name", 1, 0);
    let data = {"testKey": "testVal"};

    const spy = jest.spyOn(NativeModules.ACPMedia, 'trackEvent');
    tracker.trackEvent(ACPMediaEvent.AdBreakStart, adBreakObject, data);
    expect(spy).toHaveBeenCalledWith(tracker.trackerId, ACPMediaEvent.AdBreakStart, adBreakObject, data);
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
