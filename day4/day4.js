/**
 * --- Day 4: Scratchcards ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, Scratchcards } from "../day4/day4.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  let scratchcards = new Scratchcards();

  let res = scratchcards.sumScore(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  let scratchcards = new Scratchcards();

  let res = scratchcards.sumWins(data);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 