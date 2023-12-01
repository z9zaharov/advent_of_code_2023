/**
 * --- Day 1: Trebuchet?! ---
 */

 function parseInputData(data, separator) {
  return data.map(line => line.trim());
}

const Trebuchet = function () {

  this.regex = /[1-9]|one|two|three|four|five|six|seven|eight|nine/;
  this.Digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  this.calibrate = (lines, findValue) => {
    return lines.reduce((sum, line) => {
      return sum + findValue(line);
    }, 0);
  }

  this.findValue = (line) => {
    let i = 0, j = line.length - 1;
    let isLeft = false, isRight = false;
    let result = '';

    while(i <= j && !(isLeft && isRight)) {
      if (!isLeft && this.isDigit(line[i])) {
        result = '' + line[i] + result;
        isLeft = true;
      }
    
      if (!isRight && this.isDigit(line[j])) {
        result = '' + result + line[j];
        isRight = true;
      }

      if (!isLeft)
        i ++; 
      if (!isRight) 
        j --;
    }

    if (i > j && result.length == 1) {
      result = '' + result + result;
    }

    return parseInt(result);
  }

  this.findValue2 = (line) => {
    let i = 0, j = line.length - 1;
    let isLeft = false, isRight = false;
    let result = '';

    while(i <= j && !(isLeft && isRight)) {
      if (!isLeft) {
        if (this.isDigit(line[i])) {
          result = '' + line[i] + result;
          isLeft = true;
        }
        let digitSpelled = this.isDigitSpelled(line, i, true);
        if (digitSpelled) {
          i = i + this.Digits[digitSpelled - 1].length;
          result = '' + digitSpelled + result;
          isLeft = true;
        }
      }
    
      if (!isRight) {
        if (this.isDigit(line[j])) {
          result = '' + result + line[j];
          isRight = true;
        }
        let digitSpelled = this.isDigitSpelled(line, j, false);
        if (digitSpelled) {
          j = j - this.Digits[digitSpelled - 1].length;
          result = '' + result + digitSpelled;
          isRight = true;
        }
      } 

      if (!isLeft)
        i ++; 
      if (!isRight) 
        j --;
    }

    if (i > j && result.length == 1) {
      result = '' + result + result;
    }

    return parseInt(result);
  }

  this.isDigit = (c) => c >= '0' && c <= '9';

  this.isDigitSpelled = (line, idx, dir) => {
    for(let i = 0; i < this.Digits.length; i ++) {
      let from = (dir) ? idx : idx - this.Digits[i].length + 1;
      if (line.substr(from, this.Digits[i].length) == this.Digits[i]) {
        return i + 1;
      }
    }
    return 0;
  }
}

export { parseInputData, Trebuchet };