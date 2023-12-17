/**
 * --- Day 16: The Floor Will Be Lava ---
 */

function parseInputData(data, separator) {
  return data.map(line => line.split(''));
}

const LavaFloor = function () {

  this.Tiles = [];

  this.isPossible = (data, y, x) => {
    return y >= 0 && y < data.length && x >= 0 && x < data[y].length;
  }

  this.moveBeam = (data, beam) => {
    const dir = beam.dir;
    const y = beam.pos.y + beam.dir.y;
    const x = beam.pos.x + beam.dir.x;

    if (!this.isPossible(data, y, x)) {
      return [];
    }

    if (this.Tiles.filter(tile => tile.pos.y == y && tile.pos.x == x && tile.dir.y == dir.y && tile.dir.x == dir.x).length > 0) {
      return [];
    }

    this.Tiles.push({ pos: {y: y, x: x}, dir: {y: dir.y, x: dir.x }});

//    console.log("y: " + y + " x: " + x + " val: " + data[y][x]);
    let newBeams = [];
    switch (data[y][x]) {
      case '.':
        newBeams.push({pos: { y: y, x: x}, dir: { y: dir.y, x: dir.x}});
        break;
      case '/':
        if (dir.x == -1) { // from right to bottom
          newBeams.push({pos: { y: y, x: x}, dir: { y: 1, x: 0}});
        }
        else if (dir.x == 1) { // from left to top
          newBeams.push({pos: { y: y, x: x}, dir: { y: -1, x: 0}});
        }
        else if( dir.y == -1) { // from bottom to right
          newBeams.push({pos: { y: y, x: x}, dir: { y: 0, x: 1}});
        }
        else { // from top to left
          newBeams.push({pos: { y: y, x: x}, dir: { y: 0, x: -1}});
        }
        break;
      case '\\':
      case ']':
          if (dir.x == -1) { // from right to top
          newBeams.push({pos: { y: y, x: x}, dir: { y: -1, x: 0}});
        }
        else if (dir.x == 1) { // from left to bottom
          newBeams.push({pos: { y: y, x: x}, dir: { y: 1, x: 0}});
        }
        else if( dir.y == -1) { // from bottom to left
          newBeams.push({pos: { y: y, x: x}, dir: { y: 0, x: -1}});
        }
        else { // from top to right
          newBeams.push({pos: { y: y, x: x}, dir: { y: 0, x: 1}});
        }
        break;
      case '|':
        if (dir.x == 0) {
          newBeams.push({pos: { y: y, x: x}, dir: dir});
        }
        else {
          newBeams.push({pos: { y: y, x: x}, dir: {y: -1, x: 0}});
          newBeams.push({pos: { y: y, x: x}, dir: {y: 1, x: 0}});
        }
        break;
      case '-':
        if (dir.y == 0) {
          newBeams.push({pos: { y: y, x: x}, dir: dir});
        }
        else {
          newBeams.push({pos: { y: y, x: x}, dir: {y: 0, x: -1}});
          newBeams.push({pos: { y: y, x: x}, dir: {y: 0, x: 1}});
        }
        break;
      default:
        break;
    }

    return newBeams;
  }


  this.moveStep = (data, beams) => {
    let newBeams = [];
    for(let i = 0; i < beams.length; i ++) {
      newBeams = [...newBeams, ...this.moveBeam(data, beams[i])];
    }

    return newBeams;
  }

  this.getUniqueEnergyTiles = () => {
    return this.Tiles.reduce((tiles, tile) => {
      if (tiles.filter(t => t.y == tile.pos.y && t.x == tile.pos.x).length == 0) {
        tiles.push({y: tile.pos.y, x: tile.pos.x});
      }
      return tiles;
    }, [])
  }

  this.move = (data, initBeam, isDebug = false) => {
    let beams = [initBeam];

    let i = 0;
    while(beams.length > 0 && i < 20) {
      beams = this.moveStep(data, beams);
    }
    let uniqueTiles = this.getUniqueEnergyTiles();
    if (isDebug) {
      lavaFloor.fillEnergy(data, res);
    }

    this.Tiles = [];
    return uniqueTiles.length;
  }

  this.moveOne = (data) => {
    return this.move(data, { pos: { y: 0, x: -1}, dir: { y: 0, x: 1}});
  }

  this.getEntryPoints = (data) => {
    let entryPoints = [];
    for(let i = 0; i < data.length; i ++) {
      entryPoints.push({pos: { y: i, x: -1}, dir: { y: 0, x: 1 }})
      entryPoints.push({pos: { y: i, x: data[i].length}, dir: { y: 0, x: -1 }})
    }
    for(let j = 0; j < data[0].length; j ++) {
      entryPoints.push({pos: { y: -1, x: j}, dir: { y: 1, x: 0 }})
      entryPoints.push({pos: { y: data.length, x: j}, dir: { y: -1, x: 0 }})
    }
    return entryPoints;
  }

  this.getMaxEnergy = (data) => {
    const entryPoints = this.getEntryPoints(data);
    return entryPoints.reduce((max, point) => {
      let currentEnergy = this.move(data, point);
      return (currentEnergy > max) ? currentEnergy : max;
    }, 0)
  }

  this.fillEnergy = (data, tiles) => {
    let field = new Array(data.length).fill('').map((line, i) => new Array(data[i].length).fill('.'));
    tiles.forEach(tile => {
      field[tile.y][tile.x] = '#';
    })

    console.table(data);
    console.table(field);
  }
}

export { parseInputData, LavaFloor };