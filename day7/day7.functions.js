/**
 * --- Day 7: Camel Cards ---
 */

 function parseInputData(data, separator) {
  
  return data.map(line => {
    let pair = line.split(' ');
    return {
      hand: pair[0].trim(),
      bid: parseInt(pair[1].trim())
    }
  })
}

const CamelCards = function () {

  this.J = 'J';
  this.Cards = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
  this.CardsWithJoker = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];
  this.Types = {HighCard: 0, OnePair: 1, TwoPair: 2, ThreeOfAKind: 3, FullHouse: 4, FourOfAKind: 5, FiveOfAKind: 6};

  this.getType = (hand) => {
    let sorted = hand.split('').sort((a, b) => (this.Cards.indexOf(a) == this.Cards.indexOf(b)) ? 0 : (this.Cards.indexOf(a) > this.Cards.indexOf(b)) ? 1 : -1);

    if (sorted[0] == sorted[1] && sorted[0] == sorted[2] && sorted[0] == sorted[3] && sorted[0] == sorted[4]) {
      return this.Types.FiveOfAKind;
    }
    else if (sorted[0] == sorted[1] && sorted[0] == sorted[2] && sorted[0] == sorted[3]
            || sorted[1] == sorted[2] && sorted[1] == sorted[3] && sorted[1] == sorted[4]) {
        return this.Types.FourOfAKind;
    }
    else if (sorted[0] == sorted[1] && sorted[0] == sorted[2] && sorted[3] == sorted[4]
      || sorted[0] == sorted[1] && sorted[2] == sorted[3] && sorted[2] == sorted[4]) {
      return this.Types.FullHouse;
    }
    else if (sorted[0] == sorted[1] && sorted[0] == sorted[2]
      || sorted[1] == sorted[2] && sorted[1] == sorted[3]
      || sorted[2] == sorted[3] && sorted[2] == sorted[4]) {
      return this.Types.ThreeOfAKind;
    }
    else if (sorted[0] == sorted[1] && sorted[2] == sorted[3]
      || sorted[0] == sorted[1] && sorted[3] == sorted[4]
      || sorted[1] == sorted[2] && sorted[3] == sorted[4]) {
      return this.Types.TwoPair;
    }
    else if (sorted[0] == sorted[1] || sorted[1] == sorted[2] || sorted[2] == sorted[3] || sorted[3] == sorted[4]) {
      return this.Types.OnePair;
    }
    else {
      return this.Types.HighCard;
    }
  }

  this.getTypeWithJoker = (hand) => {
    let handCopy = hand.split('');
    let countJ = handCopy.filter(c => c == this.J).length;

    if (countJ >= 4) {
      return this.Types.FiveOfAKind;
    }
    else if(countJ == 3) {
      let sorted = hand.split('').sort((a, b) => this.Cards.indexOf(a) - this.Cards.indexOf(b));
      if (sorted[0] == sorted[1] && sorted[0] != this.J || sorted[3] == sorted[4] && sorted[4] != this.J) {
        return this.Types.FiveOfAKind;
      }
      else {
        return this.Types.FourOfAKind;
      }
    }
    else if(countJ == 2 || countJ == 1) {
      const substitutedArr = this.substituteJ(hand);
      return Math.max(...substitutedArr.map(handWithoutJ => this.getType(handWithoutJ)));
    }
    else {
      return this.getType(hand);
    }
  }

  this.substituteJ = (hand) => {
    let subs = this.substitutions(hand);

    return subs.subs.reduce((result, sub) => {
      let substituted = subs.idxJ.reduce((res, idx, i) => {
        res[idx] = sub[i];
        return res;
      }, hand.split(''));
      result.push(substituted.join(''));
      return result;
    }, []);
  }

  this.substitutions = (hand) => {
    const idxJ = hand.split('').reduce((result, c, i) => { 
      if (c == this.J) {
        result.push(i);
      }
      return result;
    }, []);

    let subs = hand.split('').filter(c => c != this.J);
    subs = subs.filter((c, i) => subs.indexOf(c) === i);

    if (idxJ.length == 1) {
      return { idxJ: idxJ, subs: subs }
    }
    else if(idxJ.length == 2) {
      let subPairs = [];
      if (subs.length == 1) {
        subPairs.push([subs[0], subs[0]]);
      }
      if (subs.length == 2) {
        subPairs.push([subs[0], subs[0]]);
        subPairs.push([subs[0], subs[1]]);
        subPairs.push([subs[1], subs[0]]);
        subPairs.push([subs[1], subs[1]]);
      }
      else if (subs.length == 3) {
        subPairs.push([subs[0], subs[0]]);
        subPairs.push([subs[0], subs[1]]);
        subPairs.push([subs[0], subs[2]]);
  
        subPairs.push([subs[1], subs[0]]);
        subPairs.push([subs[1], subs[1]]);
        subPairs.push([subs[1], subs[2]]);
  
        subPairs.push([subs[2], subs[0]]);
        subPairs.push([subs[2], subs[1]]);
        subPairs.push([subs[2], subs[2]]);
      }
      return { idxJ: idxJ, subs: subPairs }
    }
  }
  
  this.secondCompare = (hand1, hand2, isJoker) => {
    let i = 0;
    while(hand1[i] == hand2[i] && i < hand1.length) {
      i ++;
    }
    let cards = (isJoker) ? this.CardsWithJoker : this.Cards;
    return (i < hand1.length) ? (cards.indexOf(hand1[i]) > cards.indexOf(hand2[i])) ? 1 : -1 : 0;
  }

  this.compareHands = (hand1, hand2, isJoker) => {
    const type1 = (isJoker) ? this.getTypeWithJoker(hand1) : this.getType(hand1);
    const type2 = (isJoker) ? this.getTypeWithJoker(hand2) : this.getType(hand2);
    return (type1 == type2) ? this.secondCompare(hand1, hand2, isJoker) : (type1 > type2) ? 1 : -1;
  }

  this.sortHands = (data, isJoker) => {
    return data.sort((pair1, pair2) => this.compareHands(pair1.hand, pair2.hand, isJoker));
  }

  this.totalWin = (data, isJoker = false) => {
    const sorted = this.sortHands(data, isJoker);
    return sorted.reduce((sum, pair, i) => sum + pair.bid * (i + 1), 0);
  }
}

export { parseInputData, CamelCards };