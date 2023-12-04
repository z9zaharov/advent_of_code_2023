import { expect } from "@jest/globals";
import { parseInputData, EngineSchematic } from "../day3/day3.functions.js";
import { split_blocks } from '../utils/utils.js';

describe("--- Day 3: Gear Ratios ---", () => {

  function get_input() {
    let input = `467..114..
  ...*......
  ..35..633.
  ......#...
  617*......
  .....+.58.
  ..592.....
  ......755.
  ...$.*....
  .664.598..`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/), /\n/);
  })

  it('find numbers', () => {
    let engine = new EngineSchematic();

    let res = engine.findNumbers(data);
    expect(res.length).toBe(10);

    expect(res[0].val).toBe('467');
    expect(res[1].val).toBe('114');
    expect(res[2].val).toBe('35');
    expect(res[3].val).toBe('633');
    expect(res[4].val).toBe('617');
    expect(res[5].val).toBe('58');
    expect(res[6].val).toBe('592');
    expect(res[7].val).toBe('755');
    expect(res[8].val).toBe('664');
    expect(res[9].val).toBe('598');
  }); 

  it('get boundaries', () => {
    let engine = new EngineSchematic();

    let parts = engine.findNumbers(data);
    let boundaries = engine.getBoundaries(parts[0], data.length - 1, data[0].length - 1);
    expect(boundaries.length).toBe(2);
  }); 

  it('is part number', () => {
    let engine = new EngineSchematic();

    let parts = engine.findNumbers(data);

    let res = engine.isPartNumber(data, parts[4]);
    expect(res).toBe(true);

    res = engine.isPartNumber(data, parts[1]);
    expect(res).toBe(false);

    res = engine.isPartNumber(data, parts[5]);
    expect(res).toBe(false);
  }); 

  it('get sum', () => {
    let engine = new EngineSchematic();

    let res = engine.getSum(data);
    expect(res).toBe(4361);
  }); 

  it('get adjacent', () => {
    let engine = new EngineSchematic();

    let parts = engine.findNumbers(data);
    let res = engine.getAdjacents(1, 3, parts, 10, 10);
    expect(res.length).toBe(2);
  }); 

  it('get multi', () => {
    let engine = new EngineSchematic();

    let res = engine.getMulti(data);
    expect(res).toBe(467835);
  }); 
});