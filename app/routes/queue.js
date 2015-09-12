import AuthorizedRoute from "./authorized";

export default AuthorizedRoute.extend({
  model: function () {
    return this.get("mop").trackList();
  },
});
