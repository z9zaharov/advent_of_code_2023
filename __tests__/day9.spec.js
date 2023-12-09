import { expect } from "@jest/globals";
import { parseInputData, Oasis } from "../day9/day9.functions.js";
import { split_blocks } from '../utils/utils.js';

describe("--- Day 9: Mirage Maintenance ---", () => {

  function get_input() {
    let input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/), /\n/);
  })

  it('test parse data', () => {
    expect(data.length).toBe(3);
    expect(data[0].length).toBe(6);
  }); 

  it('get differences', () => {
    let oasis = new Oasis();

    let res = oasis.getDifferences(data[0]);
    expect(res.length).toBe(5);
    expect(res).toEqual(expect.arrayContaining([3, 3, 3, 3, 3]));

    res = oasis.getDifferences(res);
    expect(res.length).toBe(4);
    expect(res).toEqual(expect.arrayContaining([0, 0, 0, 0]));
  }); 

  it('get add differences', () => {
    let oasis = new Oasis();

    let res = oasis.getAllDifferences(data[0]);
    expect(res.length).toBe(3);
    expect(res[1].length).toBe(5);
    expect(res[1]).toEqual(expect.arrayContaining([3, 3, 3, 3, 3]));
    expect(res[2].length).toBe(4);
    expect(res[2]).toEqual(expect.arrayContaining([0, 0, 0, 0]));
  }); 

  it('get history value', () => {
    let oasis = new Oasis();

    let res = oasis.getHistoryValue(data[0])[1];
    expect(res).toBe(18);

    res = oasis.getHistoryValue(data[1])[1];
    expect(res).toBe(28);

    res = oasis.getHistoryValue(data[2])[1];
    expect(res).toBe(68);
  }); 

  it('get history sum', () => {
    let oasis = new Oasis();

    let res = oasis.sumHistory(data);
    expect(res).toBe(114);
  }); 

  it('get differences and history value', () => {
    let oasis = new Oasis();

    let data = "23 31 36 38 37 33 26 16 3 -13 -32 -54 -79 -107 -138 -172 -209 -249 -292 -338 -387".split(/\s+/).map(val => parseInt(val));
    let res = oasis.getDifferences(data);
    expect(res).toEqual(expect.arrayContaining([8, 5, 2, -1, -4, -7, -10, -13, -16, -19, -22, -25, -28, -31, -34, -37, -40, -43, -46, -49]));

    res = oasis.getDifferences(res);
    expect(res.length).toBe(19);
    expect(res).toEqual(expect.arrayContaining([-3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3]));

    res = oasis.getDifferences(res);
    expect(res.length).toBe(18);
    expect(res).toEqual(expect.arrayContaining([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));

    res = oasis.getHistoryValue(data)[1];
    expect(res).toBe(-439);
  }); 


  it('get differences and history value 2', () => {
    let oasis = new Oasis();

    let data = "11 15 30 65 125 208 302 382 407 317 30 -561 -1591 -3226 -5666 -9148 -13949 -20389 -28834 -39699 -53451".split(/\s+/).map(val => parseInt(val));
    let res = oasis.getDifferences(data);
    expect(res.length).toBe(20);
    expect(res).toEqual(expect.arrayContaining([4, 15, 35, 60, 83, 94, 80, 25, -90, -287, -591, -1030, -1635, -2440, -3482, -4801, -6440, -8445, -10865, -13752]));

    res = oasis.getDifferences(res);
    expect(res.length).toBe(19);
    expect(res).toEqual(expect.arrayContaining([11, 20, 25, 23, 11, -14, -55, -115, -197, -304, -439, -605, -805, -1042, -1319, -1639, -2005, -2420, -2887]));

    res = oasis.getDifferences(res);
    expect(res.length).toBe(18);
    expect(res).toEqual(expect.arrayContaining([9, 5, -2, -12, -25, -41, -60, -82, -107, -135, -166, -200, -237, -277, -320, -366, -415, -467]));

    res = oasis.getDifferences(res);
    expect(res.length).toBe(17);
    expect(res).toEqual(expect.arrayContaining([-4, -7, -10, -13, -16, -19, -22, -25, -28, -31, -34, -37, -40, -43, -46, -49, -52]));

    res = oasis.getDifferences(res);
    expect(res.length).toBe(16);
    expect(res).toEqual(expect.arrayContaining([-3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3]));

    res = oasis.getDifferences(res);
    expect(res.length).toBe(15);
    expect(res).toEqual(expect.arrayContaining([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));

    res = oasis.getHistoryValue(data)[1];
    expect(res).toBe(-3 - 52 - 467 - 2887 - 13752 -53451);
  }); 

  it('get pre history value', () => {
    let oasis = new Oasis();

    let res = oasis.getHistoryValue(data[0])[0];
    expect(res).toBe(-3);

    res = oasis.getHistoryValue(data[1])[0];
    expect(res).toBe(0);

    res = oasis.getHistoryValue(data[2])[0];
    expect(res).toBe(5);
  }); 

  it('get history sum', () => {
    let oasis = new Oasis();

    let res = oasis.sumHistory(data, true);
    expect(res).toBe(2);
  }); 
});
