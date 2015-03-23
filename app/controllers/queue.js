import Ember from 'ember';

export default Ember.Controller.extend({
  selectedTrackIds: [],

  setup: function () {
    var ctrl = this;
    this.get("mop").currentTrack().then(function (track) {
      if (track) {
        ctrl.set("currentTrack", track);
      }
    });

    this.get("mop.client").on("event:trackPlaybackStarted", function (track) {
      ctrl.set("currentTrack", track.tl_track);
    })

    this.get("mop.client").on("event:tracklistChanged", function () {
      ctrl.get("mop").trackList().then(function (tracks) {
        ctrl.set("model", tracks)
      })
    })
  }.on("init"),

  actions: {
    playTrack: function (track) {
      this.get("mop").playTrack(track);
    },

    selectTrack: function (track, modifier) {
      switch (modifier) {
        case "add":
          this.get("selectedTrackIds").pushObject(track.tlid);
          break;
        case "addFromPrevious":
          var rangeIndexes = [],
              ids = this.get("model").mapBy("tlid");

          rangeIndexes.push(ids.indexOf(this.get("selectedTrackIds.lastObject")));
          rangeIndexes.push(ids.lastIndexOf(track.tlid));
          rangeIndexes = rangeIndexes.sort();
          this.set("selectedTrackIds", ids.slice(rangeIndexes[0], rangeIndexes[1] + 1));
          break;
        case "replace":
          this.set("selectedTrackIds", [track.tlid]);
          break;
      }
    },

    removeSelectedTracks: function () {
      this.get("mop").removeTracks(this.get("selectedTrackIds"));
    }
  }
});
