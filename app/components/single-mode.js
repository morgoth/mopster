import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "button",
  attributeBindings: ["title"],
  layout: function () {
    return "<span class='glyphicon glyphicon-pushpin'></span>";
  },
  classNames: ["pull-right btn btn-default"],
  classNameBindings: ["single:active"],

  _refreshSingle: function () {
    this.get("mop").getSingle().then( (single) => {
      this.set("single", single);
    });
  },

  setup: function () {
    this._refreshSingle();

    this.get("mop.client").on("event:optionsChanged", () => {
      this._refreshSingle();
    });
  }.on("init"),

  title: function () {
    if (this.get("single")) {
      return "Single mode is on";
    } else {
      return "Single mode is off";
    }
  }.property("single"),

  click: function () {
    this.get("mop").setSingle(!this.get("single"));
  }
});
