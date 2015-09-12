import Ember from "ember";
import config from "./config/environment";

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function () {
  this.route("setup", {path: "/setup"});
  this.route("search", {path: "/search"});
  this.route("queue", {path: "/queue"});
  this.route("browse", {path: "/browse/*uri"});
  this.route("albums", {path: "/collection/:uri/albums"});
  this.route("playlists", {path: "/playlists"});
  this.route("playlist", {path: "/playlists/:uri"});
});

export default Router;
