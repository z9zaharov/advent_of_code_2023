import { expect } from "@jest/globals";
import { parseInputData, LensLibrary } from "../day15/day15.functions.js";
import { split_blocks } from '../utils/utils.js';

describe("--- Day 15: Lens Library ---", () => {

  function get_input() {
    let input = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/), /\n/);
  })

  it('parse input data', () => {
    expect(data.length).toBe(11);
    expect(data[0]).toMatchObject({label: 'rn', val: 1, op: '=', str: 'rn=1'});
    expect(data[1]).toMatchObject({label: 'cm', val: 0, op: '-', str: 'cm-'});
  }); 

  it('hash string HASH', () => {
    let lens = new LensLibrary();

    let res = lens.hashString('HASH');
    expect(res).toBe(52);
  }); 

  it('hash input data', () => {
    let lens = new LensLibrary();

    let res = lens.hashString(data[0].str);
    expect(res).toBe(30);

    res = lens.hashString(data[1].str);
    expect(res).toBe(253);

    res = lens.hashString(data[2].str);
    expect(res).toBe(97);

    res = lens.hashString(data[3].str);
    expect(res).toBe(47);

    res = lens.hashString(data[4].str);
    expect(res).toBe(14);

    res = lens.hashString(data[5].str);
    expect(res).toBe(180);

    res = lens.hashString(data[6].str);
    expect(res).toBe(9);

    res = lens.hashString(data[7].str);
    expect(res).toBe(197);

    res = lens.hashString(data[8].str);
    expect(res).toBe(48);

    res = lens.hashString(data[9].str);
    expect(res).toBe(214);

    res = lens.hashString(data[10].str);
    expect(res).toBe(231);
  }); 

  it('operate data', () => {
    let lens = new LensLibrary();

    lens.operate(data[0]);
    expect(lens.Boxes[0]).toMatchObject({'rn': 1});

    lens.operate(data[1]);
    expect(lens.Boxes[0]).toMatchObject({'rn': 1});

    lens.operate(data[2]);
    expect(lens.Boxes[0]).toMatchObject({'rn': 1});
    expect(lens.Boxes[1]).toMatchObject({'qp': 3});

    lens.operate(data[3]);
    expect(lens.Boxes[0]).toMatchObject({'rn': 1, 'cm': 2});
    expect(lens.Boxes[1]).toMatchObject({'qp': 3});

    lens.operate(data[4]);
    expect(lens.Boxes[0]).toMatchObject({'rn': 1, 'cm': 2});
    expect(lens.Boxes[1]).toMatchObject({});

    lens.operate(data[5]);
    expect(lens.Boxes[0]).toMatchObject({'rn': 1, 'cm': 2});
    expect(lens.Boxes[3]).toMatchObject({'pc': 4});

    lens.operate(data[6]);
    expect(lens.Boxes[0]).toMatchObject({'rn': 1, 'cm': 2});
    expect(lens.Boxes[3]).toMatchObject({'pc': 4, 'ot': 9});

    lens.operate(data[7]);
    expect(lens.Boxes[0]).toMatchObject({'rn': 1, 'cm': 2});
    expect(lens.Boxes[3]).toMatchObject({'pc': 4, 'ot': 9, 'ab': 5});

    lens.operate(data[8]);
    expect(lens.Boxes[0]).toMatchObject({'rn': 1, 'cm': 2});
    expect(lens.Boxes[3]).toMatchObject({'ot': 9, 'ab': 5});

    lens.operate(data[9]);
    expect(lens.Boxes[0]).toMatchObject({'rn': 1, 'cm': 2});
    expect(lens.Boxes[3]).toMatchObject({'ot': 9, 'ab': 5, 'pc': 6});

    lens.operate(data[10]);
    expect(lens.Boxes[0]).toMatchObject({'rn': 1, 'cm': 2});
    expect(lens.Boxes[3]).toMatchObject({'ot': 7, 'ab': 5, 'pc': 6});
  }); 

  it('hash sum', () => {
    let lens = new LensLibrary();

    let res = lens.hashSum(data);
    expect(res).toBe(1320);
  }); 

  it('focusing power of one box', () => {
    let lens = new LensLibrary();

    lens.operateAll(data);

    let res = lens.focusPowerOfBox(lens.Boxes[0], 0);
    expect(res).toBe(5);

    res = lens.focusPowerOfBox(lens.Boxes[3], 3);
    expect(res).toBe(140);
  }); 


  it('focusing power', () => {
    let lens = new LensLibrary();

    let res = lens.focusPower(data);
    expect(res).toBe(145);
  }); 
});
