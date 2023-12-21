/**
 * --- Day 20: Pulse Propagation ---
 */
import { getBlocks } from '../utils/utils.js';
import { parseInputData, PulsePropagation } from "./day20.functions.js";

function step1(input) {
  let data = parseInputData(input, /\r\n/);

  let pulses = new PulsePropagation();

  let res = pulses.run(data, 1000);

  return res;
}

function step2(input) {
  let data = parseInputData(input, /\r\n/);

  let pulses = new PulsePropagation();

  let res = pulses.countPushes(data);

  return res;
}

let input = getBlocks(/\r\n/);

console.log(step1(input));
console.log(step2(input)); 