import Ember from 'ember';

export default Ember.TextField.extend({
  becomeFocused: function() {
    this.$().focus();
  }.on("didInsertElement"),

  // Use native listeners because they provide more data
  setupListeners: function() {
    $(this.element).on("keypress", (e) => {
      this.sendAction("keyPressAction", e);
    })
  }.on("didInsertElement")
});
