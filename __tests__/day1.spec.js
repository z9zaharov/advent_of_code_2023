import { expect } from "@jest/globals";
import { parseInputData, Trebuchet } from "../day1/day1.functions.js";
import { split_blocks } from '../utils/utils';

describe("--- Day 1: Trebuchet?! ---", () => {

  function get_input() {
    let input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/), /\n/);
  })

  it('get two-digit number regex', () => {
    let trebuchet = new Trebuchet();

    let result = trebuchet.findDigits('1abc2');
    expect(result).toBe(12);

    result = trebuchet.findDigits('pqr3stu8vwx');
    expect(result).toBe(38);

    result = trebuchet.findDigits('a1b2c3d4e5f');
    expect(result).toBe(15);

    result = trebuchet.findDigits('treb7uchet');
    expect(result).toBe(77);

    result = trebuchet.findDigits('52');
    expect(result).toBe(52);
  }); 

  it('get calibration value', () => {
    let trebuchet = new Trebuchet();

    let result = trebuchet.calibrate(data);
    expect(result).toBe(142);
  }); 

  it('get two-digit number with spelled', () => {
    let trebuchet = new Trebuchet();

    let result = 0;

    result = trebuchet.findDigits('two1nine', true);
    expect(result).toBe(29);

    result = trebuchet.findDigits('eightwothree', true);
    expect(result).toBe(83);

    result = trebuchet.findDigits('abcone2threexyz', true);
    expect(result).toBe(13);

    result = trebuchet.findDigits('xtwone3four', true);
    expect(result).toBe(24);

    result = trebuchet.findDigits('4nineeightseven2', true);
    expect(result).toBe(42);

    result = trebuchet.findDigits('zoneight234', true);
    expect(result).toBe(14);

    result = trebuchet.findDigits('7pqrstsixteen', true);
    expect(result).toBe(76);

    result = trebuchet.findDigits('ninevct4cpdvqfxmspbz9xrvxfvbpzthreesfnncrqn', true);
    expect(result).toBe(93);

    result = trebuchet.findDigits('88xpnfpb', true);
    expect(result).toBe(88);

    result = trebuchet.findDigits('4xppxkgpng4mttgskp8gxnzsfivethree', true);
    expect(result).toBe(43);

    result = trebuchet.findDigits('v4vqpstmlhtt', true);
    expect(result).toBe(44);

    result = trebuchet.findDigits('7twobkgsntslhthreeqttvx1six1v', true);
    expect(result).toBe(71);

    result = trebuchet.findDigits('qxgfxkxkkf6hqbnsg4sevenninebvpjdnnrone', true);
    expect(result).toBe(61);
  }); 

  it('get calibration value 2', () => {
    let input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

    data = parseInputData(split_blocks(input, /\n/), /\n/);

    let trebuchet = new Trebuchet();

    let result = trebuchet.calibrate(data, true);
    expect(result).toBe(281);
  }); 
});