import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class AlbumImageComponent extends Component {
  @service mopidyClient;
  @service player;
  @tracked src;
  @tracked title;
  @tracked url;

  constructor() {
    super(...arguments);

    const lastFmApiKey = this.player.lastFmApiKey;
    if (!lastFmApiKey) {
      return;
    }

    const album = this.args.album;

    fetch(
      `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${album.name}&limit=1&api_key=${lastFmApiKey}&format=json`
    ).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          const album = data.results.albummatches.album[0];

          this.src = album.image[2]["#text"];
          this.title = `${album.artist} - ${album.name}`;
          this.url = album.url;
        });
      }
    });
  }
}
