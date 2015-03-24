import Ember from 'ember';

export default Ember.View.extend({
  tagName: "table",
  templateName: "queue/table",
  classNames: ["table", "table-bordered", "table-condensed", "queue-table"],

  setFocus: function() {
    // Brings the view into focus in order to capture keyUps
    this.$().attr({tabindex: 1});
  }.on("didInsertElement"),

  keyPress: function(e) {
    if ([127, 46].contains(e.keyCode)) {// Delete
      this.get("controller").send("removeSelectedTracks");
    }
  }
});
