/* global ProgressTimer */

import Ember from "ember";
import layout from "../templates/components/track-progress";

export default Ember.Component.extend({
  layout: layout,
  classNames: ["nav", "navbar-nav", "navbar-right", "navbar-form"],

  setup: function () {
    const that = this;
    const mop = this.get("mop");
    let timer;

    timer = new ProgressTimer({
      callback: function (position, duration) {
        that.set("progress", position / duration * 100);
      },
      // Target milliseconds between callbacks, default: 100, min: 10.
      updateRate: 1000,
      // Force the use of the legacy setTimeout fallback, default: false.
      // Fixes issue with getting out of sync on inactive tab
      disableRequestAnimationFrame: true,
    });

    this.set("timer", timer);

    // TODO: simplify
    mop.currentTrack().then(function (track) {
      that.set("currentTrack", track);
      mop.time().then(function (time) {
        timer.set(time, that.get("duration"));

        mop.state().then(function (state) {
          if (state === "playing") {
            timer.start();
          }
        });
      });
    });

    mop.client.on("event:seeked", function (changes) {
      timer.set(changes.time_position);
    });

    mop.client.on("event:playbackStateChanged", function (changes) {
      switch (changes.new_state) {
        case "playing":
          timer.start();
          break;
        case "paused":
          timer.stop();
          break;
        case "stopped":
          timer.reset();
          break;
        default:
      }
    });

    mop.client.on("event:trackPlaybackStarted", function (changes) {
      that.set("currentTrack", changes.tl_track);
      timer.set(0, that.get("duration")).start();
    });
  }.on("init"),

  clearTimer: function () {
    this.get("timer").reset();
  }.on("willDestroyElement"),

  isDisabled: function () {
    return Ember.isEmpty(this.get("duration"));
  }.property("duration"),

  duration: function () {
    return this.get("currentTrack.track.length");
  }.property("currentTrack"),

  mouseUp: function () {
    if (!this.get("isDisabled")) {
      const timePosition = Math.round(this.get("progress") * this.get("duration") / 100);
      this.get("mop").seek(timePosition);
    }
  },
});
