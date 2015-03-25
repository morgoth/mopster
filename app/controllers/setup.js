import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save: function () {
      localStorage.setItem("serverURL", this.get("serverURL"));
      this.get("mop").configure();
      this.transitionToRoute("queue");
    }
  }
});
