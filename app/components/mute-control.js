import Ember from 'ember';
import layout from '../templates/components/mute-control';

export default Ember.Component.extend({
  layout: layout,
  tagName: "button",
  classNames: ["btn", "btn-default", "navbar-btn", "navbar-right"],
  classNameBindings: ["isMuted:active"],

  setup: function () {
    this.get("mop").getMute().then( (mute) => {
      this.set("isMuted", mute);
    });

    this.get("mop.client").on("event:muteChanged", (changes) => {
      this.set("isMuted", changes.mute);
    });
  }.on("init"),

  iconClassName: function () {
    if (this.get("isMuted")) {
      return "glyphicon-volume-off";
    } else {
      return "glyphicon-volume-up";
    }
  }.property("isMuted"),

  click: function () {
    this.get("mop").setMute(!this.get("isMuted"));
  }
});
