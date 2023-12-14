import { expect } from "@jest/globals";
import { parseInputData, Mirrors } from "../day13/day13.functions.js";
import { split_blocks } from '../utils/utils.js';

describe("--- Day 13: Point of Incidence ---", () => {

  function get_input() {
    let input = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n\n/), /\n/);
  })

  it('parse input data', () => {
    expect(data.length).toBe(2);
    expect(data[0].length).toBe(7);
    expect(data[1].length).toBe(7);
  }); 

  it('compare cols and rows', () => {
    let mirrors = new Mirrors();

    let res = mirrors.compareCols(data[0], 0, 1);
    expect(res).toBe(false);

    res = mirrors.compareCols(data[0], 4, 5);
    expect(res).toBe(true);

    res = mirrors.compareRows(data[1], 1, 2);
    expect(res).toBe(false);

    res = mirrors.compareRows(data[1], 3, 4);
    expect(res).toBe(true);
  }); 

  it('further compare cols and rows', () => {
    let mirrors = new Mirrors();

    let res = mirrors.furtherCompare(data[0], 3, 6, 0, data[0].length, mirrors.compareCols);
    expect(res).toBe(true);
  }); 

  it('find edge', () => {
    let mirrors = new Mirrors();

    let res = mirrors.findEdge(data[0]);
    expect(res).toMatchObject({ orientation: mirrors.Orientation.V, val: 5 });

    res = mirrors.findEdge(data[1]);
    expect(res).toMatchObject({ orientation: mirrors.Orientation.H, val: 4 });
  }); 

  it('compare lines with one smudge', () => {
    let mirrors = new Mirrors();

    let line = mirrors.smudgePos(data[1][1], 4);
    data[1][1] = line;

    let res = mirrors.compareRows(data[1], 0, 1);
    line = mirrors.smudgePos(data[1][1], 4);
    data[1][1] = line;

    expect(res).toBe(true);
  }); 

  it('find edge with one smudge', () => {
    let mirrors = new Mirrors();

    let line = mirrors.smudgePos(data[1][1], 4);
    data[1][1] = line;

    let res = mirrors.findEdge(data[1]);
    line = mirrors.smudgePos(data[1][1], 4);
    data[1][1] = line;

    expect(res).toMatchObject({ orientation: mirrors.Orientation.H, val: 1 });
  }); 

  it('find edge with smudge', () => {
    let mirrors = new Mirrors();

    let res = mirrors.findEdgeWithTheSmudge(data[0]);
    expect(res).toMatchObject({ orientation: mirrors.Orientation.H, val: 3 });

    res = mirrors.findEdgeWithTheSmudge(data[1]);
    expect(res).toMatchObject({ orientation: mirrors.Orientation.H, val: 1 });
  }); 

  it('summarize', () => {
    let mirrors = new Mirrors();

    let res = mirrors.summarize(data);
    expect(res).toBe(405);
  }); 

  it('summarize with smudges', () => {
    let mirrors = new Mirrors();

    let res = mirrors.summarize(data, true);
    expect(res).toBe(400);
  }); 

  it('summarize with smudges (not found)', () => {
    let input = `##..........##..#
..####..####..##.
..####..####.....
..##......##..##.
#..#..##..#..####
#.#........#.####
#####.###########`;

    data = parseInputData(split_blocks(input, /\n\n/), /\n/);
    
    let mirrors = new Mirrors();

    let res = mirrors.findEdgeWithTheSmudge(data[0]);
    expect(res).toMatchObject({ orientation: mirrors.Orientation.V, val: 7 });
  }); 


  it('summarize with smudges (not found 2)', () => {
    let input = `###......
..#.##..#
...######
...###...
###.#####
#..##....
#..##....
###.#####
...###...`;

    data = parseInputData(split_blocks(input, /\n\n/), /\n/);
    
    let mirrors = new Mirrors();
    let res = mirrors.findEdgeWithTheSmudge(data[0]);
    expect(res).toMatchObject({ orientation: mirrors.Orientation.V, val: 8 });
  }); 

  it('summarize with smudges (not found 3)', () => {
    let input = `.####..#.#.#.##..
........#..##....
..##..#.....#..##
......##.##.#####
######.#.####....
..##....#..##.#..
.#..#..#####.#...
..##...#..#...#.#
#######.#....####`;

    data = parseInputData(split_blocks(input, /\n\n/), /\n/);
    
    let mirrors = new Mirrors();
    let res = mirrors.findEdgeWithTheSmudge(data[0]);
    expect(res).toMatchObject({ orientation: mirrors.Orientation.V, val: 16 });
  }); 

  it('summarize with smudges (not found 4)', () => {
    let input = `.###..###
.##....##
#.#....#.
.########
##.#..#.#
##......#
##..###.#
#.#.##.#.
.#......#
..#....#.
####..###
...#..#..
...#..#..
####..###
..#....#.`;

    data = parseInputData(split_blocks(input, /\n\n/), /\n/);
    
    let mirrors = new Mirrors();
    let res = mirrors.findEdgeWithTheSmudge(data[0]);
    expect(res).toMatchObject({ orientation: mirrors.Orientation.V, val: 5 });
  }); 

  it('summarize with smudges (not found 5)', () => {
    let input = `####..#.#####
#..#...##.##.
.##.##.######
#..#...#.....
#..#.##..####
###.#..#.....
#..###..#....
#..#......##.
####..##..##.`;

    data = parseInputData(split_blocks(input, /\n\n/), /\n/);
    
    let mirrors = new Mirrors();
    let res = mirrors.findEdgeWithTheSmudge(data[0]);
    expect(res).toMatchObject({ orientation: mirrors.Orientation.V, val: 2 });
  }); 

  it('smudge pos', () => {
    let mirrors = new Mirrors();

    let line = '..##...#..#...#.#';
    let res = mirrors.smudgePos(line, 15);
    expect(res).toBe('..##...#..#...###');

    res = mirrors.smudgePos(res, 15);
    expect(res).toBe(line);
  }); 
});
