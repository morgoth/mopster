import EmberRouter from "@ember/routing/router";
import config from "mopster/config/environment";

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route("configure");
  this.route("queue");
  this.route("search");
  this.route("entries", { path: "/entries/:uri/" });
});
