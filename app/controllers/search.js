import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    search: function () {
      var ctrl = this;
      this.get("mop").search(this.get("query")).then(function (result) {
        ctrl.set("artists", result[1].artists);
        ctrl.set("albums", result[1].albums);
        ctrl.set("tracks", result[1].tracks);
      });
    }
  }
});
