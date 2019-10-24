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

import com.adobe.marketing.mobile.AdobeCallback;
import com.adobe.marketing.mobile.Media;
import com.adobe.marketing.mobile.InvalidInitException;
import com.adobe.marketing.mobile.MediaTracker;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.util.HashMap;
import java.util.UUID;

public class RCTACPMediaModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;
  private HashMap<String, MediaTracker> trackers = new HashMap<>();

  public RCTACPMediaModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "ACPMedia";
  }

  @ReactMethod
  public void extensionVersion(final Promise promise) {
      promise.resolve(Media.extensionVersion());
  }

  @ReactMethod
  public void registerExtension() {
      try {
          Media.registerExtension();
      } catch (InvalidInitException e) {
          Log.d(getName(), "Registering Media extension failed with error: " + e.getMessage());
      }
  }

  @ReactMethod
  public void createTracker(final Promise promise) {
    Media.createTracker(new AdobeCallback<MediaTracker>() {
        @Override
        public void call(MediaTracker mediaTracker) {
            if (mediaTracker == null) {
                promise.reject("createTracker failed", "Tracker was null");
                return;
            }

            String uuid = UUID.randomUUID().toString();
            trackers.put(uuid, mediaTracker);
            promise.resolve(uuid);
        }
    });
  }

  @ReactMethod
  public void createTrackerWithConfig(final ReadableMap config, final Promise promise) {
      Media.createTracker(RCTACPMediaMapUtil.toMap(config), new AdobeCallback<MediaTracker>() {
          @Override
          public void call(MediaTracker mediaTracker) {
              if (mediaTracker == null) {
                  promise.reject("createTrackerWithConfig failed", "Tracker was null");
                  return;
              }

              String uuid = UUID.randomUUID().toString();
              trackers.put(uuid, mediaTracker);
              promise.resolve(uuid);
          }
      });
  }

  // Tracker API's
  @ReactMethod
  public void trackSessionStart(final String trackerId, final ReadableMap mediaInfo, final ReadableMap contextData) {
      MediaTracker tracker = getTrackerFromId(trackerId);
      if (tracker == null) {
          return;
      }

      tracker.trackSessionStart(RCTACPMediaMapUtil.toMap(mediaInfo), RCTACPMediaMapUtil.toStringMap(contextData));
  }

    @ReactMethod
    public void trackPlay(final String trackerId) {
        MediaTracker tracker = getTrackerFromId(trackerId);
        if (tracker == null) {
            return;
        }

        tracker.trackPlay();
    }

    @ReactMethod
    public void trackPause(final String trackerId) {
        MediaTracker tracker = getTrackerFromId(trackerId);
        if (tracker == null) {
            return;
        }

        tracker.trackPause();
    }

    @ReactMethod
    public void trackComplete(final String trackerId) {
        MediaTracker tracker = getTrackerFromId(trackerId);
        if (tracker == null) {
            return;
        }

        tracker.trackComplete();
    }

    @ReactMethod
    public void trackSessionEnd(final String trackerId) {
        MediaTracker tracker = getTrackerFromId(trackerId);
        if (tracker == null) {
            return;
        }

        tracker.trackSessionEnd();
    }

    @ReactMethod
    public void trackError(final String trackerId, final String errorId) {
        MediaTracker tracker = getTrackerFromId(trackerId);
        if (tracker == null) {
            return;
        }

        tracker.trackError(errorId);
    }

    @ReactMethod
    public void trackEvent(final String trackerId, final String event, final ReadableMap info, final ReadableMap data) {
        MediaTracker tracker = getTrackerFromId(trackerId);
        if (tracker == null) {
            return;
        }

        tracker.trackEvent(RCTACPMediaDataBridge.mediaEventFromString(event), RCTACPMediaMapUtil.toMap(info), RCTACPMediaMapUtil.toStringMap(data));
    }

    @ReactMethod
    public void updateCurrentPlayhead(final String trackerId, final Double time) {
        MediaTracker tracker = getTrackerFromId(trackerId);
        if (tracker == null) {
            return;
        }

        tracker.updateCurrentPlayhead(time);
    }

    @ReactMethod
    public void updateQoEObject(final String trackerId, final ReadableMap qoeObject) {
        MediaTracker tracker = getTrackerFromId(trackerId);
        if (tracker == null) {
            return;
        }

        tracker.updateQoEObject(RCTACPMediaMapUtil.toMap(qoeObject));
    }

  // Helpers
  private MediaTracker getTrackerFromId(final String id) {
      MediaTracker tracker = trackers.get(id);
      if (tracker == null) {
          Log.d(getName(), "No tracker with id = " + id);
      }

      return tracker;
  }

}
