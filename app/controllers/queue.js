import Ember from 'ember';

export default Ember.Controller.extend({
  setCurrentTrackNumber: function () {
    var ctrl = this;
    this.get("mop").currentTrack().then(function (track) {
      if (track) {
        ctrl.set("currentTrackNumber", track.tlid);
      }
    });

    this.get("mop.client").on("event:trackPlaybackStarted", function (track) {
      ctrl.set("currentTrackNumber", track.tl_track.tlid);
    })
  }.on("init"),

  actions: {
    playTrack: function (tlid) {
      // this.get("mop").playTrack(tlid);
    }
  }
});
