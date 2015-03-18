import Ember from "ember";

// TODO: simplify
export default Ember.Object.extend({
  configure: function () {
    var mopidy = new Mopidy({webSocketUrl: "ws://192.168.1.102:6680/mopidy/ws/"});
    var promise = new Promise(function (resolve, reject) {
      mopidy.on(function (ev, args) {
        console.log(ev);
        if (ev === "state:online") {
          resolve(mopidy);
        }
      });
    });

    this.set("client", mopidy);
    this.set("clientPromise", promise);
  }.on("init"),

  search: function (query) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.library.search({any: [query]}).then(function (tracks) {
          resolve(tracks);
        });
      });
    });
  },

  trackList: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.tracklist.getTlTracks().then(function (tracks) {
          resolve(tracks);
        });
      });
    });
  },

  currentTrack: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.playback.getCurrentTlTrack().then(function (track) {
          resolve(track);
        });
      });
    });
  },

  playTrack: function (track) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.playback.play(track).then(function () {
          resolve();
        });
      });
    });
  }
});
