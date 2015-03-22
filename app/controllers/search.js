import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ["query"],

  assignModel: function () {
    var result = this.get("model");
    console.log(result);
    this.set("artists", result[1].artists);
    this.set("albums", result[1].albums);
    this.set("tracks", result[1].tracks);
  }.observes("model"),

  actions: {
    search: function () {
      this.set("isSearching", true);
      var ctrl = this;

      this.get("mop").search(this.get("query")).then(function (result) {
        ctrl.set("isSearching", false);
        ctrl.set("model", result);
      });
    }
  }
});
