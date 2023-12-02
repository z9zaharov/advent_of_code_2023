/**
 * --- Day 2: Cube Conundrum ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, CubeConundrum } from "../day2/day2.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  let conundrum = new CubeConundrum();

  let res = conundrum.countGames(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  let conundrum = new CubeConundrum();

  let res = conundrum.getSumOfPowers(data);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 