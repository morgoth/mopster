import Ember from 'ember';

export default Ember.View.extend({
  tagName: "li",
  templateName: "search/source-type",
  classNameBindings: ["isCurrent:active"],

  isCurrent: function () {
    return this.get("controller.sourceType") === this.get("sourceType");
  }.property("controller.sourceType"),

  name: function () {
    return this.get("sourceType").split(":")[0].capitalize();
  }.property("sourceType"),

  click: function () {
    this.get("controller").send("filterBy", this.get("sourceType"));
    return false; // Stop event propagation
  }
});
