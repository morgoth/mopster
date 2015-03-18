import Ember from 'ember';

export default Ember.Controller.extend({
  setCurrentTrack: function () {
    var ctrl = this;
    this.get("mop").currentTrack().then(function (track) {
      if (track) {
        ctrl.set("currentTrack", track);
      }
    });

    this.get("mop.client").on("event:trackPlaybackStarted", function (track) {
      ctrl.set("currentTrack", track.tl_track);
    })
  }.on("init"),

  actions: {
    playTrack: function (track) {
      this.get("mop").playTrack(track);
    }
  }
});
