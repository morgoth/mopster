import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default class ConfiguredRoute extends Route {
  @service router;
  @service mopidyClient;
  @service player;

  beforeModel() {
    const serverHost = localStorage.getItem("mopidyHost");
    const serverPort = localStorage.getItem("mopidyPort");
    const lastFmApiKey = localStorage.getItem("lastFmApiKey");

    if (!this.player.lastFmApiKey && lastFmApiKey) {
      this.player.lastFmApiKey = lastFmApiKey;
    }

    if (this.mopidyClient.client) {
      // go to the route
    } else if (serverHost && serverPort) {
      this.mopidyClient.configure(serverHost, serverPort);
    } else {
      this.router.transitionTo("configuration");
    }
  }
}
