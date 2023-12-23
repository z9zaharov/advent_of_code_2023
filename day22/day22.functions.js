/**
 * --- Day 22: Sand Slabs ---
 */

function parseInputData(data, separator) {
  return data.map(line => {
    let coords = line.split('~');
    return {
      p1: { x: parseInt(coords[0].split(',')[0]), y: parseInt(coords[0].split(',')[1]), z: parseInt(coords[0].split(',')[2]) },
      p2: { x: parseInt(coords[1].split(',')[0]), y: parseInt(coords[1].split(',')[1]), z: parseInt(coords[1].split(',')[2]) }
    }
  });
}

const SandSlabs = function () {

  this.isOverlap = (a, b) => {
    return Math.max(a.p1.x, b.p1.x) <= Math.min(a.p2.x, b.p2.x) && Math.max(a.p1.y, b.p1.y) <= Math.min(a.p2.y, b.p2.y);
  }

  this.fallBricks = (bricks) => {
    bricks.sort((a, b) => a.p1.z - b.p1.z);

    for(let i = 0; i < bricks.length; i ++) {
      let maxZ = 1;

      for(let j = 0; j < i; j ++) {
        if (this.isOverlap(bricks[i], bricks[j])) {
          maxZ = Math.max(maxZ, bricks[j].p2.z + 1);
        }
        bricks[i].p2.z -= (bricks[i].p1.z - maxZ);
        bricks[i].p1.z = maxZ;
      }
    }
    return true;
  }

  this.getLinks = (bricks) => {
    let below = bricks.reduce((obj, b, i) => { obj[i] = []; return obj}, {});
    let above = bricks.reduce((obj, b, i) => { obj[i] = []; return obj}, {});

    for(let j = 0; j < bricks.length; j ++) {
      let upper = bricks[j];
      for(let i = 0; i < j; i ++) {
        let lower = bricks[i];
        if (this.isOverlap(lower, upper) && upper.p1.z == lower.p2.z + 1) {
          below[i].push(j);
          above[j].push(i);
        }
      }
    }
    return [below, above];
  }

  this.getSupporters = (bricks) => {
    this.fallBricks(bricks);
    let [below, above] = this.getLinks(bricks);

    let total = 0;
    for(let i = 0; i < bricks.length; i ++) {
      if(below[i].filter(b => above[b].length < 2).length == 0) {
        total ++;
      }
    }

    return total;
  }

  this.chainFall = (bricks) => {
    this.fallBricks(bricks);
    let [below, above] = this.getLinks(bricks);

    let total = 0;
    for(let i = 0; i < bricks.length; i ++) {

      // get all bricks which are supported by current
      let queue = below[i].reduce((queue, brick) => {
        if (above[brick].length == 1 && queue.indexOf(brick) == -1) {
          queue.push(brick);
        }
        return queue;
      }, []);

      let falling = [...queue];
      falling.push(i);

      while(queue.length > 0) {
        let j = queue[0];
        queue = queue.slice(1);

        below[j].forEach(brick => {
          if (falling.indexOf(brick) == -1) {
            // above bricks of current are all in falling list
            if (above[brick].filter(b => falling.indexOf(b) == -1).length == 0) {
              queue.push(brick);
              falling.push(brick);
            }
          }
        });
      }
      total += (falling.length) - 1
    }

    return total;
  }

}

export { parseInputData, SandSlabs };