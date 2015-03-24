import Ember from 'ember';

export default Ember.View.extend({
  tagName: "button",
  templateName: "browse/add-all-tracks",
  classNames: ["btn", "btn-default"],
  classNameBindings: ["isVisible::hidden"],

  isVisible: function () {
    return this.get("collection").isAny("type", "track");
  }.property("collection"),

  click: function () {
    this.get("controller").send("addTracks", this.get("collection").filterBy("type", "track"));
  }
});
