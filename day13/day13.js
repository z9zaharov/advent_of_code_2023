/**
 * --- Day 13: Point of Incidence ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, Mirrors } from "../day13/day13.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  let mirrors = new Mirrors();

  let res = mirrors.summarize(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  let mirrors = new Mirrors();

  let res = mirrors.summarize(data, true);

  return res;
}

let input = getBlocks(/\r\n\r\n/);

console.log(step1(input));
console.log(step2(input)); 