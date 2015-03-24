import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    add: function (uri) {
      var ctrl = this;
      this.get("mop").addURI(uri).then(function () {
        ctrl.transitionToRoute("queue");
      });
    },

    addTracks: function (tracks) {
      var ctrl = this;
      this.get("mop").addTracks(tracks).then(function () {
        ctrl.transitionToRoute("queue");
      });
    }
  }
});
