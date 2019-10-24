/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
package com.adobe.marketing.mobile.reactnative.media;

import android.util.Log;

import com.adobe.marketing.mobile.Media.Event;

public class RCTACPMediaDataBridge {
    private static final String EventAdBreakStart = "AdBreakStart";
    private static final String EventAdBreakComplete = "EventAdBreakComplete";
    private static final String EventAdStart = "EventAdStart";
    private static final String EventAdComplete = "EventAdComplete";
    private static final String EventAdSkip = "EventAdSkip";
    private static final String EventChapterStart = "EventChapterStart";
    private static final String EventChapterComplete = "EventChapterComplete";
    private static final String EventChapterSkip = "EventChapterSkip";
    private static final String EventSeekStart = "EventSeekStart";
    private static final String EventSeekComplete = "EventSeekComplete";
    private static final String EventBufferStart = "EventBufferStart";
    private static final String EventBufferComplete = "EventBufferComplete";
    private static final String EventBitrateChange = "EventBitrateChange";

    public static Event mediaEventFromString(final String eventString) {
        if (eventString == null) {
            Log.d("RCTACPMediaDataBridge", "Error: eventString was null");
        }

        if (eventString.equals(EventAdBreakStart)) {
            return Event.AdBreakStart;
        } else if (eventString.equals(EventAdBreakComplete)) {
            return Event.AdBreakComplete;
        } else if (eventString.equals(EventAdStart)) {
            return Event.AdStart;
        } else if (eventString.equals(EventAdComplete)) {
            return Event.AdComplete;
        } else if (eventString.equals(EventAdSkip)) {
            return Event.AdSkip;
        } else if (eventString.equals(EventChapterStart)) {
            return Event.ChapterStart;
        } else if (eventString.equals(EventChapterComplete)) {
            return Event.ChapterComplete;
        } else if (eventString.equals(EventChapterSkip)) {
            return Event.ChapterSkip;
        } else if (eventString.equals(EventSeekStart)) {
            return Event.SeekStart;
        } else if (eventString.equals(EventSeekComplete)) {
            return Event.SeekComplete;
        } else if (eventString.equals(EventBufferStart)) {
            return Event.BufferStart;
        } else if (eventString.equals(EventBufferComplete)) {
            return Event.BufferComplete;
        } else if (eventString.equals(EventBitrateChange)) {
            return Event.BitrateChange;
        }


        return Event.AdBreakComplete;
    }
}
