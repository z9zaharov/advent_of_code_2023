/**
 * --- Day 5: If You Give A Seed A Fertilizer ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, SeedFertilizer } from "../day5/day5.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  let fertilizer = new SeedFertilizer();
    
  let res = fertilizer.getLowestLocation(data);

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  let fertilizer = new SeedFertilizer();
  
  let res = fertilizer.getLowestLocationOfRanges(data);

  return res;
}

let input = getBlocks(/\r\n\r\n/);

console.log(step1(input));
console.log(step2(input)); 