import Ember from "ember";

export default Ember.Service.extend({
  configure: function () {
    var options = {callingConvention: "by-position-or-by-name"};
    options.webSocketUrl = "ws://" + this.get("serverURL") + ":6680/mopidy/ws/";

    var mopidy = new Mopidy(options);
    var promise = new Promise(function (resolve, reject) {
      mopidy.on(function (ev, args) {
        //console.log("ev" + ev + " " + Ember.inspect(args));
        //console.log(ev);
        if (ev === "state:online") {
          resolve(mopidy);
        }
      });
    });

    this.set("client", mopidy);
    this.set("clientPromise", promise);
  }.observes("serverURL"),

  wrap: function (lib, func, args = undefined) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        var callable = mopidy[lib][func];

        (args === undefined ? callable() : callable(args)).then(function (result) {
          resolve(result);
        }, function (rejection) {
          reject(rejection.data.message);
        });
      });
    });
  },

  // playback
  currentTrack: function () {
    return this.wrap("playback", "getCurrentTlTrack");
  },

  playTrack: function (track) {
    return this.wrap("playback", "play", {tl_track: track});
  },

  previous: function () {
    return this.wrap("playback", "previous");
  },

  next: function () {
    return this.wrap("playback", "next");
  },

  play: function () {
    return this.wrap("playback", "play");
  },

  pause: function () {
    return this.wrap("playback", "pause");
  },

  stop: function () {
    return this.wrap("playback", "stop");
  },

  state: function () {
    return this.wrap("playback", "getState");
  },

  time: function () {
    return this.wrap("playback", "getTimePosition");
  },

  seek: function (timePosition) {
    return this.wrap("playback", "seek", {time_position: timePosition});
  },



  // library
  search: function (query) {
    return this.wrap("library", "search", {any: [query]});
  },

  lookup: function (uris) {
    return this.wrap("library", "lookup", {uris: uris});
  },

  browse: function (uri) {
    return this.wrap("library", "browse", {uri: uri});
  },

  collection: function (uris) {
    return this.wrap("library", "lookup", {uris: uris});
  },


  // tracklist
  trackList: function () {
    return this.wrap("tracklist", "getTlTracks");
  },

  removeTracks: function (ids) {
    return this.wrap("tracklist", "remove", {tlid: ids});
  },

  addUris: function (uris) {
    return this.wrap("tracklist", "add", {uris: uris});
  },

  getRepeat: function () {
    return this.wrap("tracklist", "getRepeat");
  },

  setRepeat: function (value) {
    return this.wrap("tracklist", "setRepeat", {value: value});
  },

  getRandom: function () {
    return this.wrap("tracklist", "getRandom");
  },

  setRandom: function (value) {
    return this.wrap("tracklist", "setRandom", {value: value});
  },

  getSingle: function () {
    return this.wrap("tracklist", "getSingle");
  },

  setSingle: function (value) {
    return this.wrap("tracklist", "setSingle", {value: value});
  },

  getConsume: function () {
    return this.wrap("tracklist", "getConsume");
  },

  setConsume: function (value) {
    return this.wrap("tracklist", "setConsume", {value: value});
  },


  // mixer
  getVolume: function () {
    return this.wrap("mixer", "getVolume");
  },

  setVolume: function (volume) {
    return this.wrap("mixer", "setVolume", {volume: parseInt(volume)});
  },

  getMute: function () {
    return this.wrap("mixer", "getMute");
  },

  setMute: function (value) {
    return this.wrap("mixer", "setMute", {mute: value});
  },


  // playlist
  playlists: function () {
    return this.wrap("playlists", "asList");
  },

  playlist: function (uri) {
    return this.wrap("playlists", "getItems", {uri: uri});
  },

  refreshPlaylists: function () {
    return this.wrap("playlists", "refresh");
  }
});
