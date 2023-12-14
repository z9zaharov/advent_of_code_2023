/**
 * --- Day 13: Point of Incidence ---
 */

function parseInputData(data, separator) {
  return data.map(block => block.split(separator));
}

const Mirrors = function () {

  this.Orientation = {
    V: 0,
    H: 1
  }

  this.compareRows = (block, row1, row2) => {
    for(let i = 0; i < block[row1].length; i ++) {
      if (block[row1][i] != block[row2][i]){
        return false;
      }
    }
    return true;
  }

  this.compareCols = (block, col1, col2) => {
    for(let i = 0; i < block.length; i ++) {
      if (block[i][col1] != block[i][col2]){
        return false;
      }
    }
    return true;
  }

  this.furtherCompare = (block, edge1, edge2, bound1, bound2, compareFunc) => {
    while(edge1 >= bound1 && edge2 < bound2) {
      if (compareFunc(block, edge1, edge2)) {
        edge1 --;
        edge2 ++;
      }
      else {
        return false;
      }
    }
    return true;
  }

  this.findAllEdges = (block) => {
    let edges = [];
    for(let i = 1; i < block.length; i ++) {
      if (this.compareRows(block, i - 1, i)) {
        if (i - 1 == 0 
          || i == block.length - 1 
          || this.furtherCompare(block, i - 2, i + 1, 0, block.length, this.compareRows)) {
          edges.push({ orientation: this.Orientation.H, val: i})
        }
      }
    }
    for(let i = 1; i < block[0].length; i ++) {
      if (this.compareCols(block, i - 1, i)) {
        if (i - 1 == 0
          || i == block[0].length
          || this.furtherCompare(block, i - 2, i + 1, 0, block[0].length, this.compareCols)) {
          edges.push({ orientation: this.Orientation.V, val: i})
        }
      }
    }
    return edges;
  }

  this.findEdge = (block) => {
    return this.uniqueEdges(this.findAllEdges(block))[0];
  }

  this.smudgePos = (line, j) => {
    let val = (line[j] == '.') ? '#' : '.';
    return line.slice(0, j) + val + line.slice(j + 1);
  }

  this.findEdgeWithTheSmudge = (block) => {
    let original = this.findEdge(block);
    let edges = [];

    for(let i = 0; i < block.length; i ++) {
      for(let j = 0; j < block[i].length; j ++) {
        block[i] = this.smudgePos(block[i], j);
        let found = this.findAllEdges(block);
        block[i] = this.smudgePos(block[i], j);

        if (found.length > 0) {
          edges = [...edges, ...found];
        }
      }
    }
    let smudgeEdges = this.uniqueEdges(edges).filter(smudged => !(smudged.orientation == original.orientation && smudged.val == original.val));

    return smudgeEdges[0];
  }

  this.uniqueEdges = (edges) => {
    let unique = [];
    edges.forEach(edge => {
      if (unique.filter(e => e.orientation == edge.orientation && e.val == edge.val).length == 0) {
        unique.push(edge);
      }
    })
    return unique;
  }

  this.summarize = (data, isSmudged = false) => {
    return data.reduce((sum, block, i) => {
      let res = (isSmudged) ? this.findEdgeWithTheSmudge(block) : this.findEdge(block);
      return (res.orientation == this.Orientation.V) ? sum + res.val : sum + (res.val * 100);
    }, 0)
  }
}

export { parseInputData, Mirrors };