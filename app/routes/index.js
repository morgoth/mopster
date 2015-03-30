import AuthorizedRoute from './authorized';

export default AuthorizedRoute.extend({
  beforeModel: function () {
    this._super();
    this.transitionTo("queue");
  }
});
