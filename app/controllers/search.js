import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ["query"],

  assignModel: function () {
    var result = this.get("model"),
        query = this.get("query").toLowerCase();

    var lev = (result[1].artists || []).reduce(function (memo, item) {
      memo.push({item: item, distance: new Levenshtein(query, item.name.toLowerCase()).distance});
      return memo;
    }, []);

    this.set("artists", lev.sortBy("distance").mapBy("item"));
    this.set("albums", result[1].albums);
    this.set("tracks", result[1].tracks);
  }.observes("model"),

  actions: {
    search: function () {
      this.set("errorMessage", null);
      this.set("isSearching", true);
      var ctrl = this;

      this.get("mop").search(this.get("query")).then(function (result) {
        ctrl.set("isSearching", false);
        ctrl.set("model", result);
      }, function (rejection) {
        ctrl.set("isSearching", false);
        ctrl.set("errorMessage", rejection);
      });
    }
  }
});
