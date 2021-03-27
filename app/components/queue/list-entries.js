import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { A } from "@ember/array";
import { action } from "@ember/object";

export default class ListEntriesComponent extends Component {
  @service mopidyClient;
  @service player;
  @tracked playlist;

  constructor() {
    super(...arguments);

    this.mopidyClient.trackList().then((result) => {
      this.playlist = A(result);
    });

    this.mopidyClient.currentTrack().then((result) => {
      if (result) {
        this.player.currentTrack = result;
      }
    });

    this.mopidyClient.client.on("event:tracklistChanged", () => {
      this.mopidyClient.trackList().then((result) => {
        this.playlist = result;
      });
    });
  }

  @action select(id, modifier) {
    switch (modifier) {
      case "add":
        this.player.selectedTrackIds.pushObject(id);
        break;
      case "addFromPrevious": {
        const lastSelectedId = this.player.selectedTrackIds[
          this.player.selectedTrackIds.length - 1
        ];
        const trackIds = this.playlist.mapBy("tlid");
        const indexes = [
          trackIds.indexOf(lastSelectedId),
          trackIds.indexOf(id),
        ].sort((a, b) => a - b);

        this.player.selectedTrackIds = A(
          trackIds.slice(indexes[0], indexes[1] + 1)
        );
        break;
      }
      case "replace":
        this.player.selectedTrackIds = A([id]);
        break;
      default:
    }
  }
}
