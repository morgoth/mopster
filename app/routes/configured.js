import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default class ConfiguredRoute extends Route {
  @service mopidyClient;

  beforeModel() {
    const serverHost = localStorage.getItem("mopidyHost");
    const serverPort = localStorage.getItem("mopidyPort");

    if (this.mopidyClient.client) {
      // go to the route
    } else if (serverHost && serverPort) {
      this.mopidyClient.configure(serverHost, serverPort);
    } else {
      this.transitionTo("configure");
    }
  }
}
