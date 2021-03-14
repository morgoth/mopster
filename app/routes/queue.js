import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class QueueRoute extends Route {
  @service mopidyClient;

  model() {
    return this.mopidyClient.trackList();
  }
}
