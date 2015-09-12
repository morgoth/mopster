import Ember from "ember";

export default Ember.Controller.extend({
  actions: {
    save: function () {
      localStorage.setItem("serverURL", this.get("serverURL"));
      this.get("mop").set("serverURL", this.get("serverURL"));
      this.transitionToRoute("queue");
    },
  },
});
