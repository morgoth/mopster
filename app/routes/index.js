import Ember from "ember";

export default Ember.Route.extend({
  beforeModel: function () {
    if (localStorage.getItem("serverURL")) {
      this.transitionTo("queue");
    } else {
      this.transitionTo("setup");
    }
  }
});
