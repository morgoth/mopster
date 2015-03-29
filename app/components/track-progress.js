import Ember from 'ember';
import layout from '../templates/components/track-progress';

export default Ember.Component.extend({
  layout: layout,
  classNames: ["nav", "navbar-nav", "navbar-right", "navbar-form"],

  setup: function () {
    var that = this,
        mop = this.get("mop"),
        timer;

    timer = new ProgressTimer({
      callback: function (position, duration) {
        that.set("duration", duration);
        that.set("progress", position / duration * 100);
      },
      // Target milliseconds between callbacks, default: 100, min: 10.
      updateRate: 1000,
      // Force the use of the legacy setTimeout fallback, default: false.
      disableRequestAnimationFrame: false
    })

    this.set("timer", timer);

    // TODO: simplify
    mop.currentTrack().then(function (track) {
      mop.time().then(function (time) {
        timer.set(time, track.track.length);
        that.set("isDisabled", Ember.isEmpty(track.track.length));

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
      }
    });

    mop.client.on("event:trackPlaybackStarted", function (changes) {
      that.set("isDisabled", Ember.isEmpty(changes.tl_track.track.length));
      timer.set(0, changes.tl_track.track.length).start();
    });
  }.on("init"),

  clearTimer: function() {
    this.get("timer").reset();
  }.on("willDestroyElement"),

  mouseUp: function () {
    if (!this.get("isDisabled")) {
      var timePosition = Math.round(this.get("progress") * this.get("duration") / 100);
      this.get("mop").seek(timePosition);
    }
  }
});
