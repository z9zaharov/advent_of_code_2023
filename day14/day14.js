/**
 * --- Day 14: Parabolic Reflector Dish ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, ReflectorDish } from "../day14/day14.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  let reflection = new ReflectorDish();

  let res = reflection.countNorth(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  let reflection = new ReflectorDish();

  let res = reflection.countAfterMultiCycles(data);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 