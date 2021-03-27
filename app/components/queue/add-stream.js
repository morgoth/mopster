import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { A } from "@ember/array";
import { inject as service } from "@ember/service";

export default class AddStreamComponent extends Component {
  @service mopidyClient;
  @tracked uri = "";
  @tracked uris = A(this.storedUris || []);

  get storedUris() {
    const localUris = localStorage.getItem("uris");
    if (!localUris) {
      return null;
    }

    return JSON.parse(localUris);
  }

  @action add(event) {
    event.preventDefault();

    this.mopidyClient.add([this.uri]).then(() => {
      this.uris.pushObject(this.uri);
      localStorage.setItem("uris", JSON.stringify(this.uris.uniq().toArray()));
    });
  }

  @action addToQueue(uri) {
    this.mopidyClient.add([uri]);
  }

  @action remove(uri) {
    this.uris = this.uris.without(uri);
    localStorage.setItem("uris", JSON.stringify(this.uris.toArray()));
  }
}
