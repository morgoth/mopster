import Ember from 'ember';
import AuthorizedRoute from './authorized'

export default AuthorizedRoute.extend({
  model: function (params) {
    return this.get("mop").collection(params.uri);
  }
});
