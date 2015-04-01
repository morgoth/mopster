import AuthorizedRoute from './authorized';

export default AuthorizedRoute.extend({
  model: function (params) {
    var uri = params.uri;

    if (uri === "root") {
      uri = null;
    } else {
      uri = atob(uri);
    }

    return this.get("mop").browse(uri);
  }
});
