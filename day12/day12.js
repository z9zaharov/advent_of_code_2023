/**
 * --- Day 12: Hot Springs ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, HotSprings } from "../day12/day12.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  let springs = new HotSprings();

  let res = springs.countArrangements(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  let springs = new HotSprings();

  let res = springs.countArrangements(data, true);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 