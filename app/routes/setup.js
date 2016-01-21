import Ember from "ember";

export default Ember.Route.extend({
  setupController: function (controller) {
    const serverHost = localStorage.getItem("serverHost") || "localhost";
    const serverPort = localStorage.getItem("serverPort") || 6680;
    controller.set("serverHost", serverHost);
    controller.set("serverPort", serverPort);
  },
  beforeModel: function () {
    this.controllerFor("application").set("bare", true);
  },
});
