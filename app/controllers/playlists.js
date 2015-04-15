import Ember from 'ember';

export default Ember.Controller.extend({
  setup: function () {
    var ctrl = this;

    this.get("mop.client").on("event:playlistsLoaded", function () {
      ctrl.get("mop").playlists().then( function (playlists) {
        ctrl.set("model", playlists);
      });
    });
  }.on("init"),

  actions: {
    refresh: function () {
      this.get("mop").refreshPlaylists();
    }
  }
});
