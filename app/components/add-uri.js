import Ember from "ember";
import layout from "../templates/components/add-uri";

export default Ember.Component.extend({
  layout: layout,
  classNames: ["pull-left"],

  setup: function () {
    this.set("streamUris", JSON.parse(localStorage.getItem("streamUris")));
  }.on("init"),

  actions: {
    add: function () {
      this.send("addUri", this.get("url"));
      this.set("url", null);
    },

    remove: function (uri) {
      const items = this.get("streamUris").without(uri);
      this.set("streamUris", items);
      localStorage.setItem("streamUris", JSON.stringify(items));
    },

    addUri: function (uri) {
      this.get("mop").addUris([uri]).then(() => {
        let items = JSON.parse(localStorage.getItem("streamUris"));

        if (Ember.isArray(items)) {
          items.push(uri);
        } else {
          items = [uri];
        }
        items = items.uniq();
        this.set("streamUris", items);
        localStorage.setItem("streamUris", JSON.stringify(items));

        this.$("#add-url").modal("hide");
      });
    },
  },
});
