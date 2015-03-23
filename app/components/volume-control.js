import Ember from 'ember';
import layout from '../templates/components/volume-control';

export default Ember.Component.extend({
  layout: layout,

  setup: function () {
    var that = this;
    this.get("mop").volume().then(function (volume) {
      // TODO: Find a better way
      that.set("volumeRemote", volume);
      that.set("volume", volume);
    });

    this.get("mop").getMute().then(function (mute) {
      that.set("isMuted", mute);
    });

    this.get("mop.client").on("event:volumeChanged", function (changes) {
      that.set("volumeRemote", changes.volume);
      that.set("volume", changes.volume);
    });

    this.get("mop.client").on("event:muteChanged", function (changes) {
      that.set("isMuted", changes.mute);
    });
  }.on("init"),

  volumeObserver: function (yo) {
    if (this.get("volumeRemote") !== this.get("volume")) {
      this.get("mop").setVolume(this.get("volume"));
    }
  }.observes("volume"),

  actions: {
    mute: function () {
      this.get("mop").setMute(true);
    },

    unmute: function () {
      this.get("mop").setMute(false);
    }
  }
});
