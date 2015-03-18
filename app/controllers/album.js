import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    add: function (uri) {
      var ctrl = this;
      this.get("mop").add(this.get("model")).then(function (result) {
        ctrl.transitionToRoute("queue");
      });
    }
  }
});
