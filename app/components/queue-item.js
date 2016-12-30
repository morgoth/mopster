import Ember from "ember";
import layout from "../templates/components/queue/item";

export default Ember.Component.extend({
  tagName: "tr",
  layout: layout,
  classNameBindings: ["statusClassName"],

  statusClassName: function () {
    const isCurrent = this.get("currentTrack.tlid") === this.get("item.tlid");
    const isSelected = this.get("selectedTrackIds").includes(this.get("item.tlid"));

    if (isCurrent && isSelected) {
      return "success-info";
    } else if (isSelected) {
      return "info";
    } else if (isCurrent) {
      return "success";
    }
  }.property("currentTrack.tlid", "selectedTrackIds.[]"),

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
    let modifier;
    if (event.ctrlKey) {
      modifier = "add";
    } else if (event.shiftKey) {
      modifier = "addFromPrevious";
    } else {
      modifier = "replace";
    }
    this.sendAction("selectTrack", this.get("item"), modifier);
  },

  // Fires also on doubleClick
  doubleTap: function () {
    this.sendAction("playTrack", this.get("item"));
  },
});
