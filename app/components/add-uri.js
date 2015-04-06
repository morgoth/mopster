import Ember from 'ember';
import layout from '../templates/components/add-uri';

export default Ember.Component.extend({
  layout: layout,
  classNames: ["pull-left"],

  actions: {
    add: function() {
      this.get("mop").addUris([this.get("url")]).then( () => {
        this.$("#add-url").modal("hide");
      });
    }
  }
});
