import Component from "@glimmer/component";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default class AddStreamComponent extends Component {
  @service router;

  @action
  showModal() {
    this.router.transitionTo("/setup");
  }
}
