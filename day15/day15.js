/**
 * --- Day 15: Lens Library ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, LensLibrary } from "../day15/day15.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  let lens = new LensLibrary();

  let res = lens.hashSum(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  let lens = new LensLibrary();

  let res = lens.focusPower(data);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 