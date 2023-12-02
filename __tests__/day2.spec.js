import { expect } from "@jest/globals";
import { parseInputData, CubeConundrum } from "../day2/day2.functions.js";
import { split_blocks } from '../utils/utils.js';

describe("--- Day 2: Cube Conundrum ---", () => {

  function get_input() {
    let input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/), /\n/);
  })

  it('parse input', () => {
    expect(data.length).toBe(5);
    expect(data[0].sets.length).toBe(3);
    expect(data[0].sets[0]).toMatchObject({ blue: 3, red: 4})
  }); 

  it('possible score', () => {
    let conundrum = new CubeConundrum();

    let res = conundrum.countGames(data);
    expect(res).toBe(8);
  }); 


  it('get cube power', () => {
    let conundrum = new CubeConundrum();

    let res = 0;
    res = conundrum.getCubePower(data[0]);
    expect(res).toBe(48);

    res = conundrum.getCubePower(data[1]);
    expect(res).toBe(12);

    res = conundrum.getCubePower(data[2]);
    expect(res).toBe(1560);

    res = conundrum.getCubePower(data[3]);
    expect(res).toBe(630);

    res = conundrum.getCubePower(data[4]);
    expect(res).toBe(36);
  }); 

  it('get sum of cube powers', () => {
    let conundrum = new CubeConundrum();

    let res = 0;
    res = conundrum.getSumOfPowers(data);
    expect(res).toBe(2286);
  }); 
});