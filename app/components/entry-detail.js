import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";

export default class EntryDetailComponent extends Component {
  @service mopidyClient;

  get isCurrent() {
    return this.args.entry.tlid === this.args.currentTrackUri;
  }

  get isSelected() {
    return this.args.selectedTrackIds.includes(this.args.entry.tlid);
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
}
