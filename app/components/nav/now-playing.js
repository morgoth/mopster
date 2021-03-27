import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class ControlsComponent extends Component {
  @service mopidyClient;
  @service player;
  @tracked streamTitle;

  constructor() {
    super(...arguments);

    this.mopidyClient.client.on("event:streamTitleChanged", (data) => {
      this.streamTitle = data.title;
    });
  }

  get title() {
    return this.streamTitle || this.trackTitle;
  }

  get trackTitle() {
    const currentTrack = this.player.currentTrack;

    if (!currentTrack) {
      return null;
    }

    if (currentTrack.track.artists) {
      return `${currentTrack.track.artists[0].name} - ${currentTrack.track.name}`;
    }

    return currentTrack.track.name;
  }
}
