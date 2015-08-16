import Ember from 'ember';
import layout from '../templates/components/volume-control';

export default Ember.Component.extend({
  layout: layout,
  classNames: ['volume-control'],
  setup: function () {
    this.get("mop").getVolume().then( (volume) => {
      this.set("percentage", volume);
    });

    this.get("mop.client").on("event:volumeChanged", (changes) => {
      this.set("percentage", changes.volume);
    });
  }.on("init"),

  actions: {
    post: function () {
      this.get("mop").setVolume(this.get("percentage"));
    }
  },
});

