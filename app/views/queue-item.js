import Ember from 'ember';

export default Ember.View.extend({
  tagName: "tr",
  templateName: "queue-item",
  classNameBindings: "isCurrent:success",

  isCurrent: function () {
    return this.get("controller.currentTrack.tlid") === this.get("item.tlid")
  }.property("controller.currentTrack.tlid"),

  trackNumber: function () {
    return this.get("item.track.track_no");
  }.property(),

  trackName: function () {
    return this.get("item.track.name");
  }.property(),

  artistName: function () {
    return this.get("item.track.artists.0.name");
  }.property(),

  albumName: function () {
    return this.get("item.track.album.name");
  }.property(),

  doubleClick: function () {
    this.get("controller").send("playTrack", this.get("item"))
  }
});
