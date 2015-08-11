import Ember from 'ember';
import layout from '../templates/components/playback-control';

export default Ember.Component.extend({
  layout: layout,

  setup: function () {
    this.get("mop").state().then( (state) => {
      this.set("status", state);
    });

    this.get("mop.client").on("event:playbackStateChanged", (changes) => {
      this.set("status", changes.new_state);
    });
  }.on("init"),

  isPlayVisible: function () {
    // playing or paused
    return (this.get("status") !== "playing");
  }.property("status"),

  isPauseVisible: function () {
    // playing or paused
    return (this.get("status") === "playing");
  }.property("status"),

  actions: {
    play: function () {
      this.get("mop").play();
    },

    pause: function () {
      this.get("mop").pause();
    },

    stop: function () {
      this.get("mop").stop();
    },

    previous: function () {
      this.get("mop").previous();
    },

    next: function () {
      this.get("mop").next();
    }
  }
});
