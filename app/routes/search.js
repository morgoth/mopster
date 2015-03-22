import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    if (Ember.isPresent(params.query)) {
      return this.get("mop").search(params.query);
    }
  }
});
