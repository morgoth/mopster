import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "div",
  classNames: ['in-view'],

  // Use native listeners because they provide more data
  setupListeners: function() {
    // TODO: Readup on proper infiniscrool implementations
    $(window).on("scroll", () => {
      clearTimeout(this.get("timeout"));
      var timeout = setTimeout(() => {
        var $elem = $(this.element);
        var $window = $(window);

        var docViewTop = $window.scrollTop();
        var docViewBottom = docViewTop + $window.height();

        var elemTop = $elem.offset().top;
        var elemBottom = elemTop + $elem.height();

        if ((elemBottom <= docViewBottom) && (elemTop >= docViewTop)) {
          this.sendAction();
        }
      }, 100);
      this.set("timeout", timeout);
    });
  }.on("didInsertElement"),

  tearDownListeners: function() {
    $(window).off("scroll");
  }.on("willDestroyElement")
});

