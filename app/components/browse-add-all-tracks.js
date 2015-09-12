import Ember from "ember";
import layout from "../templates/components/browse/add-all-tracks";

export default Ember.Component.extend({
  tagName: "button",
  layout: layout,
  classNames: ["btn", "btn-default"],
  classNameBindings: ["isVisible::hidden"],

  isVisible: () => {
    return this.get("collection").isAny("type", "track");
  }.property("collection"),

  click: () => {
    this.sendAction("action", this.get("collection").filterBy("type", "track"));
  },
});
