import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class ShowEntryComponent extends Component {
  @service mopidyClient;
  @service router;
  @tracked currentTrackUri;

  get groupedTracks() {
    const tracks = Object.values(this.args.entry)[0];

    return tracks.reduce((group, track) => {
      if (group[track.album.uri]) {
        group[track.album.uri].push(track);
      } else {
        group[track.album.uri] = [track];
      }
      return group;
    }, {});
  }

  get albums() {
    return Object.values(this.groupedTracks);
  }

  @action addToQueue(track) {
    this.mopidyClient.add([track.uri]);
    this.router.transitionTo("queue");
  }
}
