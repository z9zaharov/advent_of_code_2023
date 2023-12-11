/**
 * --- Day 11: Cosmic Expansion ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, CosmicExpansion } from "../day11/day11.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  let cosmic = new CosmicExpansion();

  let res = cosmic.getAllPathes(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  let cosmic = new CosmicExpansion();

  let res = cosmic.getAllPathes(data, 1000000);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 