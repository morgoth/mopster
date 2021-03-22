import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class SearchComponent extends Component {
  @service router;
  @tracked query;

  @action search(event) {
    event.preventDefault();
    this.router.transitionTo("search", { queryParams: { query: this.query } });
  }
}
