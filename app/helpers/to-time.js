import Ember from "ember";

export default Ember.Helper.extend({
  compute: function(params) {
    var time = params[0];
    var minutes = Math.floor(time / 60000);
    var seconds = ((time % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
});

