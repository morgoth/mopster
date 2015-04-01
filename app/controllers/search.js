import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ["query"],

  assignModel: function () {
    var result = this.get("model");

    this.set("sourceTypes", result.mapBy("uri"));
    this.set("sourceType", this.get("sourceTypes")[0]);
    this.set("modelByType", result[0]);
  }.observes("model"),

  splitModel: function () {
    var query = this.get("query").toLowerCase(),
        modelByType = this.get("modelByType");

    this.set("albums", modelByType.albums);
    this.set("tracks", modelByType.tracks);

    var lev = (modelByType.artists || []).reduce(function (memo, item) {
      memo.push({item: item, distance: new Levenshtein(query, item.name.toLowerCase()).distance});
      return memo;
    }, []);
    this.set("artists", lev.sortBy("distance").mapBy("item"));
  }.observes("modelByType"),

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
    },

    filterBy: function (sourceType) {
      this.set("sourceType", sourceType);
      this.set("modelByType", this.get("model").findBy("uri", sourceType));
    }
  }
});
