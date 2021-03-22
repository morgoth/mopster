import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { A } from "@ember/array";
import { action } from "@ember/object";

export default class ShowEntryComponent extends Component {
  @service mopidyClient;
  @service router;
  @tracked currentTrackUri;
  @tracked selectedTrackIds = A([]);

  get albums() {
    const tracks = Object.values(this.args.entry)[0];

    const groupedTracks = tracks.reduce((group, track) => {
      if (group[track.album.uri]) {
        group[track.album.uri].push(track);
      } else {
        group[track.album.uri] = [track];
      }
      return group;
    }, {});

    return Object.values(groupedTracks);
  }

  @action addToQueue(track) {
    this.mopidyClient.add([track.uri]);
    this.router.transitionTo("queue");
  }
}
