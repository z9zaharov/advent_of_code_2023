import { expect } from "@jest/globals";
import { parseInputData, CamelCards } from "../day7/day7.functions.js";
import { split_blocks } from '../utils/utils.js';

describe("--- Day 7: Camel Cards ---", () => {

  function get_input() {
    let input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;
   
    return input;
  }  

  let data = [];

  beforeEach(function() {
    data = parseInputData(split_blocks(get_input(), /\n/), /\n/);
  })

  it('get type of hand', () => {
    let camelCards = new CamelCards();

    let res = camelCards.getType('32T3K');
    expect(res).toBe(camelCards.Types.OnePair);

    res = camelCards.getType(data[1].hand);
    expect(res).toBe(camelCards.Types.ThreeOfAKind);

    res = camelCards.getType(data[2].hand);
    expect(res).toBe(camelCards.Types.TwoPair);

    res = camelCards.getType(data[3].hand);
    expect(res).toBe(camelCards.Types.TwoPair);

    res = camelCards.getType(data[4].hand);
    expect(res).toBe(camelCards.Types.ThreeOfAKind);

    res = camelCards.getType('QQTQT');
    expect(res).toBe(camelCards.Types.FullHouse);

    res = camelCards.getType('22T22');
    expect(res).toBe(camelCards.Types.FourOfAKind);

    res = camelCards.getType('KKKKK');
    expect(res).toBe(camelCards.Types.FiveOfAKind);
  }); 

  it('second compare', () => {
    let camelCards = new CamelCards();

    let res = camelCards.secondCompare('33332', '2AAAA');
    expect(res).toBeGreaterThan(0);

    res = camelCards.secondCompare('77888', '77788');
    expect(res).toBeGreaterThan(0);
  });

  it('compare hands', () => {
    let camelCards = new CamelCards();

    let res = camelCards.compareHands(data[2].hand, data[3].hand);
    expect(res).toBe(1);

    res = camelCards.secondCompare(data[1].hand, data[4].hand);
    expect(res).toBe(-1);
  });

  it('total win', () => {
    let camelCards = new CamelCards();

    let res = camelCards.totalWin(data);
    expect(res).toBe(6440);
  });

  it('get type of hand with joker', () => {
    let camelCards = new CamelCards();

    let res = camelCards.getTypeWithJoker(data[0].hand);
    expect(res).toBe(camelCards.Types.OnePair);

    res = camelCards.getTypeWithJoker(data[1].hand);
    expect(res).toBe(camelCards.Types.FourOfAKind);

    res = camelCards.getTypeWithJoker(data[2].hand);
    expect(res).toBe(camelCards.Types.TwoPair);

    res = camelCards.getTypeWithJoker(data[3].hand);
    expect(res).toBe(camelCards.Types.FourOfAKind);

    res = camelCards.getTypeWithJoker(data[4].hand);
    expect(res).toBe(camelCards.Types.FourOfAKind);

    res = camelCards.getTypeWithJoker('7777J');
    expect(res).toBe(camelCards.Types.FiveOfAKind);

    res = camelCards.getTypeWithJoker('J9J9J');
    expect(res).toBe(camelCards.Types.FiveOfAKind);

    res = camelCards.getTypeWithJoker('JJJJJ');
    expect(res).toBe(camelCards.Types.FiveOfAKind);

    res = camelCards.getTypeWithJoker('JJ222');
    expect(res).toBe(camelCards.Types.FiveOfAKind);

    res = camelCards.getTypeWithJoker('JJ3J3');
    expect(res).toBe(camelCards.Types.FiveOfAKind);
  }); 

  it('total win with joker', () => {
    let camelCards = new CamelCards();

    let res = camelCards.totalWin(data, true);
    expect(res).toBe(5905);
  });
});