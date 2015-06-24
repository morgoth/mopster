import Ember from 'ember';
import layout from '../templates/components/browse/item';

export default Ember.Component.extend({
  tagName: "tr",
  layout: layout,

  // Workaround for not properly escaped characters
  encodedId: function () {
    return btoa(this.get("item.uri"));
  }.property("item"),

  isTrack: function () {
    return this.get("item").type === "track";
  }.property("item"),

  isDirectory: function () {
    return this.get("item.type") === "directory";
  }.property("item"),

  actions: {
    add: function (uri) {
      this.sendAction("action", uri);
    }
  }
});
