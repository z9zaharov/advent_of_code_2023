/**
 * --- Day 9: Mirage Maintenance ---
 */

 function parseInputData(data, separator) {
  return data.map(line => line.trim().split(''));
}

const CosmicExpansion = function () {

  this.Types = {
    Dot: '.',
    Galaxy: '#'
  }

  this.getEmpties = (data) => {
    let rows = [];
    for(let i = 0; i < data.length; i ++) {
      if (data[i].filter(p => p != this.Types.Dot).length == 0) {
        rows.push(i);
      }
    }
    let cols = [];
    for(let i = 0; i < data[0].length; i ++) {
      let countFilled = 0;
      for(let j = 0; j < data.length; j ++) {
        if (data[j][i] == this.Types.Galaxy) {
          countFilled ++;
        }
      }
      if (countFilled == 0) {
        cols.push(i);
      }
    }

    return { rows: rows, cols: cols };
  }

  this.getBetween = (val1, val2, empties) => {
    let [minVal, maxVal] = [val1, val2].sort((a, b) => a - b);
    return empties.filter(r => r > minVal && r < maxVal).length;
  }

  this.getPath = (galaxy1, galaxy2, empties, scale = 2) => {
    let betweenRows = this.getBetween(galaxy1.y, galaxy2.y, empties.rows);
    let betweenCols = this.getBetween(galaxy1.x, galaxy2.x, empties.cols);

    return Math.abs(galaxy1.y - galaxy2.y) + (betweenRows * scale - betweenRows) + Math.abs(galaxy1.x - galaxy2.x) + (betweenCols * scale - betweenCols);
  }

  this.getGalaxies = (data) => {
    let galaxies = [];
    for(let i = 0; i < data.length; i ++) {
      for(let j = 0; j < data[i].length; j ++) {
        if (data[i][j] == this.Types.Galaxy) {
          galaxies.push({y: i, x: j});
        }
      }
    }
    return galaxies;
  }

  this.getAllPathes = (data, scale) => {
    let empties = this.getEmpties(data);
    let galaxies = this.getGalaxies(data);

    let sum = 0;
    for(let i = 0; i < galaxies.length; i ++) {
      for(let j = 0; j < galaxies.length; j ++) {
        if (i != j) {
          sum += this.getPath(galaxies[i], galaxies[j], empties, scale);
        }
      }
    }

    return sum / 2;
  }
}

export { parseInputData, CosmicExpansion };