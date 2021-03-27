import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class ModesComponent extends Component {
  @service mopidyClient;
  @tracked repeatEnabled;
  @tracked singleEnabled;
  @tracked randomEnabled;
  @tracked consumeEnabled;

  constructor() {
    super(...arguments);

    this.setState();

    this.mopidyClient.client.on("event:optionsChanged", () => {
      this.setState();
    });
  }

  setState() {
    this.mopidyClient.getRepeat().then((value) => {
      this.repeatEnabled = value;
    });

    this.mopidyClient.getSingle().then((value) => {
      this.singleEnabled = value;
    });

    this.mopidyClient.getRandom().then((value) => {
      this.randomEnabled = value;
    });

    this.mopidyClient.getConsume().then((value) => {
      this.consumeEnabled = value;
    });
  }

  @action setRepeat() {
    this.repeatEnabled = !this.repeatEnabled;
    this.mopidyClient.setRepeat(this.repeatEnabled);
  }

  @action setSingle() {
    this.singleEnabled = !this.singleEnabled;
    this.mopidyClient.setSingle(this.singleEnabled);
  }

  @action setRandom() {
    this.randomEnabled = !this.randomEnabled;
    this.mopidyClient.setRandom(this.randomEnabled);
  }

  @action setConsume() {
    this.consumeEnabled = !this.consumeEnabled;
    this.mopidyClient.setConsume(this.consumeEnabled);
  }
}
