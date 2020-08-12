/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
  });

  app.import("bower_components/bootstrap/dist/css/bootstrap.css");
  app.import("bower_components/fontawesome/css/font-awesome.css");
  app.import("vendor/mopidy-1.1.0.js")

  app.import("bower_components/mopidy.js/dist/mopidy.js");
  app.import("bower_components/levenshtein/lib/levenshtein.js");
  app.import("bower_components/media-progress-timer/timer.js");
  app.import("bower_components/jquery.finger/dist/jquery.finger.js");

  app.import("bower_components/fontawesome/fonts/fontawesome-webfont.eot", {destDir: "fonts"});
  app.import("bower_components/fontawesome/fonts/fontawesome-webfont.svg", {destDir: "fonts"});
  app.import("bower_components/fontawesome/fonts/fontawesome-webfont.ttf", {destDir: "fonts"});
  app.import("bower_components/fontawesome/fonts/fontawesome-webfont.woff", {destDir: "fonts"});
  app.import("bower_components/fontawesome/fonts/fontawesome-webfont.woff2", {destDir: "fonts"});

  return app.toTree();
}
