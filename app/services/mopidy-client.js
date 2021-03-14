import Service from '@ember/service';
import Mopidy from 'mopidy';

export default class MopidyClientService extends Service {
  client() {
    const mopidy = new Mopidy({
      webSocketUrl: 'ws://192.168.0.103:6680/mopidy/ws/',
    });

    return new Promise((resolve) => {
      mopidy.on('state:online', () => {
        return resolve(mopidy);
      });
    });
  }

  // tracklist
  trackList() {
    return this.client().then((mopidy) => {
        return mopidy.tracklist.getTlTracks();
      })
      .then((result) => {
        // console.log(result)
        return result;
      });
  }
}
