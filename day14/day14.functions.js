/**
 * --- Day 14: Parabolic Reflector Dish ---
 */

function parseInputData(data, separator) {
  return data.map(line => line.split(''));
}

const ReflectorDish = function () {

  this.pointNorth = (data, y, x) => {
    if (data[y][x] == 'O' && y > 0 && data[y - 1][x] == '.') {
      data[y - 1][x] = 'O';
      data[y][x] = '.';
      return 1;
    }
    return 0;
  }

  this.pointWest = (data, y, x) => {
    if (data[y][x] == 'O' && x > 0 && data[y][x - 1] == '.') {
      data[y][x - 1] = 'O';
      data[y][x] = '.';
      return 1;
    }
    return 0;
  }

  this.pointSouth = (data, y, x) => {
    if (data[y][x] == 'O' && y < data.length - 1 && data[y + 1][x] == '.') {
      data[y + 1][x] = 'O';
      data[y][x] = '.';
      return 1;
    }
    return 0;
  }

  this.pointEast = (data, y, x) => {
    if (data[y][x] == 'O' && x < data[y].length - 1 && data[y][x + 1] == '.') {
      data[y][x + 1] = 'O';
      data[y][x] = '.';
      return 1;
    }
    return 0;
  }

  this.fallStep = (data, pointStep) => {
    let falls = 0;
    for(let i = 0; i < data.length; i ++) {
      for(let j = 0; j < data[i].length; j ++) {
        falls += pointStep(data, i, j);
      }
    }
    return falls;
  }

  this.fall = (data, pointStep) => {
    while(true) {
      if (this.fallStep(data, pointStep) == 0) {
        return true;
      }
    }
    return false;
  }

  this.moveCycle = (data) => {
    this.fall(data, this.pointNorth);
    this.fall(data, this.pointWest);
    this.fall(data, this.pointSouth);
    this.fall(data, this.pointEast);
  }

  this.countAfterMultiCycles = (data, cycles = 1000000000) => {
    let results = {};
    let i = 0;
    let isRepeat = false;
    let key = '';
    while(i <= cycles && !isRepeat) {
      i ++;
      this.moveCycle(data);
      key = this.beamKey(data);
      if (!results[key]) {
        results[key] = i;
      }
      else {
//        console.log("key " + key + " repeats in " + results[key] + " and " + i);
        isRepeat = true;
      }
    }
    let newCycles = (cycles - results[key]) % (i - results[key]);
    for(let j = 0; j < newCycles; j ++) {
      this.moveCycle(data);
    }

    return this.northBeams(data);
  }

  this.beamKey = (data) => {
    return "$" + this.sumBeams(data, this.northBeamSumFunc) + "_" + this.eastBeams(data) + "_" + this.southBeams(data) + "_" + this.westBeams(data);
  }

  this.countNorth = (data) => {
    this.fall(data, this.pointNorth);
    return this.northBeams(data);
  }

  this.northBeamSumFunc = (data, i) => {
    return (data.length - i);
  }

  this.sumBeams = (data, func) => {
    let sum = 0;
    for(let i = 0; i < data.length; i ++) {
      for(let j = 0; j < data[i].length; j ++) {
        if (data[i][j] == 'O') {
          sum += func(data, i);
        }
      }
    }
    return sum;
  }

  this.northBeams = (data) => {
    let sum = 0;
    for(let i = 0; i < data.length; i ++) {
      for(let j = 0; j < data[i].length; j ++) {
        if (data[i][j] == 'O') {
          sum += (data.length - i);
        }
      }
    }
    return sum;
  }

  this.eastBeams = (data) => {
    let sum = 0;
    for(let i = 0; i < data.length; i ++) {
      for(let j = 0; j < data[i].length; j ++) {
        if (data[i][j] == 'O') {
          sum += (data[j].length - j);
        }
      }
    }
    return sum;
  }

  this.southBeams = (data) => {
    let sum = 0;
    for(let i = 0; i < data.length; i ++) {
      for(let j = 0; j < data[i].length; j ++) {
        if (data[i][j] == 'O') {
          sum += (i + 1);
        }
      }
    }
    return sum;
  }

  this.westBeams = (data) => {
    let sum = 0;
    for(let i = 0; i < data.length; i ++) {
      for(let j = 0; j < data[i].length; j ++) {
        if (data[i][j] == 'O') {
          sum += (j + 1);
        }
      }
    }
    return sum;
  }
}

export { parseInputData, ReflectorDish };