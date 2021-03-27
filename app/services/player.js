import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { A } from "@ember/array";

export default class PlayerService extends Service {
  @tracked lastFmApiKey;
  @tracked currentTrack;
  @tracked selectedTrackIds = A([]);
  @tracked isOnline = false;
}
