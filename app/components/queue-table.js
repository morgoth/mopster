import Ember from "ember";
import layout from "../templates/components/queue/table";

export default Ember.Component.extend({
  tagName: "table",
  layout: layout,
  classNames: ["table", "table-bordered", "table-condensed", "queue-table"],

  setFocus: () => {
    // Brings the view into focus in order to capture keyUps
    this.$().attr({tabindex: 1});
  }.on("didInsertElement"),

  keyPress: (e) => {
    if ([127, 46].contains(e.keyCode)) {// Delete
      this.sendAction();
    }
  },

  actions: {
    selectTrack: function (item, modifier) {
      this.sendAction("selectTrack", item, modifier);
    },

    playTrack: function (item) {
      this.sendAction("playTrack", item);
    },
  },
});
