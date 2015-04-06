import Ember from 'ember';

export default Ember.Controller.extend({
  sort: function () {
    // TODO: simplify somehow
    var sortableFunction = function (a, b) {
      var date = b.date - a.date;
      if (date === 0) {
        if (a.album.name === b.album.name) {
          return a.track_no - b.track_no;
        } else {
          return a.album.name > b.album.name ? 1 : -1;
        }
      } else {
        return date;
      }
    };

    var groupedModel = this.get("model").reduce(function (grouped, item) {
      if (grouped[item.album.name]) {
        grouped[item.album.name].push(item);
      } else {
        grouped[item.album.name] = [item];
      }
      return grouped;
    }, {});

    groupedModel = Ember.keys(groupedModel).reduce(function (sorted, key) {
      sorted.push(groupedModel[key].sort(sortableFunction));
      return sorted;
    }, []);

    this.set("albums", groupedModel.reverse());
  }.observes("model"),

  actions: {
    add: function (uri) {
      this.get("mop").addUris([uri]).then( () => {
        this.transitionToRoute("queue");
      });
    }
  }
});
