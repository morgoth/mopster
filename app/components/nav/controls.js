import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class ControlsComponent extends Component {
  @service mopidyClient;
  @service player;
  @tracked state;

  constructor() {
    super(...arguments);

    this.mopidyClient.getState().then((state) => {
      this.state = state;
    });

    this.mopidyClient.client.on("event:playbackStateChanged", (data) => {
      this.state = data.new_state;
    });
  }

  get isPlaying() {
    return this.state === "playing";
  }

  @action previous() {
    this.mopidyClient.previous();
  }

  @action play() {
    this.mopidyClient.play();
  }

  @action pause() {
    this.mopidyClient.pause();
  }

  @action stop() {
    this.mopidyClient.stop();
  }

  @action next() {
    this.mopidyClient.next();
  }
}
