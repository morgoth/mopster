import Ember from 'ember';

export default Ember.Controller.extend({
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
    }
  }
});
