import Ember from 'ember';
import layout from '../templates/components/volume-control';

export default Ember.Component.extend({
  layout: layout,
  classNames: ["nav", "navbar-nav", "navbar-right", "navbar-form"],

  setup: function () {
    var that = this;
    this.get("mop").volume().then(function (volume) {
      // TODO: Find a better way
      that.set("volumeRemote", volume);
      that.set("volume", volume);
    });

    this.get("mop.client").on("event:volumeChanged", function (changes) {
      that.set("volumeRemote", changes.volume);
      that.set("volume", changes.volume);
    });
  }.on("init"),

  volumeObserver: function (yo) {
    if (this.get("volumeRemote") !== this.get("volume")) {
      this.get("mop").setVolume(this.get("volume"));
    }
  }.observes("volume")
});
