import { expect } from "@jest/globals";
import { parseInputData, ReflectorDish } from "../day14/day14.functions.js";
import { split_blocks } from '../utils/utils.js';

describe("--- Day 14: Parabolic Reflector Dish ---", () => {

  function get_input() {
    let input = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/), /\n/);
  })

  it('fall point', () => {
    let reflection = new ReflectorDish();

    let res = reflection.pointNorth(data, 1, 0);
    expect(res).toBe(0);

    res = reflection.pointNorth(data, 3, 0);
    expect(res).toBe(1);

    res = reflection.pointNorth(data, 3, 4);
    expect(res).toBe(1);

    res = reflection.pointNorth(data, 3, 3);
    expect(res).toBe(0);

    res = reflection.pointNorth(data, 1, 3);
    expect(res).toBe(1);

    res = reflection.pointNorth(data, 0, 3);
    expect(res).toBe(0);
  }); 

  it('fall', () => {
    let reflection = new ReflectorDish();

    let res = reflection.fall(data, reflection.pointNorth);
    expect(res).toBe(true);
  }); 

  it('count round rocks', () => {
    let reflection = new ReflectorDish();

    let res = reflection.countNorth(data);
    expect(res).toBe(136);
  }); 

  it('cycle', () => {
    let reflection = new ReflectorDish();

    let res = reflection.moveCycle(data);
    expect(data[0].join('')).toBe('.....#....');
    expect(data[1].join('')).toBe('....#...O#');
    expect(data[2].join('')).toBe('...OO##...');
    expect(data[3].join('')).toBe('.OO#......');
    expect(data[4].join('')).toBe('.....OOO#.');
    expect(data[5].join('')).toBe('.O#...O#.#');
    expect(data[6].join('')).toBe('....O#....');
    expect(data[7].join('')).toBe('......OOOO');
    expect(data[8].join('')).toBe('#...O###..');
    expect(data[9].join('')).toBe('#..OO#....');

    reflection.moveCycle(data);
    expect(data[0].join('')).toBe('.....#....');
    expect(data[1].join('')).toBe('....#...O#');
    expect(data[2].join('')).toBe('.....##...');
    expect(data[3].join('')).toBe('..O#......');
    expect(data[4].join('')).toBe('.....OOO#.');
    expect(data[5].join('')).toBe('.O#...O#.#');
    expect(data[6].join('')).toBe('....O#...O');
    expect(data[7].join('')).toBe('.......OOO');
    expect(data[8].join('')).toBe('#..OO###..');
    expect(data[9].join('')).toBe('#.OOO#...O');

    reflection.moveCycle(data);
    expect(data[0].join('')).toBe('.....#....');
    expect(data[1].join('')).toBe('....#...O#');
    expect(data[2].join('')).toBe('.....##...');
    expect(data[3].join('')).toBe('..O#......');
    expect(data[4].join('')).toBe('.....OOO#.');
    expect(data[5].join('')).toBe('.O#...O#.#');
    expect(data[6].join('')).toBe('....O#...O');
    expect(data[7].join('')).toBe('.......OOO');
    expect(data[8].join('')).toBe('#...O###.O');
    expect(data[9].join('')).toBe('#.OOO#...O');
  }); 

  it('count round rocks after 1000000000 cycles', () => {
    let reflection = new ReflectorDish();

    let res = reflection.countAfterMultiCycles(data);
    expect(res).toBe(64);
  }); 
});
