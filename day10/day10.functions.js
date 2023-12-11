/**
 * --- Day 9: Mirage Maintenance ---
 */

 function parseInputData(data, separator) {
  return data.map(line => line.trim().split(''));
}

const PipeMaze = function () {

  this.Start = 'S';
  this.Types = ['|', '-', 'L', 'J', '7', 'F', '.', 'S'];

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

  this.getAvailableNextPos = (maze, pos) => {
    let res = [];
    if (pos.y > 0) {
      res.push({y: -1, x: 0});
    }
    if (pos.y < maze.length - 1) {
      res.push({y: 1, x: 0});
    }
    if (pos.x > 0) {
      res.push({y: 0, x: -1});
    }
    if (pos.x < maze[0].length - 1) {
      res.push({y: 0, x: 1});
    }

    return res;
  }

  this.getNextPos = (maze, pos) => {
    let positions = this.getAvailableNextPos(maze, pos);
    let pipe = maze[pos.y][pos.x];

    let newPositions = positions.filter(p => {
      // console.log("p: ");
      // console.log(p);
      let availablePipes = [...this.Allow[pipe]['y'][p.y], ...this.Allow[pipe]['x'][p.x]];
      // console.log('available: ')
      // console.log(availablePipes);
      let matchedPipes = availablePipes.filter(avPipe => maze[pos.y + p.y][pos.x + p.x] == avPipe);
      // console.log('current: ');
      // console.log(matchedPipes);
      return matchedPipes.length > 0;
    })
    return newPositions.map(newPos => { return {y: pos.y + newPos.y, x: pos.x + newPos.x}});
  }

  this.getStartPos = (maze) => {
    let pos = {y: -1, x: - 1};
    for(let i = 0; i < maze.length; i ++) {
      for(let j = 0; j < maze[i].length; j ++) {
        if (maze[i][j] == this.Start) {
          return {y: i, x: j }
        }
      }
    }
    return pos;
  }

  this.stepForward = (maze, pos, distance) => {
    let nextPos = this.getNextPos(maze, pos);
    if (nextPos.length == 1) {
      maze[pos.y][pos.x] = '*';
      return nextPos[0];
    }
    return '';
  }

  this.getDistance = (maze, isOne = false) => {
    let start = this.getStartPos(maze);

    let [nextPosLeft, nextPosRight] = this.getNextPos(maze, start);
    let distance = 0;
    maze[start.y][start.x] = 0;

    while(nextPosLeft && nextPosRight || isOne && (nextPosLeft || nextPosRight)) {
      if (nextPosLeft) {
        nextPosLeft = this.stepForward(maze, nextPosLeft, distance);
      }
      if (nextPosRight) {
        nextPosRight = this.stepForward(maze, nextPosRight, distance);
      }
      distance ++;
    }

    return distance;
  }

  this.getSubMaze = (maze, pos, size) => {
    let visibleField = new Array(size).fill('').map(line => new Array(size).fill(''));
    for(let i = 0; i < size; i ++) {
      for(let j = 0; j < size; j ++) {
        visibleField[i][j] = maze[pos.y + i][pos.x + j];
      }
    }
    return visibleField;
  }

}

export { parseInputData, PipeMaze };