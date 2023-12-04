/**
 * --- Day 3: Gear Ratios ---
 */

 function parseInputData(data) {
  return data.map(line => line.trim());
}

const EngineSchematic = function () {

  this.Empty = '.';

  this.findNumbers = (data) => {
    let numbers = [];
    let isStart = false;
    let part = '';

    for(let i = 0; i < data.length; i ++) {
      for(let j = 0; j < data.length; j ++) {
        if(this.isDigit(data[i][j])) {
          part = part + data[i][j];
          if (!isStart) {
            isStart = true;
          }
        }
        else if (isStart) {
          isStart = false;
          numbers.push({ 'val': part, row: i, from: j - part.length, to: j - 1});
          part = '';
        }
      }

      if (part.length > 0) {
        isStart = false;
        numbers.push({ 'val': part, row: i, from: data[i].length - part.length, to: data[i].length -  1});
        part = '';
      }
    }

    return numbers;
  }

  this.isPartNumber = (scheme, part) => {
    const maxY = scheme.length - 1;
    const maxX = scheme[0].length - 1;
    const boundaries = this.getBoundaries(part, maxY, maxX);

    for(let i = 0; i < boundaries.length; i ++) {
      for(let j = boundaries[i].from; j <= boundaries[i].to; j ++) {
        let point = scheme[boundaries[i].row][j];
        if (!this.isDigit(point) && point != this.Empty) {
          return true;
        }

      }
    }
    return false;
  }

  this.getBoundaries = (part, maxY, maxX) => {
    const around = [];

    const left = (part.from > 0) ? part.from - 1 : part.from;
    const right = (part.to < maxX) ? part.to + 1 : part.to;

    if (part.row > 0) {
      around.push({ row: part.row - 1, from: left, to: right });
    }
    if (part.from > 0) {
      around.push({ row: part.row, from: left, to: left });
    }
    if (part.to < maxX) {
      around.push({ row: part.row, from: right, to: right });
    }
    if (part.row < maxY) {
      around.push({ row: part.row + 1, from: left, to: right });
    }

    return around;
  }

  this.getAdjacents = (y, x, parts, maxY, maxX) => {
    let result = [];
    parts.forEach(part => {
      const boundaries = this.getBoundaries(part, maxY, maxX);
      for(let i = 0; i < boundaries.length; i ++) {
        if (y == boundaries[i].row && x >= boundaries[i].from && x <= boundaries[i].to) {
          result.push(part);
        }
      }
    })
    return result;
  }

  this.getSum = (scheme) => {
    let parts = this.findNumbers(scheme);

    return parts.reduce((sum, part) => {
      return sum + ((this.isPartNumber(scheme, part)) ? parseInt(part.val) : 0);
    }, 0);
  }

  this.getMulti = (scheme) => {
    let result = 0;

    let parts = this.findNumbers(scheme);
    const maxY = scheme.length - 1;
    const maxX = scheme[0].length - 1;

    for(let i = 0; i < scheme.length; i ++) {
      for(let j = 0; j < scheme[i].length; j ++) {
        if (scheme[i][j] == '*') {
          let adjacents = this.getAdjacents(i, j, parts, maxY, maxX);;
          if (adjacents.length == 2) {
            result += parseInt(adjacents[0].val) * parseInt(adjacents[1].val);
          }
        }
      }
    }
    return result;
  }

  this.isDigit = (c) => (c >= '0' && c <= '9');
}

export { parseInputData, EngineSchematic };