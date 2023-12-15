/**
 * --- Day 15: Lens Library ---
 */

function parseInputData(data, separator) {
  let regex = /[\-\=]/;
  return data[0].split(',').map(cmd => {
    let parsed = cmd.split(regex);
    return {
      label: parsed[0],
      op: (cmd.indexOf('=') > -1) ? '=' : '-',
      val: (parsed[1].length > 0) ? parseInt(parsed[1]) : 0,
      str: cmd
    }
  });
}

const LensLibrary = function () {

  this.Boxes = new Array(256).fill().map(u => ({}));

  this.hash = (initial, c) => {
    return ((initial + c.charCodeAt(0)) * 17) % 256;
  }

  this.hashString = (str) => {
    let sum = 0;
    for(let i = 0; i < str.length; i ++) {
      sum = this.hash(sum, str[i]);
    }
    return sum;
  }

  this.hashSum = (data) => {
    return data.reduce((sum, cmd) => sum + this.hashString(cmd.str), 0);
  }

  this.operate = (cmd) => {
    let box = this.hashString(cmd.label);
    switch(cmd.op) {
      case '-':
        if (cmd.label in this.Boxes[box]) {
            delete this.Boxes[box][cmd.label];
        }
        break;
      case '=':
        this.Boxes[box][cmd.label] = cmd.val;
        break;
      default:
    }
  }

  this.operateAll = (data) => {
    data.forEach(cmd => this.operate(cmd));
  }

  this.focusPowerOfBox = (box, id) => {
    return Object.keys(box).reduce((sum, len, i) => sum + (id + 1) * (i + 1) * box[len], 0);
  }

  this.focusPower = (data) => {
    this.operateAll(data);
    return this.Boxes.reduce((sum, box, i) => sum + this.focusPowerOfBox(box, i), 0);
  }
}

export { parseInputData, LensLibrary };