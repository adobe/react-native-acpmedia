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
import ACPMediaType from '../js/models/ACPMediaType.js';
import ACPMediaConstants from '../js/ACPMediaConstants.js';

describe('ACPMedia', () => {

  test('extensionVersion is called', async () => {
    const spy = jest.spyOn(NativeModules.ACPMedia, 'extensionVersion');
    await ACPMedia.extensionVersion();
    expect(spy).toHaveBeenCalled();
  });

  test('registerExtension is called', async () => {
    const spy = jest.spyOn(NativeModules.ACPMedia, 'registerExtension');
    await ACPMedia.registerExtension();
    expect(spy).toHaveBeenCalled();
  });

  test('createMediaObject returns correct value', async () => {
    let name = "mediaName";
    let mediaId = "mediaId";
    let length = 20.0;
    let streamType = ACPMediaConstants.ACPMediaStreamTypeVod;
    let mediaType = ACPMediaType.Audio;

    let ret = ACPMedia.createMediaObject(name, mediaId, length, streamType, mediaType);

    expect(ret[ACPMediaConstants.ACPMediaKeyMediaName]).toBe(name);
    expect(ret[ACPMediaConstants.ACPMediaKeyMediaId]).toBe(mediaId);
    expect(ret[ACPMediaConstants.ACPMediaKeyMediaLength]).toBe(length);
    expect(ret[ACPMediaConstants.ACPMediaKeyMediaStreamType]).toBe(streamType);
    expect(ret[ACPMediaConstants.ACPMediaKeyMediaType]).toBe("audio");
  });

  test('createAdBreakObject returns correct value', async () => {
    let name = "mediaName";
    let position = 1.0;
    let startTime = 2.0;

    let ret = ACPMedia.createAdBreakObject(name, position, startTime);

    expect(ret[ACPMediaConstants.ACPMediaKeyAdBreakName]).toBe(name);
    expect(ret[ACPMediaConstants.ACPMediaKeyAdBreakPosition]).toBe(position);
    expect(ret[ACPMediaConstants.ACPMediaKeyAdBreakStartTime]).toBe(startTime);
  });

  test('createAdObject returns correct value', async () => {
    let name = "mediaName";
    let adId = "adId";
    let position = 1.0;
    let length = 2.0;

    let ret = ACPMedia.createAdObject(name, adId, position, length);

    expect(ret[ACPMediaConstants.ACPMediaKeyAdName]).toBe(name);
    expect(ret[ACPMediaConstants.ACPMediaKeyAdId]).toBe(adId);
    expect(ret[ACPMediaConstants.ACPMediaKeyAdPosition]).toBe(position);
    expect(ret[ACPMediaConstants.ACPMediaKeyAdLength]).toBe(length);
  });

  test('createChapterObject returns correct value', async () => {
    let name = "mediaName";
    let position = 1.0;
    let length = 2.0;
    let startTime = 2.0;

    let ret = ACPMedia.createChapterObject(name, position, length, startTime);

    expect(ret[ACPMediaConstants.ACPMediaKeyChapterName]).toBe(name);
    expect(ret[ACPMediaConstants.ACPMediaKeyChapterPosition]).toBe(position);
    expect(ret[ACPMediaConstants.ACPMediaKeyChapterLength]).toBe(length);
    expect(ret[ACPMediaConstants.ACPMediaKeyChapterStartTime]).toBe(startTime);
  });

  test('createQoEObject returns correct value', async () => {
    let bitrate = 20.0;
    let startupTime = 2.0;
    let fps = 30.0;
    let droppedFrames = 22.0;

    let ret = ACPMedia.createQoEObject(bitrate, startupTime, fps, droppedFrames);

    expect(ret[ACPMediaConstants.ACPMediaKeyQoEBitrate]).toBe(bitrate);
    expect(ret[ACPMediaConstants.ACPMediaKeyQoEStartupTime]).toBe(startupTime);
    expect(ret[ACPMediaConstants.ACPMediaKeyQoEFps]).toBe(fps);
    expect(ret[ACPMediaConstants.ACPMediaKeyQoEDroppedFrames]).toBe(droppedFrames);
  });

});
