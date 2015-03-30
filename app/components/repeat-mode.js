import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "button",
  attributeBindings: ["title"],
  layout: function () {
    return "<span class='glyphicon glyphicon-repeat'></span>";
  },
  classNames: ["pull-right btn btn-default"],
  classNameBindings: ["repeat:active"],

  _refreshRepeat: function () {
    this.get("mop").getRepeat().then( (repeat) => {
      this.set("repeat", repeat);
    });
  },

  setup: function () {
    this._refreshRepeat();

    this.get("mop.client").on("event:optionsChanged", () => {
      this._refreshRepeat();
    });
  }.on("init"),

  title: function () {
    if (this.get("repeat")) {
      return "Repeat is on";
    } else {
      return "Repeat is off";
    }
  }.property("repeat"),

  click: function () {
    this.get("mop").setRepeat(!this.get("repeat"));
  }
});
