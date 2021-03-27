import { helper } from "@ember/component/helper";

function trackLength(miliseconds) {
  const seconds = Math.floor((miliseconds / 1000) % 60);
  const minutes = Math.floor((miliseconds / (60 * 1000)) % 60);

  if (minutes === 0 && seconds === 0) {
    return null;
  } else {
    const fullSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${fullSeconds}`;
  }
}

export default helper(trackLength);
