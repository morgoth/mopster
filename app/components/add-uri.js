import Ember from 'ember';
import layout from '../templates/components/add-uri';

export default Ember.Component.extend({
  layout: layout,

  actions: {
    add: function() {
      this.get("mop").addURI(this.get("url")).then( () => {
        this.$("#add-url").modal("hide");
      });
    }
  }
});
