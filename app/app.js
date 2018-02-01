import Ember from "ember";
import Resolver from "./resolver";
import loadInitializers from "ember-load-initializers";
import config from "./config/environment";

const App = Ember.Application.extend({
  rootElement: "#app",
  modulePrefix: config.modulePrefix,
  Resolver: Resolver,
  customEvents: {
    doubletap: "doubleTap",
  },
});

loadInitializers(App, config.modulePrefix);

export default App;
