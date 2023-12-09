/**
 * --- Day 9: Mirage Maintenance ---
 */

 function parseInputData(data, separator) {
  return data.map(line => line.split(/\s+/).map(val => parseInt(val)));
}

const Oasis = function () {

  this.getDifferences = (line) => {
    let res = [];
    for(let i = 1; i < line.length; i ++) {
      res.push(line[i] - line[i - 1]);
    }
    return res;
  }

  this.isZero = (line) => {
    return line.filter(val => val != 0).length == 0;
  }

  this.getAllDifferences = (line) => {
    let res = [line];
    let diffs = this.getDifferences(line);
    res.push(diffs);

    while (!this.isZero(diffs)) {
      diffs = this.getDifferences(diffs);
      res.push(diffs);
    }

    return res;
  }

  this.getHistoryValue = (line) => {
    let report = this.getAllDifferences(line);

    for(let i = report.length - 1; i > 0; i --) {
      const prev = report[i - 1][report[i - 1].length - 1];
      const curr = report[i][report[i].length - 1];
      const val = prev + curr;
      report[i - 1].push(val);

      const preVal = report[i - 1][0] - report[i][0];
      report[i - 1].unshift(preVal);
    }
    return [report[0][0], report[0][report[0].length - 1]];
  }

  this.sumHistory = (data, isPre = false) => {
    return data.reduce((sum, line) => {
      return sum + ((isPre) ? this.getHistoryValue(line)[0] : this.getHistoryValue(line)[1]);
    }, 0)
  }
}

export { parseInputData, Oasis };