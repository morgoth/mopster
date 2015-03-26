import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    if (localStorage.getItem("serverURL")) {
      this.controllerFor("application").set("bare", false);
      this.get("mop").set("serverURL", localStorage.getItem("serverURL"));
    } else {
      this.transitionTo("setup");
    }
  }
});
