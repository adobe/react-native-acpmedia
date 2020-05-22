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

#import "RCTACPMedia.h"
#import "ACPMedia+ACPMediaEventConversion.h"

@implementation RCTACPMedia

RCT_EXPORT_MODULE(ACPMedia);

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(extensionVersion: (RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock)reject) {
    resolve([ACPMedia extensionVersion]);
}

RCT_EXPORT_METHOD(registerExtension) {
    [ACPMedia registerExtension];
}

RCT_EXPORT_METHOD(createTracker: (RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock)reject) {
    if (!_trackers) {
        _trackers = [NSMutableDictionary dictionary];
    }

    ACPMediaTracker* tracker = [ACPMedia createTracker];
    if (!tracker) {
        reject(@"createTracker failed", @"Tracker was nil", nil);
        return;
    }

    NSString *uuid = [[NSUUID UUID] UUIDString];
    self->_trackers[uuid] = tracker;
    resolve(uuid);
}

RCT_EXPORT_METHOD(createTrackerWithConfig:(NSDictionary*) config resolve:(RCTPromiseResolveBlock) resolve rejecter:(RCTPromiseRejectBlock)reject) {
    if (!_trackers) {
        _trackers = [NSMutableDictionary dictionary];
    }
    
    ACPMediaTracker* tracker = [ACPMedia createTrackerWithConfig:config];
    if (!tracker) {
        reject(@"createTrackerWithConfig failed", @"Tracker was nil", nil);
        return;
    }
    
    NSString *uuid = [[NSUUID UUID] UUIDString];
    self->_trackers[uuid] = tracker;
    resolve(uuid);
}

// Tracker API's

RCT_EXPORT_METHOD(trackSessionStart:(NSString*) trackerId mediaInfo:(NSDictionary*) mediaInfo data: (NSDictionary*) contextData) {
    ACPMediaTracker * tracker = [self getTrackerFromId:trackerId];
    [tracker trackSessionStart:mediaInfo data:contextData];
}

RCT_EXPORT_METHOD(trackPlay:(NSString*) trackerId) {
    ACPMediaTracker * tracker = [self getTrackerFromId:trackerId];
    [tracker trackPlay];
}

RCT_EXPORT_METHOD(trackPause:(NSString*) trackerId) {
    ACPMediaTracker * tracker = [self getTrackerFromId:trackerId];
    [tracker trackPause];
}

RCT_EXPORT_METHOD(trackComplete:(NSString*) trackerId) {
    ACPMediaTracker * tracker = [self getTrackerFromId:trackerId];
    [tracker trackComplete];
}

RCT_EXPORT_METHOD(trackSessionEnd:(NSString*) trackerId) {
    ACPMediaTracker * tracker = [self getTrackerFromId:trackerId];
    [tracker trackSessionEnd];
}

RCT_EXPORT_METHOD(trackError:(NSString*) trackerId  errorId:(NSString*) errorId) {
    ACPMediaTracker * tracker = [self getTrackerFromId:trackerId];
    [tracker trackError:errorId];
}

RCT_EXPORT_METHOD(trackEvent:(NSString*) trackerId event:(NSString*) event info: (NSDictionary*) info data:(NSDictionary*) data) {
    ACPMediaTracker * tracker = [self getTrackerFromId:trackerId];
    [tracker trackEvent:[ACPMedia mediaEventFromString:event] info:info data:data];
}

RCT_EXPORT_METHOD(updateCurrentPlayhead:(NSString*) trackerId time:(nonnull NSNumber*) time) {
    ACPMediaTracker * tracker = [self getTrackerFromId:trackerId];
    [tracker updateCurrentPlayhead:time.doubleValue];
}

RCT_EXPORT_METHOD(updateQoEObject:(NSString*) trackerId  qoeObject:(NSDictionary*) qoeObject) {
    ACPMediaTracker * tracker = [self getTrackerFromId:trackerId];
    [tracker updateQoEObject:qoeObject];
}

// Helpers
- (ACPMediaTracker *)getTrackerFromId:(NSString *)trackerId {
    ACPMediaTracker *tracker = _trackers[trackerId];
    if (!tracker) {
        NSLog(@"RCTACPMedia: Error, no tracker found with id = %@", trackerId);
    }

    return tracker;
}

@end
