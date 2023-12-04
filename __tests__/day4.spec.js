import { expect } from "@jest/globals";
import { parseInputData, Scratchcards } from "../day4/day4.functions.js";
import { split_blocks } from '../utils/utils.js';

describe("--- Day 4: Scratchcards ---", () => {

  function get_input() {
    let input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/), /\n/);
  })

  it('find card score', () => {
    let scratchcards = new Scratchcards();

    let res = '';
    res = scratchcards.getScore(data[0]);
    expect(res).toBe(8);

    res = scratchcards.getScore(data[1]);
    expect(res).toBe(2);

    res = scratchcards.getScore(data[2]);
    expect(res).toBe(2);

    res = scratchcards.getScore(data[3]);
    expect(res).toBe(1);

    res = scratchcards.getScore(data[4]);
    expect(res).toBe(0);

    res = scratchcards.getScore(data[5]);
    expect(res).toBe(0);
  }); 

  it('find card score', () => {
    let scratchcards = new Scratchcards();

    let res = scratchcards.sumScore(data);
    expect(res).toBe(13);
  }); 

  it('find cards wins', () => {
    let scratchcards = new Scratchcards();

    let res = scratchcards.sumWins(data);
    expect(res).toBe(30);
  }); 
});