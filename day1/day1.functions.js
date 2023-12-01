/**
 * --- Day 1: Trebuchet?! ---
 */

 function parseInputData(data) {
  return data.map(line => line.trim());
}

const Trebuchet = function () {

  this.regex = /[1-9]/gi;
  this.regexSpelled = /[1-9]|one|two|three|four|five|six|seven|eight|nine/gi;
  this.Digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  this.calibrate = (lines, isSpelled = false) => {
    return lines.reduce((sum, line) => {
      let val = (isSpelled) ? this.findDigits(line, true) : this.findDigits(line);
      return sum + val;
    }, 0);
  }

  this.findDigits = (line, isSpelled = false) => {
    return (isSpelled) ? this.findRegex(line, this.regexSpelled) : this.findRegex(line, this.regex);
  }

  this.findRegex = (line, regex) => {
    var m, matches = [];
    while (m = regex.exec(line)) {
      regex.lastIndex = m.index + 1;
      matches.push(m[0]);
    }

    return (matches.length > 1) 
            ? this.getNumeric(matches[0]) * 10 + this.getNumeric(matches[matches.length - 1]) 
            : (matches.length == 1) 
                ? this.getNumeric(matches[0]) * 10 + this.getNumeric(matches[0]) 
                : 0;
  }

  this.getNumeric = (val) => {
    if (val && val.length == 1 && val >= '0' && val <= '9') {
      return parseInt(val);
    }
    else {
      return this.Digits.indexOf(val) + 1;
    }
  }
}

export { parseInputData, Trebuchet };