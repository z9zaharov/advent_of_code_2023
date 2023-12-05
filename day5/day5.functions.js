/**
 * --- Day 5: If You Give A Seed A Fertilizer ---
 */

 function parseInputData(data, separator) {

  let seeds = data[0].split(':')[1].trim().split(' ').map(seed => parseInt(seed));

  let blocks = data.slice(1);
  let maps = blocks.reduce((almanac, block) => {
    let lines = block.split(separator);
    let path = lines[0].split(' ')[0];

    let ranges = lines.slice(1).map((range) => {
      let values = range.split(' ').map(val => parseInt(val));
      return { dest: values[0], source: values[1], width: values[2]};
    });

    let cart = {
      to: path.split('-')[2],
      ranges: ranges        
    }

    return {...almanac, [path.split('-')[0]]: cart};

  }, {});

  return { seeds: seeds, maps: maps };
}

const SeedFertilizer = function () {

  this.transformStep = (from, val, maps) => {
    const ranges = maps[from].ranges;
    let to = maps[from].to;

    let toVal = val;
    ranges.forEach(range => {
      if (val >= range.source && val <= range.source + range.width - 1) {
        toVal = val - range.source + range.dest;
      }
    });

    return { to: to, val: toVal };
  }

  this.transform = (val, maps) => {
    let res = { to: 'seed', val: val };

    while(res.to != 'location') {
      res = this.transformStep(res.to, res.val, maps);
    }

    return res.val;
  }

  this.getLowestLocation = (data) => {
    let locations = data.seeds.map(seed => this.transform(seed, data.maps));
    return Math.min(...locations);
  }

  this.getRanges = (data) => {
    let ranges = {};
    for(let i = 0; i < data.seeds.length; i += 2) {
      const from = data.seeds[i];
      const to = data.seeds[i + 1] + data.seeds[i] - 1;
      ranges = {...ranges, [from]: to};
    }

    return ranges;
  }

  this.getLowestLocationOfRanges = (data) => {
    let minLocation = Number.MAX_VALUE;

    let ranges = this.getRanges(data);
//    console.log(ranges);

    for(let i = 0; i < data.seeds.length; i += 2) {
      const from = data.seeds[i];
      const to = data.seeds[i + 1] + data.seeds[i] - 1;
//      console.log("from: " + from + " to: " + to);
      for(let j = from; j <= to; j ++) {
        const current = this.transform(j, data.maps);
        if (current < minLocation) {
          minLocation = current;
        }
      }
    }
    return minLocation;
  }
}

export { parseInputData, SeedFertilizer };