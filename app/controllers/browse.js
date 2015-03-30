import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    add: function (uri) {
      this.get("mop").addURI(uri).then( () => {
        this.transitionToRoute("queue");
      });
    },

    addTracks: function (tracks) {
      this.get("mop").addTracks(tracks).then( () => {
        this.transitionToRoute("queue");
      });
    }
  }
});
