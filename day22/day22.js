/**
 * --- Day 22: Sand Slabs ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, SandSlabs } from "../day22/day22.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  let slabs = new SandSlabs();

  let res = slabs.getSupporters(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  let slabs = new SandSlabs();

  let res = slabs.chainFall(data);
  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 