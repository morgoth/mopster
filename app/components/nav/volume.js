import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class VolumeComponent extends Component {
  @service mopidyClient;
  @service player;
  @tracked volume;
  @tracked isMuted = false;

  constructor() {
    super(...arguments);

    this.mopidyClient.getMute().then((value) => {
      this.isMuted = value;
    });

    this.mopidyClient.getVolume().then((value) => {
      this.volume = value;
    });

    this.mopidyClient.client.on("event:volumeChanged", (data) => {
      this.volume = data.volume;
    });
  }

  @action toggleMute() {
    this.mopidyClient.setMute(!this.isMuted).then(() => {
      this.isMuted = !this.isMuted;
    });
  }

  @action setVolume() {
    const digitVolume = parseInt(this.volume, 10);
    this.mopidyClient.setVolume(digitVolume);
  }
}
