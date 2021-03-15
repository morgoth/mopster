import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { A } from "@ember/array";
import { action } from "@ember/object";

export default class ShowEntryComponent extends Component {
  @service mopidyClient;
  @tracked currentTrackUri;
  @tracked selectedTrackIds = A([]);

  get albums() {
    const tracks = Object.values(this.args.entry)[0];

    const groupedTracks = tracks.reduce((group, track) => {
      if (group[track.album.uri]) {
        group[track.album.uri].push(track);
      } else {
        group[track.album.uri] = [track];
      }
      return group;
    }, {});

    console.log(groupedTracks);
    return Object.values(groupedTracks);
    // const sortableFunction = function (a, b) {
    //   const date = b.date - a.date;
    //   if (date === 0) {
    //     if (a.album.name === b.album.name) {
    //       return a.track_no - b.track_no;
    //     }
    //     return a.album.name > b.album.name ? 1 : -1;
    //   }
    //   return date;
    // };
    //
    // let groupedModel = this.get("model").reduce(function (grouped, item) {
    //   if (grouped[item.album.name]) {
    //     grouped[item.album.name].push(item);
    //   } else {
    //     grouped[item.album.name] = [item];
    //   }
    //   return grouped;
    // }, {});
    //
    // groupedModel = Object.keys(groupedModel).reduce(function (sorted, key) {
    //   sorted.push(groupedModel[key].sort(sortableFunction));
    //   return sorted;
    // }, []);
    //
    // this.set("albums", groupedModel.reverse());
    return [{name: "dupa"}];
  }
}
