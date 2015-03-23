import Ember from 'ember';

export default Ember.View.extend({
  tagName: "tr",
  templateName: "queue-item",
  classNameBindings: ["statusClassName"],

  statusClassName: function () {
    if (this.get("controller.currentTrack.tlid") === this.get("item.tlid")) {
      return "success";
    } else if (this.get("controller.selectedTrackIds").contains(this.get("item.tlid"))) {
      return "info";
    }
  }.property("controller.currentTrack.tlid", "controller.selectedTrackIds.@each"),

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

  click: function (event) {
    var modifier;
    if (event.ctrlKey) {
      modifier = "add";
    } else if (event.shiftKey) {
      modifier = "addFromPrevious";
    } else {
      modifier = "replace";
    }
    this.get("controller").send("selectTrack", this.get("item"), modifier);
  },

  doubleClick: function () {
    this.get("controller").send("playTrack", this.get("item"));
  }
});
