import { helper } from "@ember/component/helper";

function artistNames([artists]) {
  return artists.map((artist) => artist.name).join(", ");
  // Sometimes there are strange artists in list
  // return artists[0].name;
}

export default helper(artistNames);
