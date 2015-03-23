import Ember from "ember";

// TODO: simplify
export default Ember.Object.extend({
  configure: function () {
    var mopidy = new Mopidy({webSocketUrl: "ws://192.168.1.102:6680/mopidy/ws/", callingConvention: "by-position-or-by-name"});
    var promise = new Promise(function (resolve, reject) {
      mopidy.on(function (ev, args) {
        // console.log("ev" + ev + " " + Ember.inspect(args));
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
        mopidy.playback.play({tl_track: track}).then(function () {
          resolve();
        });
      });
    });
  },

  add: function (tracks) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.tracklist.add({tracks: tracks}).then(function () {
          resolve();
        });
      });
    });
  },

  removeTracks: function (ids) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.tracklist.remove({tlid: ids}).then(function () {
          resolve();
        });
      });
    });
  },

  addURI: function (uri) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.tracklist.add({uri: uri}).then(function () {
          resolve();
        });
      });
    });
  },

  previous: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.playback.previous().then(function () {
          resolve();
        });
      });
    });
  },

  next: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.playback.next().then(function () {
          resolve();
        });
      });
    });
  },

  play: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.playback.play().then(function () {
          resolve();
        });
      });
    });
  },

  pause: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.playback.pause().then(function () {
          resolve();
        });
      });
    });
  },

  stop: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.playback.stop().then(function () {
          resolve();
        });
      });
    });
  },

  volume: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.playback.getVolume().then(function (volume) {
          resolve(volume);
        });
      });
    });
  },

  setVolume: function (volume) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.playback.setVolume({volume: parseInt(volume)}).then(function () {
          resolve();
        });
      });
    });
  },

  state: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.playback.getState().then(function (state) {
          resolve(state);
        });
      });
    });
  },

  getMute: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.playback.getMute().then(function (value) {
          resolve(value);
        });
      });
    });
  },

  setMute: function (value) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.playback.setMute({value: value}).then(function () {
          resolve();
        });
      });
    });
  },

  // artist, album
  collection: function (uri) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.library.lookup({uri: uri}).then(function (artist) {
          resolve(artist);
        });
      });
    });
  }
});
