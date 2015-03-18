import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route("search", {path: "/search"});
  this.route("queue", {path: "/queue"});
  this.resource("artist", {path: "/artist/:uri"});
  this.resource("album", {path: "/album/:uri"});
});

export default Router;
