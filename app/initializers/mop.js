import Mop from "../models/mop";

export function initialize(container, application) {
  var mop = Mop.create();

  application.register("mopidy:instance", mop, {instantiate: false});
  application.inject("controller", "mop", "mopidy:instance");
  application.inject("route", "mop", "mopidy:instance");
  application.inject("component", "mop", "mopidy:instance");
}

export default {
  name: "mop",
  initialize: initialize
};
