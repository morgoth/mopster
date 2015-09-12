import Ember from "ember";
import layout from "../templates/components/volume-control";

export default Ember.Component.extend({
  layout: layout,
  classNames: ["nav", "navbar-nav", "navbar-right", "navbar-form"],

  setup: function () {
    this.get("mop").getVolume().then( (volume) => {
      this.set("volume", volume);
    });

    this.get("mop.client").on("event:volumeChanged", (changes) => {
      this.set("volume", changes.volume);
    });
  }.on("init"),

  mouseUp: function () {
    this.get("mop").setVolume(this.get("volume"));
  },
});
