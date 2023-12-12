import { expect } from "@jest/globals";
import { parseInputData, HotSprings } from "../day12/day12.functions.js";
import { split_blocks } from '../utils/utils.js';

describe("--- Day 12: Hot Springs ---", () => {

  function get_input() {
    let input = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/), /\n/);
  })

  it('calculate', () => {
    let springs = new HotSprings();

    let res = springs.calculate(data[0].springs, data[0].blocks);
    expect(res).toBe(1);

    res = springs.calculate(data[1].springs, data[1].blocks);
    expect(res).toBe(4);

    res = springs.calculate(data[2].springs, data[2].blocks);
    expect(res).toBe(1);

    res = springs.calculate(data[3].springs, data[3].blocks);
    expect(res).toBe(1);

    res = springs.calculate(data[4].springs, data[4].blocks);
    expect(res).toBe(4);

    res = springs.calculate(data[5].springs, data[5].blocks);
    expect(res).toBe(10);
  }); 

  it('count arrangements', () => {
    let springs = new HotSprings();

    let res = springs.countArrangements(data);
    expect(res).toBe(21);
  }); 

  it('arrange unfolded', () => {
    let springs = new HotSprings();

    let res = springs.calculateUnfolded(data[0].springs, data[0].blocks);
    expect(res).toBe(1);

    res = springs.calculateUnfolded(data[1].springs, data[1].blocks);
    expect(res).toBe(16384);

    res = springs.calculateUnfolded(data[2].springs, data[2].blocks);
    expect(res).toBe(1);

    res = springs.calculateUnfolded(data[3].springs, data[3].blocks);
    expect(res).toBe(16);

    res = springs.calculateUnfolded(data[4].springs, data[4].blocks);
    expect(res).toBe(2500);

    res = springs.calculateUnfolded(data[5].springs, data[5].blocks);
    expect(res).toBe(506250);
  }); 
});
