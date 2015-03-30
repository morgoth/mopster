import Ember from 'ember';
import AuthorizedRoute from './authorized';

export default AuthorizedRoute.extend({
  model: function (params) {
    if (Ember.isPresent(params.query)) {
      return this.get("mop").search(params.query);
    }
  }
});
