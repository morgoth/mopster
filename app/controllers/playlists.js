import Ember from "ember";

export default Ember.Controller.extend({
  setup: function () {
    const ctrl = this;

    this.get("mop.client").on("event:playlistsLoaded", () => {
      ctrl.get("mop").playlists().then((playlists) => {
        ctrl.set("model", playlists);
      });
    });
  }.on("init"),

  actions: {
    refresh: function () {
      this.get("mop").refreshPlaylists();
    },
  },
});
