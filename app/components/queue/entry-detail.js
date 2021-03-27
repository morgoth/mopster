import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";

export default class EntryDetailComponent extends Component {
  @service mopidyClient;
  @service player;

  get isCurrent() {
    const currentTrack = this.player.currentTrack;
    return this.args.entry.tlid === (currentTrack && currentTrack.tlid);
  }

  get isSelected() {
    return this.player.selectedTrackIds.includes(this.args.entry.tlid);
  }

  @action select(event) {
    let modifier;

    if (event.ctrlKey) {
      modifier = "add";
    } else if (event.shiftKey) {
      modifier = "addFromPrevious";
    } else {
      modifier = "replace";
    }

    this.args.onSelect(this.args.entry.tlid, modifier);
  }

  @action play() {
    this.mopidyClient.play(this.args.entry.tlid);
  }
}
