import { expect } from "@jest/globals";
import { parseInputData, SeedFertilizer } from "../day5/day5.functions.js";
import { split_blocks } from '../utils/utils.js';

describe("--- Day 5: If You Give A Seed A Fertilizer ---", () => {

  function get_input() {
    let input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n\n/), /\n/);
  })

  it('test parse data', () => {
    expect(data.seeds.length).toBe(4);
    expect(Object.keys(data.maps).length).toBe(7);
  }); 

  it('transform step seed 0', () => {
    let fertilizer = new SeedFertilizer();
    let res = { to: 'seed', val: data.seeds[0] };

    res = fertilizer.transformStep(res.to, res.val, data.maps);
    expect(res).toMatchObject({to: 'soil', val: 81});

    res = fertilizer.transformStep(res.to, res.val, data.maps);
    expect(res).toMatchObject({to: 'fertilizer', val: 81});

    res = fertilizer.transformStep(res.to, res.val, data.maps);
    expect(res).toMatchObject({to: 'water', val: 81});

    res = fertilizer.transformStep(res.to, res.val, data.maps);
    expect(res).toMatchObject({to: 'light', val: 74});

    res = fertilizer.transformStep(res.to, res.val, data.maps);
    expect(res).toMatchObject({to: 'temperature', val: 78});

    res = fertilizer.transformStep(res.to, res.val, data.maps);
    expect(res).toMatchObject({to: 'humidity', val: 78});

    res = fertilizer.transformStep(res.to, res.val, data.maps);
    expect(res).toMatchObject({to: 'location', val: 82});
  }); 

  it('transform step seed 1', () => {
    let fertilizer = new SeedFertilizer();
    let res = { to: 'seed', val: data.seeds[1] };

    res = fertilizer.transformStep(res.to, res.val, data.maps);
    expect(res).toMatchObject({to: 'soil', val: 14});

    res = fertilizer.transformStep(res.to, res.val, data.maps);
    expect(res).toMatchObject({to: 'fertilizer', val: 53});

    res = fertilizer.transformStep(res.to, res.val, data.maps);
    expect(res).toMatchObject({to: 'water', val: 49});

    res = fertilizer.transformStep(res.to, res.val, data.maps);
    expect(res).toMatchObject({to: 'light', val: 42});

    res = fertilizer.transformStep(res.to, res.val, data.maps);
    expect(res).toMatchObject({to: 'temperature', val: 42});

    res = fertilizer.transformStep(res.to, res.val, data.maps);
    expect(res).toMatchObject({to: 'humidity', val: 43});

    res = fertilizer.transformStep(res.to, res.val, data.maps);
    expect(res).toMatchObject({to: 'location', val: 43});
  }); 

  it('transform', () => {
    let fertilizer = new SeedFertilizer();
    let res = 0;

    res = fertilizer.transform(data.seeds[0], data.maps);
    expect(res).toBe(82);

    res = fertilizer.transform(data.seeds[1], data.maps);
    expect(res).toBe(43);

    res = fertilizer.transform(data.seeds[2], data.maps);
    expect(res).toBe(86);

    res = fertilizer.transform(data.seeds[3], data.maps);
    expect(res).toBe(35);

    res = fertilizer.transform(82, data.maps);
    expect(res).toBe(46);
  }); 

  it('get lowest location', () => {
    let fertilizer = new SeedFertilizer();
    
    let res = fertilizer.getLowestLocation(data);
    expect(res).toBe(35);
  }); 

  it('get lowest location of ranges', () => {
    let fertilizer = new SeedFertilizer();
    
    let res = fertilizer.getLowestLocationOfRanges(data);
    expect(res).toBe(46);
  }); 
});