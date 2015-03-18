import Ember from 'ember';
import layout from '../templates/components/playback-control';

export default Ember.Component.extend({
  layout: layout,

  setup: function () {
    var that = this;
    this.get("mop").state().then(function (state) {
      console.log(state);
      that.set("status", state);
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
      var that = this;
      this.get("mop").play().then(function () {
        that.set("status", "playing");
      });
    },

    pause: function () {
      var that = this;
      this.get("mop").pause().then(function () {
        that.set("status", "paused");
      });
    },

    stop: function () {
      var that = this;
      this.get("mop").stop().then(function () {
        that.set("status", "paused");
      });
    },

    previous: function () {
      this.get("mop").previous();
    },

    next: function () {
      this.get("mop").next();
    }
  }
});
