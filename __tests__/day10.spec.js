import { expect } from "@jest/globals";
import { parseInputData, PipeMaze } from "../day10/day10.functions.js";
import { split_blocks } from '../utils/utils.js';

describe("--- Day 9: Mirage Maintenance ---", () => {

  function get_input() {
    let input = `.....
.S-7.
.|.|.
.L-J.
.....`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/), /\n/);
  })

  it('get start pos', () => {
    let pipeMaze = new PipeMaze();
    let res = pipeMaze.getStartPos(data);

    expect(res).toMatchObject({y: 1, x: 1});
  }); 

  it('get available positions', () => {
    let pipeMaze = new PipeMaze();
    let start = pipeMaze.getStartPos(data);
    
    let res = pipeMaze.getAvailableNextPos(data, start);
    expect(res.length).toBe(4);

    res = pipeMaze.getAvailableNextPos(data, {y: 0, x: 0});
    expect(res.length).toBe(2);

    res = pipeMaze.getAvailableNextPos(data, {y: 0, x: data[0].length - 1});
    expect(res.length).toBe(2);
  }); 

  it('get available positions', () => {
    let pipeMaze = new PipeMaze();
    
    let start = pipeMaze.getStartPos(data);
    let res = pipeMaze.getNextPos(data, start)
    expect(res.length).toBe(2);
  }); 

  it('get distance', () => {
    let pipeMaze = new PipeMaze();

    let res = pipeMaze.getDistance(data);
    expect(res).toBe(4);
  }); 

  it('get distance 2', () => {
    let input = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

    data = parseInputData(split_blocks(input, /\n/), /\n/);

    let pipeMaze = new PipeMaze();

    let res = pipeMaze.getDistance(data);
    expect(res).toBe(8);
  }); 

  it('get avalable positions', () => {
    let input = `--7F7
--J||
---J|
S---J`;

    data = parseInputData(split_blocks(input, /\n/), /\n/);

    let pipeMaze = new PipeMaze();

    let res = pipeMaze.getDistance(data, true);
    expect(res).toBe(13);
  }); 
});
