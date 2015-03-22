import Ember from 'ember';
import layout from '../templates/components/add-uri';

export default Ember.Component.extend({
  layout: layout,

  actions: {
    add: function() {
      var that = this;
      this.get("mop").addURI(this.get("url")).then(function () {
        that.$("#add-url").modal("hide");
      });
    }
  }
});
