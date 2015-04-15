import AuthorizedRoute from './authorized';

export default AuthorizedRoute.extend({
  model: function (params) {
    return this.get("mop").playlist(params.uri);
  }
});
