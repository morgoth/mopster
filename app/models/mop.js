import Ember from "ember";

// TODO: simplify
export default Ember.Object.extend({
  configure: function () {
    var options = {callingConvention: "by-position-or-by-name"};
    options.webSocketUrl = "ws://" + this.get("serverURL") + ":6680/mopidy/ws/"

    var mopidy = new Mopidy(options);
    var promise = new Promise(function (resolve, reject) {
      mopidy.on(function (ev, args) {
        // console.log("ev" + ev + " " + Ember.inspect(args));
        // console.log(args);
        if (ev === "state:online") {
          resolve(mopidy);
        }
      });
    });

    this.set("client", mopidy);
    this.set("clientPromise", promise);
  }.observes("serverURL"),

  search: function (query) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.library.search({any: [query]}).then(function (tracks) {
          resolve(tracks);
        }, function (rejection) {
          reject(rejection.data.message);
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

  addTracks: function (tracks) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.tracklist.add({tracks: tracks}).then(function () {
          resolve();
        });
      });
    });
  },

  lookup: function (uris) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.library.lookup({uris: uris}).then(function (result) {
          resolve(result);
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

  volume: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.mixer.getVolume().then(function (volume) {
          resolve(volume);
        });
      });
    });
  },

  setVolume: function (volume) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.mixer.setVolume({volume: parseInt(volume)}).then(function () {
          resolve();
        });
      });
    });
  },

  getMute: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.mixer.getMute().then(function (value) {
          resolve(value);
        });
      });
    });
  },

  setMute: function (value) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.mixer.setMute({mute: value}).then(function () {
          resolve();
        });
      });
    });
  },

  browse: function (uri) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.library.browse({uri: uri}).then(function (result) {
          resolve(result);
        });
      });
    });
  },

  time: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.playback.getTimePosition().then(function (result) {
          resolve(result);
        });
      });
    });
  },

  seek: function (timePosition) {
    var that = this;
    return new Promise(function (resolve, reject) {
      that.get("clientPromise").then(function (mopidy) {
        mopidy.playback.seek({time_position: timePosition}).then(function (result) {
          resolve(result);
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
