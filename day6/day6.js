/**
 * --- Day 6: Wait For It ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, WaitAndRun } from "../day6/day6.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  let waitAndRun = new WaitAndRun();

  let res = waitAndRun.beatRecordRatio(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  let waitAndRun = new WaitAndRun();

  let res = waitAndRun.getLongRecord(data);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 