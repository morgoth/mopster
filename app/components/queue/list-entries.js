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
      this.playlist = result;
    });

    this.mopidyClient.currentTrack().then((result) => {
      if (result) {
        this.player.currentTrack = result;
      }
    });

    this.mopidyClient.client.on("event:playbackStateChanged", () => {
      this.mopidyClient.currentTrack().then((result) => {
        if (result) {
          this.player.currentTrack = result;
        }
      });
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
      case "addFromPrevious":
        // TODO
        // let rangeIndexes = [];
        // const ids = this.get("model").mapBy("tlid");
        //
        // rangeIndexes.push(ids.indexOf(this.get("selectedTrackIds.lastObject")));
        // rangeIndexes.push(ids.lastIndexOf(track.tlid));
        // rangeIndexes = rangeIndexes.sort(function (a, b) { return a - b; });
        //
        // this.set("selectedTrackIds", ids.slice(rangeIndexes[0], rangeIndexes[1] + 1));
        break;
      case "replace":
        this.player.selectedTrackIds = A([id]);
        break;
      default:
    }
  }
}
