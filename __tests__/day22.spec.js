import { expect } from "@jest/globals";
import { parseInputData, SandSlabs } from "../day22/day22.functions.js";
import { split_blocks } from '../utils/utils.js';

describe("--- Day 22: Sand Slabs ---", () => {

  function get_input() {
    let input = `1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/), /\n/);
  })

  it('is overlap', () => {
    let slabs = new SandSlabs();

    slabs.fallBricks(data);
    let res = slabs.isOverlap(data[0], data[2]);
    expect(res).toBe(true);
    expect(data[2].p1.z == data[0].p2.z + 1).toBe(true);
  }); 

  it('fall bricks', () => {
    let slabs = new SandSlabs();

    let res = slabs.fallBricks(data);
    expect(res).toBe(true);
  }); 

  it('get supporters', () => {
    let slabs = new SandSlabs();

    let res = slabs.getSupporters(data);
    expect(res).toBe(5);
  }); 

  it('chain fall', () => {
    let slabs = new SandSlabs();

    let res = slabs.chainFall(data);
    expect(res).toBe(7);
  }); 
});
