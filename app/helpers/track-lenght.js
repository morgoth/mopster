import { helper } from "@ember/component/helper";

function trackLength(miliseconds) {
  return "todo";

  // if (!miliseconds) {
  //   return;
  // }
  // const seconds = (miliseconds / 1000).toFixed(1);
  // const minutes = (miliseconds / (1000 * 60)).toFixed(1);
  //
  // return `${minutes}:${seconds}`;
}

export default helper(trackLength);
