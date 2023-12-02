/**
 * --- Day 2: Cube Conundrum ---
 */

 function parseInputData(data) {
  return data.map(line => {
    let gameLine = line.trim().split(':');
    return {
      game: parseInt(gameLine[0].split(' ')[1]),
      sets: gameLine[1].split(';').map(colorsSet => {
        return colorsSet.trim().split(',').reduce((subset, color) => {
          return {...subset, [color.trim().split(' ')[1]] :  parseInt(color.trim().split(' ')[0])}
        }, {})
      })
    }
  });
}

const CubeConundrum = function () {

  this.Target = { red: 12, green: 13, blue: 14};

  this.countGames = (games) => {
    return this.findMatches(games, this.Target).reduce((sum, game) => sum + game.game, 0); 
  }

  this.findMatches = (games, target) => {
    return games.filter(game => {
      let result = 0;
      game.sets.forEach(subset => {
        if (this.isPossibleSet(subset, target)) {
          result ++;
        }
      })
      return game.sets.length == result;
    })
  }

  this.isPossibleSet = (subset, target) => {
    let result = 0;
    Object.keys(target).forEach(key => {
      if (!subset[key] || subset[key] <= target[key]) {
        result ++;
      }
    })
    return Object.keys(target).length == result;
  }

  this.getCubePower = (game) => {
    let result = { red: 0, green: 0, blue: 0 };
    game.sets.forEach(subset => {
      Object.keys(subset).forEach(key => {
        if (subset[key] > result[key]) {
          result[key] = subset[key];
        }
      })
    })
    return result.red * result.green * result.blue;
  }

  this.getSumOfPowers = (games) => {
    return games.reduce((sum, game) => sum + this.getCubePower(game), 0);
  }
}

export { parseInputData, CubeConundrum };