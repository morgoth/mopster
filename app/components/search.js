import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { A } from "@ember/array";

export default class SearchComponent extends Component {
  @service mopidyClient;
  @tracked query = "";
  @tracked isSearching = false;
  @tracked artists = A([]);
  @tracked albums = A([]);
  @tracked tracks = A([]);

  @action search(event) {
    event.preventDefault();

    this.isSearching = true;
    this.mopidyClient.search(this.query).then((data) => {
      const result = data[0];

      this.artists = A(result.artists);
      this.albums = A(result.albums);
      this.tracks = A(result.tracks);

      this.isSearching = false;
    });
  }
}
