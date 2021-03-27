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
    mopidy.on("event", (event, payload) => {
      console.log(event);
      console.log(payload);
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

  play(tlid) {
    return this.connectedClient.then((mopidy) => {
      return mopidy.playback.play({ tlid });
    });
  }

  previous() {
    return this.connectedClient.then((mopidy) => {
      return mopidy.playback.previous();
    });
  }

  next() {
    return this.connectedClient.then((mopidy) => {
      return mopidy.playback.next();
    });
  }

  pause() {
    return this.connectedClient.then((mopidy) => {
      return mopidy.playback.pause();
    });
  }

  stop() {
    return this.connectedClient.then((mopidy) => {
      return mopidy.playback.stop();
    });
  }

  getState() {
    return this.connectedClient.then((mopidy) => {
      return mopidy.playback.getState();
    });
  }

  getTimePosition() {
    return this.connectedClient.then((mopidy) => {
      return mopidy.playback.getTimePosition();
    });
  }

  seek(timePosition) {
    return this.connectedClient.then((mopidy) => {
      return mopidy.playback.seek({ time_position: timePosition });
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

  getRepeat() {
    return this.connectedClient.then((mopidy) => {
      return mopidy.tracklist.getRepeat();
    });
  }

  setRepeat(value) {
    return this.connectedClient.then((mopidy) => {
      return mopidy.tracklist.setRepeat({ value });
    });
  }

  getRandom() {
    return this.connectedClient.then((mopidy) => {
      return mopidy.tracklist.getRandom();
    });
  }

  setRandom(value) {
    return this.connectedClient.then((mopidy) => {
      return mopidy.tracklist.setRandom({ value });
    });
  }

  getSingle() {
    return this.connectedClient.then((mopidy) => {
      return mopidy.tracklist.getSingle();
    });
  }

  setSingle(value) {
    return this.connectedClient.then((mopidy) => {
      return mopidy.tracklist.setSingle({ value });
    });
  }

  getConsume() {
    return this.connectedClient.then((mopidy) => {
      return mopidy.tracklist.getConsume();
    });
  }

  setConsume(value) {
    return this.connectedClient.then((mopidy) => {
      return mopidy.tracklist.setConsume({ value });
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

  getImages(uris) {
    return this.connectedClient.then((mopidy) => {
      return mopidy.library.getImages({ uris });
    });
  }

  // mixer
  getVolume() {
    return this.connectedClient.then((mopidy) => {
      return mopidy.mixer.getVolume();
    });
  }

  setVolume(volume) {
    return this.connectedClient.then((mopidy) => {
      return mopidy.mixer.setVolume({ volume });
    });
  }

  getMute() {
    return this.connectedClient.then((mopidy) => {
      return mopidy.mixer.getMute();
    });
  }

  setMute(value) {
    return this.connectedClient.then((mopidy) => {
      return mopidy.mixer.setMute({ mute: value });
    });
  }
}
