import { helper } from "@ember/component/helper";

function eq(args) {
  const [one, two] = args;

  return one === two;
}

export default helper(eq);
