import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    return this.get("mop").collection(params.uri).then(function (a) {
      console.log(a)
      return a
    })
  }
});
