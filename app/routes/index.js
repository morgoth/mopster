import Route from "@ember/routing/route";

export default class IndexRoute extends Route {
  beforeModel() {
    this.router.transitionTo("queue");
  }
}
