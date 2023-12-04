/**
 * --- Day 4: Scratchcards ---
 */

 function parseInputData(data) {
  return data.map(line => {
    let card = line.trim().split(':');
    let numbers = card[1].split('|');
    return {
      card: parseInt(card[0].split(' ')[1]),
      copies: 1,
      winning: numbers[0].trim().split(' ').map(num => parseInt(num)),
      have: numbers[1].trim().split(' ').map(num => parseInt(num)),
    }
  });
}

const Scratchcards = function () {
  this.getScore = (card) => {
    return card.winning.reduce((score, num) => {
      if (card.have.indexOf(num) >= 0) {
        score = (score == 0) ? 1 : score = score * 2;
      }
      return score;
    }, 0)
  }

  this.sumScore = (cards) => {
    return cards.reduce((sum, card) => {
      return sum + this.getScore(card);
    }, 0)
  }

  this.cardWins = (card) => {
    return card.winning.filter((num) => card.have.indexOf(num) >= 0).length;
  }

  this.sumWins = (cards) => {
    for(let i = 0; i < cards.length; i ++) {
      let winsCount = this.cardWins(cards[i]);
      for(let j = 0; j < winsCount; j ++) {
        cards[i + 1 + j].copies += cards[i].copies;
      }
    }

    return cards.reduce((score, card) => {
      return score + card.copies;
    }, 0);
  }
}

export { parseInputData, Scratchcards };