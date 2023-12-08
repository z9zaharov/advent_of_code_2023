/**
 * --- Day 8: Haunted Wasteland ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, Wasteland } from "../day8/day8.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  let wasteland = new Wasteland();

  let res = wasteland.path(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  let wasteland = new Wasteland();

  let res = wasteland.pathByRule(data);

  return res;
}

let input = getBlocks(/\r\n\r\n/);

console.log(step1(input));
console.log(step2(input)); 