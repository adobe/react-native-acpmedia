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

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AppState,
} from 'react-native';
import {
  ACPMedia,
  ACPMediaConstants,
  ACPMediaType,
  ACPMediaEvent,
} from '@adobe/react-native-acpmedia';
import Video from 'react-native-video';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/Ionicons';
import ClickBabyVideo from './vid/clickbaby.mp4';

//Helper tries to reuse existing code by queuing events till Tracker callback completes.
const TrackerAdapter = (function() {
  class TrackerAdapter {
    constructor(config) {
      this._queuedAPICalls = [];
      this._tracker = null;
      this._creatingTracker = true;
      this._internalError = false;
      var self = this;
      ACPMedia.createTrackerWithConfig(config)
        .then(function(tracker) {
          self._creatingTracker = false;
          self._tracker = tracker;
          self._queuedAPICalls.forEach(function(apiCall) {
            self[apiCall].apply(self._tracker, apiCall.arguments);
          });
        })
        .catch(function(error) {
          console.log(error);
          self._internalError = true;
        });
    }
  }

  var apis = [
    'trackSessionStart',
    'trackSessionEnd',
    'trackComplete',
    'trackPlay',
    'trackPause',
    'trackEvent',
    'trackError',
    'updateCurrentPlayhead',
    'updateQoEObject',
  ];

  apis.forEach(function(api) {
    TrackerAdapter.prototype[api] = function() {
      if (this._internalError) {
        console.log('Error creating ACPMedia instance. API call is dropped.');
        return;
      }

      if (this._creatingTracker) {
        console.log('Creating ACPMedia instance. Queuing current API call.');
        this._queuedAPICalls.push({
          name: api,
          arguments: arguments,
        });
        return;
      }

      this._tracker[api].apply(this._tracker, arguments);
    };
  });
  return TrackerAdapter;
})();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTracker: undefined,
      sessionStarted: false,
      paused: true,
      progress: 0,
      duration: 0,
      playInBackground: false,
      appState: 'active',
    };
  }

  //Setup listener for background or active app states
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    this.trackSessionEnd();
    this.setState({sessionStarted: false});
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  //Setup for tracking pause at backgroud
  handleAppStateChange = nextAppState => {
    if (this.state.appState.match('active') && nextAppState === 'background') {
      console.log('App is at the background!');
      this.trackPause();
      this.setState({appState: nextAppState});
    } else if (
      this.state.appState.match('background') &&
      nextAppState === 'active'
    ) {
      console.log('App is at the foreground!');
      this.trackPlay();
      this.setState({appState: nextAppState});
    }
  };

  handleLoad = data => {
    this.setState({
      duration: data.duration,
    });
    var config = new Object();
    config[ACPMediaConstants.ACPMediaKeyConfigChannel] = 'test-channel';
    config[ACPMediaConstants.ACPMediaKeyConfigDownloadedContent] = false;
    var trackerHelper = this.createTrackerWithConfig(config);
    this.setState({currentTracker: trackerHelper});
  };

  handleReplay = () => {
    this.setState({paused: true}, () => this.player.seek(0));
  };

  handlePlay = () => {
    this.setState(state => {
      return {
        paused: false,
      };
    });
    if (!this.state.sessionStarted) {
      this.updateCurrentPlayhead(0);
      this.trackSessionStart();
      this.setState({sessionStarted: true});
    }
    this.trackPlay();
    this.updateCurrentPlayhead(this.state.progress * this.state.duration);
    this.updateQoEObject();
  };

  handlePause = () => {
    this.setState(state => {
      return {
        paused: true,
      };
    });
    this.trackPause();
  };

  handleStop = () => {
    this.setState(state => {
      return {
        paused: true,
      };
    });
    this.setState(state => {
      return {
        sessionStarted: false,
      };
    });
    this.trackSessionEnd();
    this.handleReplay();
  };

  handleProgress = progress => {
    this.setState(state => {
      return {
        progress: progress.currentTime / this.state.duration,
      };
    });
    this.updateCurrentPlayhead(this.state.progress * this.state.duration);
  };

  handleProgressSeek = e => {
    const position = e.nativeEvent.locationX;
    const progress = (position / 200) * this.state.duration;
    this.player.seek(progress);
    this.trackSeekStart();
    this.updateCurrentPlayhead(progress);
    this.trackSeekComplete();
  };

  handleEnd = () => {
    this.setState({paused: true});
    this.trackComplete();
    this.setState(state => {
      return {
        sessionStarted: false,
      };
    });
    this.trackSessionEnd();
    this.handleReplay();
    this.setState({progress: 0});
  };

  seconds2time(time) {
    let hr = Math.floor(time / 3600);
    let min = Math.floor((time - hr * 3600) / 60);
    let sec = time - hr * 3600 - min * 60;

    if (hr < 10) {
      hr = '0' + hr;
    }
    if (min < 10) {
      min = '0' + min;
    }
    if (sec < 10) {
      sec = '0' + sec;
    }
    return hr + ':' + min + ':' + sec;
  }

  //Using media API

  createTrackerWithConfig(config) {
    return new TrackerAdapter(config);
  }

  trackSessionStart() {
    let mediaObject = ACPMedia.createMediaObject(
      'media-name',
      'media-id',
      60,
      ACPMediaConstants.ACPMediaStreamTypeVod,
      ACPMediaType.Video,
    );

    var mediaMetadata = new Object();
    mediaMetadata[ACPMediaConstants.ACPVideoMetadataKeyShow] = 'Sample Show';
    mediaMetadata[ACPMediaConstants.ACPVideoMetadataKeySeason] =
      'Sample Season';

    // Custom metadata keys
    mediaMetadata['isUserLoggedIn'] = 'false';
    mediaMetadata['tvStation'] = 'Sample TV station';
    this.state.currentTracker.trackSessionStart(mediaObject, mediaMetadata);
  }

  trackPlay() {
    if (this.state.currentTracker === undefined) {
      console.log('tracker is null, cannot track play');
      return;
    }
    this.state.currentTracker.trackPlay();
  }

  trackPause() {
    if (this.state.currentTracker === undefined) {
      console.log('tracker is null, cannot track pause');
      return;
    }
    this.state.currentTracker.trackPause();
  }

  trackComplete() {
    if (this.state.currentTracker === undefined) {
      console.log('tracker is null, cannot track complete');
      return;
    }
    this.state.currentTracker.trackComplete();
  }

  trackSessionEnd() {
    if (this.state.currentTracker === undefined) {
      console.log('tracker is null, cannot end session');
      return;
    }
    this.state.currentTracker.trackSessionEnd();
  }

  trackSeekStart() {
    if (this.state.currentTracker === undefined) {
      console.log('tracker is null, cannnot track seek');
      return;
    }
    this.state.currentTracker.trackEvent(ACPMediaEvent.EventSeekStart);
  }

  trackSeekComplete() {
    if (this.state.currentTracker === undefined) {
      console.log('tracker is null, cannnot track seek');
      return;
    }
    this.state.currentTracker.trackEvent(ACPMediaEvent.EventSeekComplete);
  }

  updateCurrentPlayhead(time) {
    if (this.state.currentTracker === undefined) {
      console.log('tracker is null, cannot track current playhead');
      return;
    }
    this.state.currentTracker.updateCurrentPlayhead(time);
  }

  updateQoEObject() {
    if (this.state.currentTracker === undefined) {
      console.log('tracker is null, cannnot track QOE');
      return;
    }
    let qoeObject = ACPMedia.createQoEObject(1000000, 2, 25, 10);
    this.state.currentTracker.updateQoEObject(qoeObject);
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Video
            paused={this.state.paused}
            playInBackground={this.state.playInBackground}
            source={ClickBabyVideo}
            style={{width: '100%', height: '80%'}}
            resizeMode="contain"
            onLoad={this.handleLoad}
            onProgress={this.handleProgress}
            onEnd={this.handleEnd}
            repeat={false}
            ignoreSilentSwitch={'ignore'}
            ref={component => {
              this.player = component;
            }}
          />
          <View style={styles.controls}>
            <TouchableOpacity onPress={this.handlePlay}>
              <Icon name={'md-play'} size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handlePause}>
              <Icon name={'md-pause'} size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleStop}>
              <Icon name={'md-square'} size={25} color="white" />
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={this.handleProgressSeek}>
              <View>
                <ProgressBar
                  progress={this.state.progress}
                  color="#2003fc"
                  unfilledColor="#c0c0c0"
                  borderWidth={3}
                  borderColor="white"
                  width={200}
                  height={25}
                />
              </View>
            </TouchableWithoutFeedback>

            <Text style={styles.videoDuration}>
              {this.seconds2time(
                Math.floor(this.state.progress * this.state.duration),
              )}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
    paddingTop: 150,
  },
  controls: {
    backgroundColor: '#505c5e',
    left: 20,
    bottom: 20,
    right: 20,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  videoDuration: {
    color: 'white',
  },
});
