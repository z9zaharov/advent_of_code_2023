/**
 * --- Day 3: Gear Ratios ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, EngineSchematic } from "../day3/day3.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  let engine = new EngineSchematic();

  let res = engine.getSum(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  let engine = new EngineSchematic();

  let res = engine.getMulti(data);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 