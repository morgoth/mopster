import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { A } from "@ember/array";

export default class SearchComponent extends Component {
  @service mopidyClient;
  @service player;
  @tracked query;
  @tracked isSearching = false;
  @tracked artists = A([]);
  @tracked albums = A([]);
  @tracked tracks = A([]);

  constructor() {
    super(...arguments);

    this.query = this.args.query;
    if (this.query) {
      this.search();
    }
  }

  @action search(event) {
    if (event) {
      event.preventDefault();
    }

    this.isSearching = true;
    this.mopidyClient.search(this.query).then((data) => {
      const result = data[0];

      this.artists = A(result.artists);
      this.albums = A(result.albums);
      this.tracks = A(result.tracks);

      this.isSearching = false;
      this.args.onQueryUpdate(this.query);
    });
  }
}
