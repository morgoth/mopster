import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default class QueueRoute extends Route {
  @service mopidyClient;

  model() {
    this.mopidyClient.configure("192.168.0.103", "6680");
    return this.mopidyClient.trackList();
  }
}
