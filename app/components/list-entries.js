import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { A } from "@ember/array";
import { action } from "@ember/object";

export default class ListEntriesComponent extends Component {
  @service mopidyClient;
  @tracked currentTrackUri;
  @tracked selectedTrackIds = A([]);

  constructor() {
    super(...arguments);

    this.mopidyClient.currentTrack().then((result) => {
      if (result) {
        this.currentTrackUri = result.tlid;
      }
    });

    this.mopidyClient.client.on("event:playbackStateChanged", () => {
      this.mopidyClient.currentTrack().then((result) => {
        if (result) {
          this.currentTrackUri = result.tlid;
        }
      });
    });
    // this.get("mop.client").on("event:tracklistChanged", function () {
    //   ctrl.get("mop").trackList().then(function (tracks) {
    //     ctrl.set("model", tracks);
    //   });
    // });
  }

  @action
  select(id, modifier) {
    switch (modifier) {
      case "add":
        this.selectedTrackIds.pushObject(id);
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
        this.selectedTrackIds = A([id]);
        break;
      default:
    }
  }
}
