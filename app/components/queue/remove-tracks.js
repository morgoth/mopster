import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default class RemoveTracksComponent extends Component {
  @service mopidyClient;
  @service player;

  get isDisabled() {
    return !this.player.selectedTrackIds.length;
  }

  @action removeTracks() {
    this.mopidyClient.remove(this.player.selectedTrackIds);
    this.player.selectedTrackIds = [];
  }
}
