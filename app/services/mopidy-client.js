import Service from "@ember/service";
import Mopidy from "mopidy";

export default class MopidyClientService extends Service {
  configure(host, port) {
    const mopidy = new Mopidy({
      webSocketUrl: `ws://${host}:${port}/mopidy/ws/`,
    });

    const connectedClient = new Promise((resolve) => {
      mopidy.on("state:online", () => {
        return resolve(mopidy);
      });
    });

    // For debugging
    mopidy.on("event", (event) => {
      console.log(event);
    });

    this.client = mopidy;
    this.connectedClient = connectedClient;
  }

  // playback
  currentTrack() {
    return this.connectedClient.then((mopidy) => {
      return mopidy.playback.getCurrentTlTrack();
    });
  }

  // tracklist
  trackList() {
    return this.connectedClient.then((mopidy) => {
      return mopidy.tracklist.getTlTracks();
    });
  }

  add(uris) {
    return this.connectedClient.then((mopidy) => {
      return mopidy.tracklist.add({ uris });
    });
  }

  remove(ids) {
    return this.connectedClient.then((mopidy) => {
      return mopidy.tracklist.remove({ criteria: { tlid: ids } });
    });
  }

  // library
  browse(uri) {
    return this.connectedClient.then((mopidy) => {
      return mopidy.library.browse({ uri });
    });
  }

  lookup(uri) {
    return this.connectedClient.then((mopidy) => {
      return mopidy.library.lookup({ uris: [uri] });
    });
  }

  search(query) {
    return this.connectedClient.then((mopidy) => {
      return mopidy.library.search({ query: { any: [query] } });
    });
  }
}
