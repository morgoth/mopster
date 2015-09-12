import Ember from "ember";
import layout from "../templates/components/search/source-type";

export default Ember.Component.extend({
  tagName: "li",
  layout: layout,
  classNameBindings: ["isCurrent:active"],

  isCurrent: function () {
    return this.get("selectedSourceType") === this.get("sourceType");
  }.property("selectedSourceType"),

  name: function () {
    return this.get("sourceType").split(":")[0].capitalize();
  }.property("sourceType"),

  click: function () {
    this.sendAction("action", this.get("sourceType"));
    return false; // Stop event propagation
  },
});
