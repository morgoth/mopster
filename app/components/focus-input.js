import Ember from "ember";

// TODO: rename as it is not only focusing now
export default Ember.TextField.extend({
  becomeFocused: function () {
    this.$().focus();
  }.on("didInsertElement"),

  // Use native listeners because they provide more data
  setupListeners: function () {
    this.$().on("keypress", (event) => {
      this.sendAction("keyPressAction", event);
    });
  }.on("didInsertElement"),
});
