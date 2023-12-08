/**
 * --- Day 8: Haunted Wasteland ---
 */

 function parseInputData(data, separator) {
  let moves = data[0].split('');

  let rules = data[1].split(separator).reduce((rules, line) => {
    let left = line.split('=')[0].trim();
    let right = line.split('=')[1].trim();
    right = right.substr(1, right.indexOf(')') - 1);

    rules[left] = { 
      L: right.split(',')[0].trim(),
      R: right.split(',')[1].trim()
    }
    return rules;
  }, {});

  return { moves: moves, rules: rules };
}

const Wasteland = function () {

  this.Start = 'AAA';
  this.End = 'ZZZ';
  this.L = 'L';
  this.R = 'R';

  this.moveStep = (data, current, offset) => {
    let step = data.moves[offset];

    return {
      current: (step == this.L) ? data.rules[current].L : data.rules[current].R,
      offset: (offset < data.moves.length - 1) ? offset + 1 : 0
    }
  }

  this.path = (data) => {
    let count = 0;
    let current = this.Start;
    let offset = 0;

    while(current != this.End) {
      ({current, offset } = this.moveStep(data, current, offset));
      count ++;
    }

    return count;
  }

  this.getStartRules = (rules) => {
    return Object.keys(rules).filter(node => node.endsWith('A'));
  }

  this.getDividers = (num) => {
    let dividers = [];
    for(let i = 1; i < num / 2 + 1; i ++) {
      if (num % i == 0) {
        dividers.push(i);
      }
    }
    if (dividers.length == 1) {
      dividers.push(num);
    }
    return dividers;
  }

  this.pathByRule = (data) => {
    let rules = this.getStartRules(data.rules);
    let count = rules.map(r => 0);

    for(let i = 0; i < rules.length; i ++) {
      let offset = 0;
      while(!rules[i].endsWith('Z')) {
        let step = data.moves[offset];
        rules[i] = (step == this.L) ? data.rules[rules[i]].L : data.rules[rules[i]].R;
   
        offset = (offset < data.moves.length - 1) ? offset + 1 : 0;
        count[i] ++;
      }
    }
    let minDividers = count.reduce((dividers, num) => { 
      let numDividers = this.getDividers(num);

      dividers = [...dividers, ...numDividers];
      return dividers; 
    }, []);
    minDividers = minDividers.filter((c, i) => minDividers.indexOf(c) === i);

    let countMin = minDividers.reduce((mult, div) => mult * div, 1);
    return countMin;
  }
}

export { parseInputData, Wasteland };