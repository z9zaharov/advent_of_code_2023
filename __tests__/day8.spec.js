import { expect } from "@jest/globals";
import { parseInputData, Wasteland } from "../day8/day8.functions.js";
import { split_blocks } from '../utils/utils.js';

describe("--- Day 8: Haunted Wasteland ---", () => {

  function get_input() {
    let input = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n\n/), /\n/);
  })

  it('test parse data', () => {
    expect(data.moves.length).toBe(2);
    expect(Object.keys(data.rules).length).toBe(7);
  }); 

  it('count path', () => {
    let wasteland = new Wasteland();

    let res = wasteland.path(data);
    expect(res).toBe(2);
  });

  it('get path 2', () => {
    let input = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

    data = parseInputData(split_blocks(input, /\n\n/), /\n/);

    let wasteland = new Wasteland();

    let res = wasteland.path(data);
    expect(res).toBe(6);
  }); 

  it('get path all', () => {
    let input = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

    data = parseInputData(split_blocks(input, /\n\n/), /\n/);

    let wasteland = new Wasteland();

    let res = wasteland.pathByRule(data);
    expect(res).toBe(6);
  }); 
});