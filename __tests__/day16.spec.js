import { expect } from "@jest/globals";
import { parseInputData, LavaFloor } from "../day16/day16.functions.js";
import { split_blocks } from '../utils/utils.js';

describe("--- Day 16: The Floor Will Be Lava ---", () => {

  function get_input() {
    let input = `.|...]....
|.-.].....
.....|-...
........|.
..........
.........]
..../.]]..
.-.-/..|..
.|....-|.]
..//.|....`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/), /\n/);
  })

  it('move beam', () => {
    let lavaFloor = new LavaFloor();

    let res = lavaFloor.moveBeam(data, {pos: {y: 0, x: 0}, dir: {y: 0, x: 1}});
    expect(res.length).toBe(2);
    expect(res[0]).toMatchObject({pos: {y: 0, x: 1}, dir: {y: -1, x: 0}});
    expect(res[1]).toMatchObject({pos: {y: 0, x: 1}, dir: {y: 1, x: 0}});
  }); 

  it('move step', () => {
    let lavaFloor = new LavaFloor();

    let res = lavaFloor.moveStep(data, [{ pos: { y: 0, x: 0}, dir: { y: 0, x: 1}}]);
    expect(res.length).toBe(2);

    res = lavaFloor.moveStep(data, res);
    expect(res.length).toBe(1);
  }); 

  it('move', () => {
    let lavaFloor = new LavaFloor();

    let res = lavaFloor.moveOne(data);
    expect(res).toBe(46);
  }); 

  it('move max entry point', () => {
    let lavaFloor = new LavaFloor();

    let res = lavaFloor.move(data, { pos: { y: 0, x: 3}, dir: { y: 1, x: 0}});
    expect(res).toBe(51);
  }); 

  it('move max energy', () => {
    let lavaFloor = new LavaFloor();

    let res = lavaFloor.getMaxEnergy(data);
    expect(res).toBe(51);
  }); 
});
