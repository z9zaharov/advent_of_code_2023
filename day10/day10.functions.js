/**
 * --- Day 10: Pipe Maze ---
 */

 function parseInputData(data, separator) {
  return data.map(line => line.trim().split(''));
}

const PipeMaze = function () {

  this.Allow = {
    '|': {
          y: {
            [-1]: ['|', 'F', '7'],
            [1]: ['|', 'L', 'J'],
            [0]: []
          },
          x: { [-1]: [], [1]: [], [0]: [] }
      },
    '-': {
          y: { [-1]: [], [1]: [], [0]: [] },
          x: {
            [-1]: ['-', 'F', 'L'],
            [1]: ['-', '7', 'J'],
            [0]: []
          }
      },
    'L': {
        y: {
          [-1]: ['|', 'F', '7'],
          [1]: [],
          [0]: []
        },
        x: {
          [-1]: [],
          [1]: ['-', '7', 'J'],
          [0]: []
        }
      },
    'J': {
        y: {
          [-1]: ['|', 'F', '7',],
          [1]: [],
          [0]: []
        },
        x: {
          [-1]: ['F', '-', 'L'],
          [1]: [],
          [0]: []
        }
      },
    '7': {
          y: {
            [-1]: [],
            [1]: [ '|', 'L', 'J'],
            [0]: []
          },
          x: {
            [-1]: ['-', 'L', 'F'],
            [1]: [],
            [0]: []
          }
      },
    'F': {
          y: {
            [-1]: [],
            [1]: ['|', 'J', 'L'],
            [0]: []
          },
          x: {
            [-1]: [],
            [1]: ['-', '7', 'J'],
            [0]: []
          }
      },
    '.': {
        y: { [-1]: [], [1]: [], [0]: [] },
        x: { [-1]: [], [1]: [], [0]: [] }
      },
    'S': {
          y: {
            [-1]: ['|', 'F', '7'],
            [1]: ['|', 'L', 'J'],
            [0]: []
          },
          x: {
            [-1]: ['-', 'F', 'L'],
            [1]: ['-', '7', 'J'],
            [0]: []
          }
      }
  }

  this.S = {
    'J': {
        d1: { dy: -1, dx: 0},
        d2: { dy: 0, dx: -1}
    },
    'L': {
      d1: { dy: -1, dx: 0},
      d2: { dy: 0, dx: 1}
    },
    '-': {
      d1: { dy: 0, dx: -1},
      d2: { dy: 0, dx: 1}
    },
    '|': {
      d1: { dy: -1, dx: 0},
      d2: { dy: 1, dx: 0}
    },
    'F': {
      d1: { dy: 0, dx: 1},
      d2: { dy: 1, dx: 0}
    },
    '7': {
      d1: { dy: 0, dx: -1},
      d2: { dy: 1, dx: 0}
    }
  }

  this.getAvailMoves = (maze, pos) => {
    let offsets = [];
    let vectors = [];
    let dirs = [];

    if (pos.y > 0) {
      offsets.push({y: -1, x: 0});
      vectors.push({ y: 0, x: pos.x });
      dirs.push('up');
    }
    if (pos.y < maze.length - 1) {
      offsets.push({y: 1, x: 0 });
      vectors.push({ y: maze.length - 1, x: pos.x });
      dirs.push('down');
    }
    if (pos.x > 0) {
      offsets.push({y: 0, x: -1 });
      vectors.push({ y: pos.y, x: 0 });
      dirs.push('left');
    }
    if (pos.x < maze[0].length - 1) {
      offsets.push({y: 0, x: 1 });
      vectors.push({ y: pos.y, x: maze[pos.y].length - 1 });
      dirs.push('right');
    }

    return [offsets, vectors, dirs];
  }

  this.getNextPos = (maze, visited, poses) => {
    let res = [];
    poses.forEach(pos =>  {
      let positions = this.getAvailMoves(maze, pos)[0]
              .filter(p => !visited[pos.y + p.y][pos.x + p.x]);
      let pipe = maze[pos.y][pos.x];

      let newPositions = positions.filter(p => {
        let pipesAvalilable = [...this.Allow[pipe]['y'][p.y], ...this.Allow[pipe]['x'][p.x]];
        let pipesMatched = pipesAvalilable.filter(avPipe => maze[pos.y + p.y][pos.x + p.x] == avPipe)
        return pipesMatched.length > 0;
      })
      res = [...res, ...newPositions.map(newPos => { return {y: pos.y + newPos.y, x: pos.x + newPos.x}})];
    });
    return res;
  }

  this.getStartPos = (maze) => {
    let pos = {y: -1, x: -1};

    for(let i = 0; i < maze.length; i ++) {
      for(let j = 0; j < maze[i].length; j ++) {
        if (maze[i][j] == 'S') {
          return {y: i, x: j }
        }
      }
    }
    return pos;
  }

  this.getStartMeaning = (start, nextPoses) => {
    if (nextPoses.length != 2) {
      return 'S';
    }
    let d1 = { dy: nextPoses[0].y - start.y, dx: nextPoses[0].x - start.x};
    let d2 = { dy: nextPoses[1].y - start.y, dx: nextPoses[1].x - start.x};

    return Object.keys(this.S).filter(key => {
      let val = this.S[key];
      return val.d1.dy == d1.dy && val.d1.dx == d1.dx && val.d2.dy == d2.dy && val.d2.dx == d2.dx
            || val.d1.dy == d2.dy && val.d1.dx == d2.dx && val.d2.dy == d1.dy && val.d1.dx == d2.dx
    })[0];
  }

  this.getDistance = (maze) => {
    let visited = new Array(maze.length).fill('').map(line => new Array(line.length).fill('').map(val => false));

    let startPos = this.getStartPos(maze);
    visited[startPos.y][startPos.x] = true;

    let poses = this.getNextPos(maze, visited, [startPos]);
    poses.forEach(pos => {
      visited[pos.y][pos.x] = true;
    })
    let start = {...startPos, val: this.getStartMeaning(startPos, poses)};

    let distance = 0;
    while(poses.length > 0) {
      poses = this.getNextPos(maze, visited, poses);
      poses.forEach(pos => {
        visited[pos.y][pos.x] = true;
      })
      distance ++;
    }

    return [distance, visited, start];
  }

  this.isEnclosed = (maze, visited, pos, start, isLog = false) => {
    let [offsets, vectors, dirs] = this.getAvailMoves(maze, pos);
    for(let i = 0; i < offsets.length; i ++) {
      if (this.checkDir(maze, visited, start, { y: pos.y + offsets[i].y, x: pos.x + offsets[i].x }, vectors[i], offsets[i], dirs[i], isLog)) {
        return true;
      }
    }
    return false;
  }

  this.checkDir = (maze, visited, start, from, to, offset, check = '', isLog = false) => {
    let log = [];
    let count = 0;
    let isStart = false;
    let turn = '';
    let isCross = false;

    let i = from.y; 
    let j = from.x;

    let signY = (offset.y >= 0) ? 1: -1;
    let signX = (offset.x >= 0) ? 1: -1;

    const isInBoundaries = (maze, y, x) => y >= 0 && x >= 0 && y < maze.length && x < maze[y].length;

    while (isInBoundaries(maze, i, j) && i * signY <= to.y * signY && j * signX <= to.x * signX) {
      let val = (i == start.y && j == start.x) ? start.val : maze[i][j];
      if (visited[i][j]) {
        [turn, isStart, isCross] = this.trace(val, isStart, turn, offset);
        if (isCross) {
          count ++;
        }
        if (isLog) {
          log.push("y: " + i + " x: " + j + " val: " + val + " isStart: " + isStart + " turn: " + turn + " count: " + count);
        }
      }
      i += offset.y;
      j += offset.x;
    }
    if (count % 2 == 1) { 
      if (isLog) {
        console.log('enclosed by ' + check + ' check')
        console.log(log);
        console.log(count);
      }
      return true;
    }
    return false;
  }

  this.trace = (val, isStart, turn, offset) => {
    let turns = {
      'F': [
        ['', '', ''],
        ['', '', 'J'],
        ['', 'J', ''],
      ],
      'J': [
        ['', 'F', ''],
        ['F', '', ''],
        ['', '', ''],
      ],
      '7': [
        ['', '', ''],
        ['L', '', ''],
        ['', 'L', ''],
      ],
      'L': [
        ['', '7', ''],
        ['', '', '7'],
        ['', '', ''],
      ],
    }

    let bar = (offset.y != 0) ? '-' : '|';
    let isCross = false;

    if (val == bar) {
      isStart = false;
      isCross = true;
    }
    else if (!isStart && Object.keys(turns).includes(val)) {
      turn = val;
      isStart = true;
    }
    else if (isStart) {
      if (turns[turn][offset.y + 1][offset.x + 1] == val) {
        isCross = true;
        isStart = false;
        turn = '';
      }
      else if (Object.keys(turns).includes(val))  {
        turn = val;
        isStart = true;
      }
    }
    else {
      turn = '';
      isStart = false;
    }

    return [turn, isStart, isCross];
  }

  this.countEnclosed = (maze) => {
    let [distance, visited, start] = this.getDistance(maze);
    let count = 0;
    for(let i = 0; i < maze.length; i ++) {
      for(let j = 0; j < maze[i].length; j ++) {
        if (!visited[i][j] && this.isEnclosed(maze, visited, { y: i, x: j}, start)) {
          count ++;
        }
      }
    }
    return count;
  }

  this.getSubMaze = (maze, visited, pos, size) => {
    let visibleField = new Array(size).fill('').map(line => new Array(size).fill(''));
    for(let i = 0; i < Math.min(size, maze.length - pos.y); i ++) {
      for(let j = 0; j < Math.min(size, maze[i].length - pos.x); j ++) {
        visibleField[i][j] = (visited[i][j]) ? maze[pos.y + i][pos.x + j] + '*' : maze[pos.y + i][pos.x + j];
      }
    }
    return visibleField;
  }
}

export { parseInputData, PipeMaze };