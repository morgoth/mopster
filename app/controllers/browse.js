import Ember from "ember";

export default Ember.Controller.extend({
  actions: {
    add: function (uri) {
      this.get("mop").addUris([uri]).then(() => {
        this.transitionToRoute("queue");
      });
    },

    addTracks: function (tracks) {
      this.get("mop").addUris(tracks.mapBy("uri")).then(() => {
        this.transitionToRoute("queue");
      });
    },
  },
});
