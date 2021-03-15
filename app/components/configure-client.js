import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class ConfigureClientComponent extends Component {
  @service router;
  @service mopidyClient;
  @tracked host = localStorage.getItem("mopidyHost");
  @tracked port = localStorage.getItem("mopidyPort");

  @action save(event) {
    event.preventDefault();
    localStorage.setItem("mopidyHost", this.host);
    localStorage.setItem("mopidyPort", this.port);
    this.router.transitionTo("queue");
  }
}
