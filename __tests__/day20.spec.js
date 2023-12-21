import { expect } from "@jest/globals";
import { parseInputData, PulsePropagation } from "../day20/day20.functions.js";
import { split_blocks } from '../utils/utils.js';

describe("--- Day 20: Pulse Propagation ---", () => {

  function get_input() {
    let input = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/), /\n/);
  })

  it('parse input data', () => {
    expect(data['inv'].from).toMatchObject({c: 0});
  }); 

  it('pulse flip-flop', () => {
    let pulses = new PulsePropagation();

    expect(data['a'].state).toBe(0);
    let res = pulses.flipFlop(data['a'], 1);
    expect(res).toBe(false);

    res = pulses.flipFlop(data['a'], 0);
    expect(res).toMatchObject({modules: ['b'], state: 1});
  }); 

  it('pulse conjunction', () => {
    let pulses = new PulsePropagation();

    let res = pulses.conjunction(data['inv'], 0, 'c');
    expect(res).toMatchObject({modules: ['a'], state: 1, from: 'inv'});

    res = pulses.conjunction(data['inv'], 1, 'c');
    expect(res).toMatchObject({modules: ['a'], state: 0, from: 'inv'});
  }); 

  it('pulse usual', () => {
    let pulses = new PulsePropagation();

    let res = [];
    pulses.pulseModule('broadcaster', 0, data, res);
    expect(res[0]).toMatchObject({modules: ['a', 'b', 'c'], state: 0});
  }); 

  it('push button', () => {
    let pulses = new PulsePropagation();

    let res = pulses.pushButton(data);
    expect(res[0]).toBe(8);
    expect(res[1]).toBe(4);
  }); 

  it('push button 1000 times', () => {
    let pulses = new PulsePropagation();

    let res = pulses.run(data, 1000);
    expect(res).toBe(32000000);
  }); 
});
