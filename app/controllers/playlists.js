import Ember from "ember";

export default Ember.Controller.extend({
  setup: () => {
    const ctrl = this;

    this.get("mop.client").on("event:playlistsLoaded", () => {
      ctrl.get("mop").playlists().then((playlists) => {
        ctrl.set("model", playlists);
      });
    });
  }.on("init"),

  actions: {
    refresh: () => {
      this.get("mop").refreshPlaylists();
    },
  },
});
