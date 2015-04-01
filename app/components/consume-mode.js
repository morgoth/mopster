import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "button",
  attributeBindings: ["title"],
  layout: function () {
    return "<span class='glyphicon glyphicon-cutlery'></span>";
  },
  classNames: ["pull-right btn btn-default"],
  classNameBindings: ["consume:active"],

  _refreshConsume: function () {
    this.get("mop").getConsume().then( (consume) => {
      this.set("consume", consume);
    });
  },

  setup: function () {
    this._refreshConsume();

    this.get("mop.client").on("event:optionsChanged", () => {
      this._refreshConsume();
    });
  }.on("init"),

  title: function () {
    if (this.get("consume")) {
      return "Consume mode is on";
    } else {
      return "Consume mode is off";
    }
  }.property("consume"),

  click: function () {
    this.get("mop").setConsume(!this.get("consume"));
  }
});
