/**
 * --- Day 12: Hot Springs ---
 */

 function parseInputData(data, separator) {
  return data.map(line => {
    return {
      springs: line.trim().split(' ')[0],
      blocks: line.trim().split(' ')[1].split(',').map(b => parseInt(b))
    } 
  });
}

const HotSprings = function () {

  this.cache = new Map();

  this.getKey = (springs, block) => {
    return springs + "_" + block.join(',');
  }

  this.calculate = (springs, blocks) => {
    let key = this.getKey(springs, blocks);
    if (this.cache.has(key)) {
       return this.cache.get(key);
    }

    const val = this.getCount(springs, blocks);
   this.cache.set(key, val);

    return val;
  }

  this.getCount = (springs, blocks) => {
    while (blocks.length > 0) {
      while (springs.length > 0 && springs[0] == '.') {
        springs = springs.slice(1);
      }

      if (springs.length < blocks[0]) {
        return 0; 
      }

      if (springs[0] == '?') {
          return this.calculate(springs.slice(1), blocks) + this.calculate('#' + springs.slice(1), blocks);
      }

      if (springs.slice(0, blocks[0]).indexOf('.') > -1) {
        return 0;
      }

      if (blocks.length > 1) {
        if (springs.length < blocks[0] + 1 || springs[blocks[0]] == '#') {
            return 0; 
        }

        springs = springs.slice(blocks[0] + 1);
      }
      else {
        springs = springs.slice(blocks[0]);
      }

      blocks = blocks.slice(1);
    }

    return (springs.indexOf('#') > -1) ? 0 : 1;
  }

  this.unfold = (springs, blocks) => {
    springs = springs + '?' + springs + '?' + springs + '?' + springs + '?' + springs;
    blocks = [...blocks, ...blocks, ...blocks, ...blocks, ...blocks];

    return [springs, blocks];
  }

  this.calculateUnfolded = (springs, blocks) => {
    [springs, blocks] = this.unfold(springs, blocks);

    return this.calculate(springs, blocks);
  }

  this.countArrangements = (data, isUnfolded = false) => {
    return data.reduce((sum, row) => {
      return sum + ((isUnfolded) ? this.calculateUnfolded(row.springs, row.blocks) : this.calculate(row.springs, row.blocks));
    },0)
  }
}

export { parseInputData, HotSprings };