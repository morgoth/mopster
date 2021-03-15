import { inject as service } from "@ember/service";
import ConfiguredRoute from "./configured";

export default class SearchRoute extends ConfiguredRoute {
  @service mopidyClient;

  model() {
    return this.mopidyClient.trackList();
  }
}
