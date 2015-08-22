import Ember from 'ember';
import layout from '../templates/components/mute-control';

export default Ember.Component.extend({
  layout: layout,
  tagName: "button",
  classNames: ["btn", "btn-default", "navbar-btn", "navbar-right"],
  classNameBindings: ["isMuted:active"],
  attributeBindings: ["title"],

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
      return "fa-volume-off";
    } else {
      return "fa-volume-up";
    }
  }.property("isMuted"),

  title: function () {
    if (this.get("isMuted")) {
      return "Mute is on";
    } else {
      return "Mute is off";
    }
  }.property("isMuted"),

  click: function () {
    this.get("mop").setMute(!this.get("isMuted"));
  }
});
