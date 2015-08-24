import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ["query"],

  sliceTo: 40,
  sliceBy: 40,

  assignModel: function () {
    var result = this.get("model");
    this.set("sliceTo", this.get("sliceBy"));

    this.set("sourceTypes", result.mapBy("uri"));
    this.set("sourceType", this.get("sourceTypes")[0]);
    this.set("modelByType", result[0]);
  }.observes("model"),

  splitModel: function () {
    var query = this.get("query").toLowerCase(),
        modelByType = this.get("modelByType");

    this.set("albums", (modelByType.albums || []).slice(0, this.sliceTo));
    this.set("tracks", (modelByType.tracks || []).slice(0, this.sliceTo));

    // TODO: Improve search sort algo
    var lev = (modelByType.artists || []).reduce(function (memo, item) {
      memo.push({item: item, distance: new Levenshtein(query, item.name.toLowerCase()).distance});
      return memo;
    }, []);
    this.set("artists", lev.sortBy("distance").mapBy("item").slice(0, this.sliceTo));
  }.observes("modelByType", "sliceTo"),

  wait: 1000,
  isMobile: window.matchMedia("only screen and (max-width: 760px)").matches,
  actions: {
    // A debounced search function so searches which are triggered in rapid
    // sucession are prevented.
    search: function (e) {
      // If a last search was pending to be sent to the server cancel it.
      clearTimeout(this.get("timeout"))

      // Set a search as pending to be run once typing has stopped. This timeout
      // will only execute if it isn't cancled after wait seconds. If enter was
      // pressed, the search is triggered instantly. If the device is mobile,
      // only run when enter is pressed.
      var wait = e.which == 13 ? 0 : this.wait;
      if (!this.isMobile || this.isMobile && wait == 0) {
        var timer = setTimeout(function(that) {
          var query = that.get("query")
          that.set("errorMessage", null);
          that.set("isSearching", true);
          var ctrl = that;

          if (query) {
            that.get("mop").search(query).then(function (result) {
              ctrl.set("isSearching", false);
              ctrl.set("model", result);
            }, function (rejection) {
              ctrl.set("isSearching", false);
              ctrl.set("errorMessage", rejection);
            });
          }
        }, wait, this);
        this.set("timeout", timer)
      }
    },
    filterBy: function (sourceType) {
      this.set("sourceType", sourceType);
      this.set("modelByType", this.get("model").findBy("uri", sourceType));
    },
    loadMore: function() {
      clearTimeout(this.get("loadTimeout"))
      var timeout = setTimeout(() => this.set("sliceTo", this.get("sliceTo") + this.get("sliceBy")), 100);
      this.set("loadTimeout", timeout)
    }
  }
});
