import { expect } from "@jest/globals";
import { parseInputData, PipeMaze } from "../day10/day10.functions.js";
import { split_blocks } from '../utils/utils.js';

describe("--- Day 10: Pipe Maze ---", () => {

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
    
    let res = pipeMaze.getAvailMoves(data, start)[0];
    expect(res.length).toBe(4);

    res = pipeMaze.getAvailMoves(data, {y: 0, x: 0})[0];
    expect(res.length).toBe(2);

    res = pipeMaze.getAvailMoves(data, {y: 0, x: data[0].length - 1})[0];
    expect(res.length).toBe(2);
  }); 

  it('get available positions', () => {
    let pipeMaze = new PipeMaze();
    
    let visited = new Array(data.length).fill('').map(line => new Array(line.length).fill('').map(val => false));
    let start = pipeMaze.getStartPos(data);
    let res = pipeMaze.getNextPos(data, visited, [start])
    expect(res.length).toBe(2);
  }); 

  it('get distance', () => {
    let pipeMaze = new PipeMaze();

    let res = pipeMaze.getDistance(data);
    expect(res[0]).toBe(4);
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
    expect(res[0]).toBe(8);
  }); 

  it('get avalable positions', () => {
    let input = `--7F7
--J||
---J|
S---J`;

    data = parseInputData(split_blocks(input, /\n/), /\n/);

    let pipeMaze = new PipeMaze();

    let res = pipeMaze.getDistance(data, true);
    expect(res[0]).toBe(13);
  }); 

  it('is enclosed', () => {
    let pipeMaze = new PipeMaze();

    let [distance, visited, start] = pipeMaze.getDistance(data);
    let res = pipeMaze.isEnclosed(data, visited, {y: 2, x: 2}, start);
    expect(res).toBe(true);
  }); 

  it('is enclosed 2', () => {
    let input = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`;

    data = parseInputData(split_blocks(input, /\n/), /\n/);

    let pipeMaze = new PipeMaze();

    let [distance, visited, start] = pipeMaze.getDistance(data);
    let res = pipeMaze.isEnclosed(data, visited, {y: 1, x: 0}, start);
    expect(res).toBe(false);

    res = pipeMaze.isEnclosed(data, visited, {y: 0, x: 1}, start);
    expect(res).toBe(false);
  }); 

  it('count enclosed', () => {
    let input = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`;

    data = parseInputData(split_blocks(input, /\n/), /\n/);

    let pipeMaze = new PipeMaze();

    let res = pipeMaze.countEnclosed(data);
    expect(res).toBe(4);
  }); 

  it('get start pos turn', () => {
    let input = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`;

    data = parseInputData(split_blocks(input, /\n/), /\n/);

    let pipeMaze = new PipeMaze();

    let [distance, visited, start] = pipeMaze.getDistance(data);
    expect(start.val).toBe('F');
  }); 

  it('is enclosed 3', () => {
    let input = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`;

    data = parseInputData(split_blocks(input, /\n/), /\n/);

    let pipeMaze = new PipeMaze();

    let [distance, visited, start] = pipeMaze.getDistance(data);
    let res = false;

    res = pipeMaze.isEnclosed(data, visited, {y: 8, x: 18}, start);
    expect(res).toBe(false);

    res = pipeMaze.isEnclosed(data, visited, {y: 9, x: 9}, start);
    expect(res).toBe(false);

    res = pipeMaze.isEnclosed(data, visited, {y: 1, x: 0}, start);
    expect(res).toBe(false);
  }); 

  it('count enclosed 2', () => {
    let input = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`;

    data = parseInputData(split_blocks(input, /\n/), /\n/);

    let pipeMaze = new PipeMaze();

//    let [distance, visited, start] = pipeMaze.getDistance(data);
//    console.table(pipeMaze.getSubMaze(data, visited, {y: 0, x: 0}, 20))

    let res = pipeMaze.countEnclosed(data);
    expect(res).toBe(8);
  }); 

  it('count enclosed 3', () => {
    let input = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`;

    data = parseInputData(split_blocks(input, /\n/), /\n/);

    let pipeMaze = new PipeMaze();

    // let [distance, visited, start] = pipeMaze.getDistance(data);
    // console.table(pipeMaze.getSubMaze(data, visited, {y: 0, x: 0}, 20))

    let res = pipeMaze.countEnclosed(data, true);
    expect(res).toBe(10);
  }); 
});
