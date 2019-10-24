/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License"),
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
@flow
@format
*/

'use strict'

const ACPMediaConstants = {
  // Standard Stream Type export constants
  ACPMediaStreamTypeVod: "vod",
  ACPMediaStreamTypeLive: "live",
  ACPMediaStreamTypeLinear: "linear",
  ACPMediaStreamTypePodcast: "podcast",
  ACPMediaStreamTypeAudiobook: "audiobook",
  ACPMediaStreamTypeAod: "aod",

  // Standard Video Metadata Public export constants
  ACPVideoMetadataKeyShow: "a.media.show",
  ACPVideoMetadataKeySeason: "a.media.season",
  ACPVideoMetadataKeyEpisode: "a.media.episode",
  ACPVideoMetadataKeyAssetId: "a.media.asset",
  ACPVideoMetadataKeyGenre: "a.media.genre",
  ACPVideoMetadataKeyFirstAirDate: "a.media.airDate",
  ACPVideoMetadataKeyFirstDigitalDate: "a.media.digitalDate",
  ACPVideoMetadataKeyRating: "a.media.rating",
  ACPVideoMetadataKeyOriginator: "a.media.originator",
  ACPVideoMetadataKeyNetwork: "a.media.network",
  ACPVideoMetadataKeyShowType: "a.media.type",
  ACPVideoMetadataKeyAdLoad: "a.media.adLoad",
  ACPVideoMetadataKeyMvpd: "a.media.pass.mvpd",
  ACPVideoMetadataKeyAuthorized: "a.media.pass.auth",
  ACPVideoMetadataKeyDayPart: "a.media.dayPart",
  ACPVideoMetadataKeyFeed: "a.media.feed",
  ACPVideoMetadataKeyStreamFormat: "a.media.format",

  // Standard Audio Metadata Public export constants
  ACPAudioMetadataKeyArtist   : "a.media.artist",
  ACPAudioMetadataKeyAlbum    : "a.media.album",
  ACPAudioMetadataKeyLabel    : "a.media.label",
  ACPAudioMetadataKeyAuthor   : "a.media.author",
  ACPAudioMetadataKeyStation  : "a.media.station",
  ACPAudioMetadataKeyPublisher: "a.media.publisher",

  // Standard Ad Metadata Public export constants
  ACPAdMetadataKeyAdvertiser: "a.media.ad.advertiser",
  ACPAdMetadataKeyCampaignId: "a.media.ad.campaign",
  ACPAdMetadataKeyCreativeId: "a.media.ad.creative",
  ACPAdMetadataKeyPlacementId: "a.media.ad.placement",
  ACPAdMetadataKeySiteId: "a.media.ad.site",
  ACPAdMetadataKeyCreativeUrl: "a.media.ad.creativeURL",

  // Event Key export constants - Media
   ACPMediaKeyMediaName: "media.name",
   ACPMediaKeyMediaId: "media.id",
   ACPMediaKeyMediaLength: "media.length",
   ACPMediaKeyMediaType: "media.type",
   ACPMediaKeyMediaStreamType: "media.streamtype",
   ACPMediaKeyMediaResumed: "media.resumed",
   ACPMediaKeyPrerollTrackingWaitingTime: "media.prerollwaitingtime",

  // Event Key export constants - AdBreak
   ACPMediaKeyAdBreakName: "adbreak.name",
   ACPMediaKeyAdBreakPosition: "adbreak.position",
   ACPMediaKeyAdBreakStartTime: "adbreak.starttime",

  // Event Key export constants - Ad
   ACPMediaKeyAdName: "ad.name",
   ACPMediaKeyAdId: "ad.id",
   ACPMediaKeyAdLength: "ad.length",
   ACPMediaKeyAdPosition: "ad.position",

  // Event Key export constants - Chapter
   ACPMediaKeyChapterName: "chapter.name",
   ACPMediaKeyChapterPosition: "chapter.position",
   ACPMediaKeyChapterLength: "chapter.length",
   ACPMediaKeyChapterStartTime: "chapter.starttime",

  // Event Key export constants - QoE
   ACPMediaKeyQoEBitrate: "qoe.bitrate",
   ACPMediaKeyQoEStartupTime: "qoe.startuptime",
   ACPMediaKeyQoEFps: "qoe.fps",
   ACPMediaKeyQoEDroppedFrames: "qoe.droppedframes",

  // Event Key export constants - Time
  ACPMediaKeyPlayhead: "playhead",
  ACPMediaKeyTimeStamp: "timestamp",

  // Event Key export constants - Error
   ACPMediaKeyErrorSource: "error.source",
   ACPMediaKeyErrorId: "error.id",

  // Event Key export constants - Config
   ACPMediaKeyConfigChannel: "config.channel",
   ACPMediaKeyConfigDownloadedContent: "config.downloadedcontent",

  // Event Value export constants - Event Name
  ACPMediaKeyEventSessionStart: "sessionstart",
  ACPMediaKeyEventSessionEnd: "sessionend",
  ACPMediaKeyEventPlay: "play",
  ACPMediaKeyEventPause: "pause",
  ACPMediaKeyEventComplete: "mediacomplete",
  ACPMediaKeyEventBufferStart: "bufferstart",
  ACPMediaKeyEventBufferComplete:  "buffercomplete",
  ACPMediaKeyEventSeekStart:  "seekstart",
  ACPMediaKeyEventSeekComplete:  "seekcomplete",
  ACPMediaKeyEventAdStart:  "adstart",
  ACPMediaKeyEventAdComplete: "adcomplete",
  ACPMediaKeyEventAdSkip:  "adskip",
  ACPMediaKeyEventAdBreakStart:  "adbreakstart",
  ACPMediaKeyEventAdBreakComplete: "adbreakcomplete",
  ACPMediaKeyEventChapterStart: "chapterstart",
  ACPMediaKeyEventChapterComplete: "chaptercomplete",
  ACPMediaKeyEventChapterSkip: "chapterskip",
  ACPMediaKeyEventBitrateChange: "bitratechange",
  ACPMediaKeyEventError: "error",
  ACPMediaKeyEventQoEUpdate: "qoeupdate",
  ACPMediaKeyEventPlayheadUpdate:  "playheadupdate",


  // Event Key export constants - Event export constants
  ACPMediaExtensionEventType: "com.adobe.eventtype.media",
  ACPMediaEventSourceTrackerRequest: "com.adobe.eventsource.media.requesttracker",
  ACPMediaEventSourceTrackerResponse: "com.adobe.eventsource.media.responsetracker",
  ACPMediaEventSourceTrackMedia: "com.adobe.eventsource.media.trackmedia",

  ACPMediaKeyTrackerId: "trackerid",
  ACPMediaKeyEventName: "eventname",
  ACPMediaKeyEventParams: "params",
  ACPMediaKeyEventMetadata: "metadata",
  ACPMediaKeyEventTime: "eventtime",

  ACPMediaKeyTrackerCreated: "trackercreated"
}

module.exports = ACPMediaConstants;
