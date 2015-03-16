import Ember from 'ember';

export default Ember.Controller.extend({
  mop: new Mopidy({webSocketUrl: "ws://192.168.1.102:6680/mopidy/ws/"}),

  actions: {
    search: function () {
      var ctrl = this
      this.get("mop").library.search({any: [this.get("query")]}).then(function (result) {
        console.log(result[1])
        ctrl.set("artists", result[1].artists);
        ctrl.set("albums", result[1].albums);
        ctrl.set("tracks", result[1].tracks);
      })
    }
  }
});
