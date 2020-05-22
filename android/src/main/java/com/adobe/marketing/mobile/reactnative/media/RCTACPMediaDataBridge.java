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
    private static final String EventAdBreakStart = "EventAdBreakStart";
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
    private static final String EventStateStart = "EventStateStart";
    private static final String EventStateEnd = "EventStateEnd";


    public static Event mediaEventFromString(final String eventString) {
        if (eventString == null) {
            Log.e("RCTACPMediaDataBridge", "Error: Invalid media eventName=null");
            return Event.AdBreakComplete;
        }

        switch (eventString) {
            case EventAdBreakStart:
                return Event.AdBreakStart;
            case EventAdBreakComplete:
                return Event.AdBreakComplete;
            case EventAdStart:
                return Event.AdStart;
            case EventAdComplete:
                return Event.AdComplete;
            case EventAdSkip:
                return Event.AdSkip;
            case EventChapterStart:
                return Event.ChapterStart;
            case EventChapterComplete:
                return Event.ChapterComplete;
            case EventChapterSkip:
                return Event.ChapterSkip;
            case EventSeekStart:
                return Event.SeekStart;
            case EventSeekComplete:
                return Event.SeekComplete;
            case EventBufferStart:
                return Event.BufferStart;
            case EventBufferComplete:
                return Event.BufferComplete;
            case EventBitrateChange:
                return Event.BitrateChange;
            case EventStateStart:
                return Event.StateStart;
            case EventStateEnd:
                return Event.StateEnd;
            default:
                Log.e("RCTACPMediaDataBridge", "Error: Invalid media eventName=" + eventString);
                return Event.AdBreakComplete;
        }

    }
}
