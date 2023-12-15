/**
 * --- Day 14: Parabolic Reflector Dish ---
 */

function parseInputData(data, separator) {
  return data.map(line => line.split(''));
}

const ReflectorDish = function () {

  this.pointNorth = (data, y, x) => {
    if (y > 0 && data[y - 1][x] == '.') {
      data[y - 1][x] = 'O';
      return 1;
    }
    return 0;
  }

  this.pointWest = (data, y, x) => {
    if(x > 0 && data[y][x - 1] == '.') {
      data[y][x - 1] = 'O';
      return 1;
    }
    return 0;
  }

  this.pointSouth = (data, y, x) => {
    if(y < data.length - 1 && data[y + 1][x] == '.') {
      data[y + 1][x] = 'O';
      return 1;
    }
    return 0;
  }

  this.pointEast = (data, y, x) => {
    if(x < data[y].length - 1 && data[y][x + 1] == '.') {
      data[y][x + 1] = 'O';
      return 1;
    }
    return 0;
  }

  this.fallStep = (data, pointStep) => {
    let falls = 0;
    for(let i = 0; i < data.length; i ++) {
      for(let j = 0; j < data[i].length; j ++) {
        if (data[i][j] == 'O' && pointStep(data, i, j)) {
          data[i][j] = '.';
          falls ++;
        }
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
    [ this.pointNorth, 
      this.pointWest, 
      this.pointSouth, 
      this.pointEast
    ].forEach(func => this.fall(data, func));
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

    return this.sumBeams(data, this.northBeamSumFunc);
  }

  this.beamKey = (data) => {
    let funcs = [this.northBeamSumFunc, this.southBeamsSumFunc, this.westBeamsSumFunc, this.eastBeamsSumFunc];
    return "$" + funcs.map(func => this.sumBeams(data, func)).join("_");
  }

  this.countNorth = (data) => {
    this.fall(data, this.pointNorth);
    return this.sumBeams(data, this.northBeamSumFunc);
  }

  this.sumBeams = (data, func) => {
    let sum = 0;
    for(let i = 0; i < data.length; i ++) {
      for(let j = 0; j < data[i].length; j ++) {
        if (data[i][j] == 'O') {
          sum += func(data, i, j);
        }
      }
    }
    return sum;
  }

  this.northBeamSumFunc = (data, i, j) => data.length - i;
  this.eastBeamsSumFunc = (data, i, j) => data[j].length - j;
  this.southBeamsSumFunc = (data, i, j) => i + 1;
  this.westBeamsSumFunc = (data, i, j) => j + 1;
}

export { parseInputData, ReflectorDish };