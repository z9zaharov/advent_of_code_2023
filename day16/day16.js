/**
 * --- Day 16: The Floor Will Be Lava ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, LavaFloor } from "../day16/day16.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  let lavaFloor = new LavaFloor();

  let res = lavaFloor.moveOne(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  let lavaFloor = new LavaFloor();

  let res = lavaFloor.getMaxEnergy(data);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 