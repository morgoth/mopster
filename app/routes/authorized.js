import Ember from "ember";

export default Ember.Route.extend({
  beforeModel: function () {
    const serverHost = localStorage.getItem("serverHost");
    const serverPort = localStorage.getItem("serverPort");
    if (serverHost && serverPort) {
      this.controllerFor("application").set("bare", false);
      this.get("mop").setProperties({
        serverHost: serverHost,
        serverPort: serverPort,
      });
    } else {
      this.transitionTo("setup");
    }
  },
});
