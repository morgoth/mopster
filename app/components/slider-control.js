import Ember from 'ember';
import layout from '../templates/components/slider-control';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['slider-control'],
  percentage: 0,

  setupExternalListeners: function() {
    function resize (that) {
      that.set("width", that.element.clientWidth);
    }

    $(window).on("resize", () => resize(this));
    resize(this);

    $(window).on("mousemove", (e) => { this.mousemove(e, this); });
    $(window).on("mouseup", (e) => { this.mouseup(e, this); });
  }.on('didInsertElement'),

  teardownExternalListeners: function() {
    $(window).off("resize");
    $(window).off("mousemove");
    $(window).off("mouseup");
  }.on('willDestroyElement'),

  // Default Ember Events
  mouseDown: function(e) {
    this.sendAction('pre');
    this.set("isMouseDown", true);
    e.preventDefault();
  },

  // Custom events so we get all moves
  mouseup: function(e, that) {
    if (that.get("isMouseDown")) {
      that.setPercentage(e, this);
      that.sendAction('post');
    }

    that.set("isMouseDown", false);
    e.preventDefault();
  },
  mousemove: function(e, that) {
    if (that.get("isMouseDown")) {
      that.setPercentage(e, that);
    }
  },

  setPercentage: function(e, that) {
    var percentage = Math.round(((e.pageX - $(that.element).offset().left) / that.get("width")) * 100);
    var clamped = Math.max(0, Math.min(percentage, 100))
    that.set("percentage", clamped);
    e.preventDefault();
  },
});

