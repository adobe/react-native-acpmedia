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

#import "ACPMedia+ACPMediaEventConversion.h"

@implementation ACPMedia (ACPMediaEventConversion)

static NSString* const AdBreakStart = @"AdBreakStart";
static NSString* const EventAdBreakComplete = @"EventAdBreakComplete";
static NSString* const EventAdStart = @"EventAdStart";
static NSString* const EventAdComplete = @"EventAdComplete";
static NSString* const EventAdSkip = @"EventAdSkip";
static NSString* const EventChapterStart = @"EventChapterStart";
static NSString* const EventChapterComplete = @"EventChapterComplete";
static NSString* const EventChapterSkip = @"EventChapterSkip";
static NSString* const EventSeekStart = @"EventSeekStart";
static NSString* const EventSeekComplete = @"EventSeekComplete";
static NSString* const EventBufferStart = @"EventBufferStart";
static NSString* const EventBufferComplete = @"EventBufferComplete";
static NSString* const EventBitrateChange = @"EventBitrateChange";

+ (ACPMediaEvent)mediaEventFromString:(NSString *)eventString {
    if ([eventString isEqualToString:AdBreakStart]) {
        return ACPMediaEventAdBreakStart;
    } else if ([eventString isEqualToString:EventAdBreakComplete]) {
        return ACPMediaEventAdBreakComplete;
    } else if ([eventString isEqualToString:EventAdStart]) {
        return ACPMediaEventAdStart;
    } else if ([eventString isEqualToString:EventAdComplete]) {
        return ACPMediaEventAdComplete;
    } else if ([eventString isEqualToString:EventAdSkip]) {
        return ACPMediaEventAdSkip;
    } else if ([eventString isEqualToString:EventChapterStart]) {
        return ACPMediaEventChapterStart;
    } else if ([eventString isEqualToString:EventChapterComplete]) {
        return ACPMediaEventChapterComplete;
    } else if ([eventString isEqualToString:EventChapterSkip]) {
        return ACPMediaEventChapterSkip;
    } else if ([eventString isEqualToString:EventSeekStart]) {
        return ACPMediaEventSeekStart;
    } else if ([eventString isEqualToString:EventSeekComplete]) {
        return ACPMediaEventSeekComplete;
    } else if ([eventString isEqualToString:EventBufferStart]) {
        return ACPMediaEventBufferStart;
    } else if ([eventString isEqualToString:EventBufferComplete]) {
        return ACPMediaEventBufferComplete;
    } else if ([eventString isEqualToString:EventBitrateChange]) {
        return ACPMediaEventBitrateChange;
    }
    
    return ACPMediaEventAdBreakStart;
}

@end
