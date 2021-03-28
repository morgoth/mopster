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
  @tracked results;
  @tracked selectedProvider;
  @tracked providers = A([]);
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
      const rawResults = Object.values(data);

      this.providers = this.providerNames(
        rawResults.map((result) => result.uri)
      );

      this.results = this.providers.reduce((all, provider, index) => {
        all[provider] = rawResults[index];
        return all;
      }, {});

      const presentedProvider = this.providers.sort(
        (a, b) =>
          (this.results[b].tracks || []).length -
          (this.results[a].tracks || []).length
      )[0];
      this.assignProvider(presentedProvider);
      this.isSearching = false;
      this.args.onQueryUpdate(this.query);
    });
  }

  @action switchProvider(provider, event) {
    event.preventDefault();

    this.assignProvider(provider);
  }

  assignProvider(provider) {
    this.selectedProvider = provider;
    const result = this.results[this.selectedProvider];

    this.artists = A(result.artists);
    this.albums = A(result.albums);
    this.tracks = A(result.tracks);
  }

  providerNames(providers) {
    return providers.map((provider) => provider.split(":")[0]);
  }
}
