import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class ControlsComponent extends Component {
  @service mopidyClient;
  @service player;
  @tracked isMuted = false;

  constructor() {
    super(...arguments);

    this.mopidyClient.getMute().then((value) => {
      this.isMuted = value;
    });
  }

  @action toggleMute() {
    this.mopidyClient.setMute(!this.isMuted).then(() => {
      this.isMuted = !this.isMuted;
    });
  }
}
