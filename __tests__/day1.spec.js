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

  it('get two-digit number', () => {
    let trebuchet = new Trebuchet();

    let result = trebuchet.findValue('1abc2');
    expect(result).toBe(12);

    result = trebuchet.findValue('pqr3stu8vwx');
    expect(result).toBe(38);

    result = trebuchet.findValue('a1b2c3d4e5f');
    expect(result).toBe(15);

    result = trebuchet.findValue('treb7uchet');
    expect(result).toBe(77);

    result = trebuchet.findValue('52');
    expect(result).toBe(52);

    result = trebuchet.findValue('seven88');
    expect(result).toBe(88);

    result = trebuchet.findValue('sixfourg3');
    expect(result).toBe(33);
  }); 

  it('get calibration value', () => {
    let trebuchet = new Trebuchet();

    let result = trebuchet.calibrate(data, trebuchet.findValue);
    expect(result).toBe(142);
  }); 

  it('get isDigitSpelled', () => {
    let trebuchet = new Trebuchet();

    let result = 0;
    result = trebuchet.isDigitSpelled('two1nine', 0, true);
    expect(result).toBe(2);

    result = trebuchet.isDigitSpelled('two1nine', 7, false);
    expect(result).toBe(9);

    result = trebuchet.isDigitSpelled('two1n', 4, false);
    expect(result).toBe(0);

    result = trebuchet.isDigitSpelled('oneone', 4, false);
    expect(result).toBe(0);
  }); 

  it('get two-digit number with spelled', () => {
    let trebuchet = new Trebuchet();

    let result = 0;

    result = trebuchet.findValue2('two1nine');
    expect(result).toBe(29);

    result = trebuchet.findValue2('eightwothree');
    expect(result).toBe(83);

    result = trebuchet.findValue2('abcone2threexyz');
    expect(result).toBe(13);

    result = trebuchet.findValue2('xtwone3four');
    expect(result).toBe(24);

    result = trebuchet.findValue2('4nineeightseven2');
    expect(result).toBe(42);

    result = trebuchet.findValue2('zoneight234');
    expect(result).toBe(14);

    result = trebuchet.findValue2('7pqrstsixteen');
    expect(result).toBe(76);

    result = trebuchet.findValue2('ninevct4cpdvqfxmspbz9xrvxfvbpzthreesfnncrqn');
    expect(result).toBe(93);

    result = trebuchet.findValue2('88xpnfpb');
    expect(result).toBe(88);

    result = trebuchet.findValue2('4xppxkgpng4mttgskp8gxnzsfivethree');
    expect(result).toBe(43);

    result = trebuchet.findValue2('v4vqpstmlhtt');
    expect(result).toBe(44);

    result = trebuchet.findValue2('7twobkgsntslhthreeqttvx1six1v');
    expect(result).toBe(71);

    result = trebuchet.findValue2('qxgfxkxkkf6hqbnsg4sevenninebvpjdnnrone');
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

    let result = trebuchet.calibrate(data, trebuchet.findValue2);
    expect(result).toBe(281);
  }); 
});