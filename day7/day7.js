/**
 * --- Day 7: Camel Cards ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, CamelCards } from "../day7/day7.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  let camelCards = new CamelCards();

  let res = camelCards.totalWin(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  let camelCards = new CamelCards();

  let res = camelCards.totalWin(data, true);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 