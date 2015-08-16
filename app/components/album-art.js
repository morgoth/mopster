import Ember from 'ember';
import layout from '../templates/components/album-art';

export default Ember.Component.extend({
  layout: layout,
  classNames: ["album-art"],

  getSize: function() {
    this.set("size", $("img", this.element).width());
  }.on("didInsertElement"),

  getImage: function() {
    var album = this.get("album");
    if ("images" in album && album.images.length >= 1) {
      this.set("imageSource", album.images[0]);
    } else {
      $.getJSON(`http://itunes.apple.com/search?term=${encodeURIComponent(album.name)}&limit=1&entity=album&callback=?`)
        .done((e) => {
          this.set("imageSource", e.results[0].artworkUrl100.replace("100x100", `${this.size}x${this.size}`))
          this.set("loading", false)
        })
        .fail((e) => { console.error(e); this.set("loading", false); });
      this.set("loading", true)
    }
  }.on("didInsertElement")
});
