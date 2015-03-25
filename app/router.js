import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route("setup", {path: "/setup"});
  this.route("search", {path: "/search"});
  this.route("queue", {path: "/queue"});
  this.route("browse", {path: "/browse/*uri"});
  this.resource("albums", {path: "/collection/:uri/albums"});
});

export default Router;
