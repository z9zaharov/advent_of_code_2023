/**
 * --- Day 10: Pipe Maze ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, PipeMaze } from "../day10/day10.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  let pipeMaze = new PipeMaze();

  let res = pipeMaze.getDistance(data)[0];

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  let pipeMaze = new PipeMaze();

  let res = pipeMaze.countEnclosed(data);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 