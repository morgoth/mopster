import Ember from 'ember';

export default Ember.View.extend({
  tagName: "tr",
  templateName: "browse/item",

  // Workaround for not properly escaped characters
  encodedId: function () {
    return btoa(this.get("item.uri"));
  }.property("item"),

  isTrack: function () {
    return this.get("item").type === "track";
  }.property("item"),

  isDirectory: function () {
    return this.get("item.type") === "directory";
  }.property("item")
});
