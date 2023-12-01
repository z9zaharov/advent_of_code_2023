/**
 * --- Day 1: Trebuchet?! ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, Trebuchet } from "../day1/day1.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  let trebuchet = new Trebuchet();
  let res = trebuchet.calibrate(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  let trebuchet = new Trebuchet();
  let res = trebuchet.calibrate(data, true);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 