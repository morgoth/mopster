import Ember from "ember";

export default Ember.Controller.extend({
  actions: {
    addAll: function () {
      const uris = this.get("model").mapBy("uri");
      this.get("mop").addUris(uris).then(() => {
        this.transitionToRoute("queue");
      });
    },

    add: function (uri) {
      this.get("mop").addUris([uri]).then(() => {
        this.transitionToRoute("queue");
      });
    },
  },
});
