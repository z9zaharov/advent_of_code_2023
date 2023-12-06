import { expect } from "@jest/globals";
import { parseInputData, WaitAndRun } from "../day6/day6.functions.js";
import { split_blocks } from '../utils/utils.js';

describe("--- Day 6: Wait For It ---", () => {

  function get_input() {
    let input = `Time:      7  15   30
Distance:  9  40  200`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/), /\n/);
  })

  it('test parse data', () => {
    expect(data.times.length).toBe(3);
    expect(data.times).toEqual(expect.arrayContaining([7, 15, 30]))
    expect(data.distances.length).toBe(3);
    expect(data.distances).toEqual(expect.arrayContaining([9, 40, 200]))
  }); 

  it('calc distance', () => {
    let waitAndRun = new WaitAndRun();

    let res = waitAndRun.calcDistance(0, 7);
    expect(res).toBe(0);

    res = waitAndRun.calcDistance(2, 7);
    expect(res).toBe(10);

    res = waitAndRun.calcDistance(7, 7);
    expect(res).toBe(0);
  }); 

  it('get distances', () => {
    let waitAndRun = new WaitAndRun();

    let res = waitAndRun.getDistances(7);
    expect(res).toEqual(expect.arrayContaining([0, 6, 10, 12, 12, 10, 6, 0]));
  }); 

  it('get records', () => {
    let waitAndRun = new WaitAndRun();

    let res = waitAndRun.getRecords(7, 9);
    expect(res).toBe(4);
  }); 

  it('beat record ratio', () => {
    let waitAndRun = new WaitAndRun();

    let res = waitAndRun.beatRecordRatio(data);
    expect(res).toBe(288);
  }); 

  it('merge data', () => {
    let waitAndRun = new WaitAndRun();

    let res = waitAndRun.mergeData(data);
    expect(res).toMatchObject({ time: 71530, distance: 940200 });
  }); 

  it('get long record', () => {
    let waitAndRun = new WaitAndRun();

    let res = waitAndRun.getLongRecord(data);
    expect(res).toBe(71503);
  }); 
});