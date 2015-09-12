import Ember from "ember";
import layout from "../templates/components/repeat-mode";

export default Ember.Component.extend({
  tagName: "button",
  attributeBindings: ["title"],
  layout: layout,
  classNames: ["pull-right btn btn-default"],
  classNameBindings: ["repeat:active"],

  _refreshRepeat: function () {
    this.get("mop").getRepeat().then( (repeat) => {
      this.set("repeat", repeat);
    });
  },

  setup: function () {
    this._refreshRepeat();

    this.get("mop.client").on("event:optionsChanged", () => {
      this._refreshRepeat();
    });
  }.on("init"),

  title: function () {
    if (this.get("repeat")) {
      return "Repeat is on";
    }
    return "Repeat is off";
  }.property("repeat"),

  click: function () {
    this.get("mop").setRepeat(!this.get("repeat"));
  },
});
