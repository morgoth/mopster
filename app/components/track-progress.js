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
      if (changes.new_state === "playing") {
        timer.start();
      } else if (changes.new_state === "paused") {
        timer.stop();
      } else if (changes.new_state === "stopped") {
        timer.reset();
      }
    });

    mop.client.on("event:trackPlaybackStarted", function (changes) {
      timer.set(0, changes.tl_track.track.length).start();
    });
  }.on("init"),

  clearTimer: function() {
    this.get("timer").reset();
  }.on("willDestroyElement"),
});
