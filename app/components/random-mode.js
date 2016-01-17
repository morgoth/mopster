import Ember from "ember";
import layout from "../templates/components/random-mode";

export default Ember.Component.extend({
  tagName: "button",
  attributeBindings: ["title"],
  layout: layout,
  classNames: ["pull-right btn btn-default"],
  classNameBindings: ["random:active"],

  _refreshRandom: function () {
    this.get("mop").getRandom().then((random) => {
      this.set("random", random);
    });
  },

  setup: function () {
    this._refreshRandom();

    this.get("mop.client").on("event:optionsChanged", () => {
      this._refreshRandom();
    });
  }.on("init"),

  title: function () {
    if (this.get("random")) {
      return "Random is on";
    }
    return "Random is off";
  }.property("random"),

  click: function () {
    this.get("mop").setRandom(!this.get("random"));
  },
});
