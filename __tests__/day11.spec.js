import { expect } from "@jest/globals";
import { parseInputData, CosmicExpansion } from "../day11/day11.functions.js";
import { split_blocks } from '../utils/utils.js';

describe("--- Day 9: Mirage Maintenance ---", () => {

  function get_input() {
    let input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/), /\n/);
  })

  it('get empties', () => {
    let cosmic = new CosmicExpansion();
    let res = cosmic.getEmpties(data);

    expect(res).toMatchObject({rows: [3, 7], cols: [2, 5, 8]});
  }); 

  it('get path', () => {
    let cosmic = new CosmicExpansion();
    let empties = cosmic.getEmpties(data);

    let res = cosmic.getPath({y: 5, x: 1}, {y: 9, x: 4}, empties);
    expect(res).toBe(9);

    res = cosmic.getPath({y: 0, x: 3}, {y: 8, x: 7}, empties);
    expect(res).toBe(15);

    res = cosmic.getPath({y: 2, x: 0}, {y: 6, x: 9}, empties);
    expect(res).toBe(17);

    res = cosmic.getPath({y: 9, x: 0}, {y: 9, x: 4}, empties);
    expect(res).toBe(5);
  }); 

  it('get galaxies', () => {
    let cosmic = new CosmicExpansion();

    let res = cosmic.getGalaxies(data);
    expect(res.length).toBe(9);
  }); 

  it('get all pathes', () => {
    let cosmic = new CosmicExpansion();

    let res = cosmic.getAllPathes(data);
    expect(res).toBe(374);
  }); 

  it('get all pathes (scale 10, 100)', () => {
    let cosmic = new CosmicExpansion();

    let res = cosmic.getAllPathes(data, 10);
    expect(res).toBe(1030);

    res = cosmic.getAllPathes(data, 100);
    expect(res).toBe(8410);
  }); 
});
