import Ember from "ember";

export default Ember.Controller.extend({
  actions: {
    save: function () {
      localStorage.setItem("serverHost", this.get("serverHost"));
      localStorage.setItem("serverPort", this.get("serverPort"));
      this.get("mop").setProperties({
        serverHost: this.get("serverHost"),
        serverPort: this.get("serverPort")
      });
      this.transitionToRoute("queue");
    },
  },
});
