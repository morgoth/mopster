import { inject as service } from "@ember/service";
import ConfiguredRoute from "./configured";

export default class EntriesRoute extends ConfiguredRoute {
  @service mopidyClient;

  model(params) {
    return this.mopidyClient.lookup(params.uri);
  }
}
