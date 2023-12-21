/**
 * --- Day 20: Pulse Propagation ---
 */

function parseInputData(data, separator) {
  let modules = data.reduce((modules, line) => {
    let rule = line.split('->').map(part => part.trim())
    let name = (rule[0][0] == '&' || rule[0][0] == '%') ? rule[0].slice(1).trim() : rule[0].trim();
    modules[name] = {
      name: name,
      type: (rule[0][0] == '&' || rule[0][0] == '%') ? rule[0][0] : '',
      state: 0,
      from: {},
      dest: rule[1].split(',').map(r => r.trim())
    }
    return modules;
  }, {});

  const keys = Object.keys(modules);
  for(let i = 0; i < keys.length; i ++) {
    for(let j = 0; j < modules[keys[i]].dest.length; j ++) {
      let dest = modules[keys[i]].dest[j];
      if (modules[dest] && modules[dest].type == '&') {
        modules[dest].from[keys[i]] = 0;
      }
    }
  }
  return modules;
}

const PulsePropagation = function () {

  this.flipFlop = (module, pulse, from) => {
    if (!pulse) {
      module.state = (module.state) ? 0 : 1;
      return { modules: module.dest, state: module.state, from: from }
    }
    return false;
  }

  this.conjunction = (module, pulse, from) => {
    module.from[from] = pulse;
    let keys = Object.keys(module.from);
    let allHigh = keys.filter(key => module.from[key] == 1).length == keys.length;
    return { modules: module.dest, state: allHigh ? 0 : 1, from: module.name };
  }

  this.pulseModule = (module, pulse, modules, queue, from = "") => {
    switch (module) {
      case 'button':
        queue.push({ modules: ['broadcaster'], state: 0, from: 'button' });
        break;
      case 'broadcaster':     
        queue.push({ modules: modules[module].dest, state: pulse, from: 'broadcaster' });
        break;
      default:
        if (modules[module]) {
          if (modules[module].type == '%') {
            let res = this.flipFlop(modules[module], pulse, module);
            if (res) {
              queue.push(res);
            }
          }
          else if (modules[module].type == '&') {
            queue.push(this.conjunction(modules[module], pulse, from));
          }  
        }
        break;
    }

    return queue;
  }

  this.pushButton = (modules) => {
    let queue = [];
    this.pulseModule('button', 0, modules, queue);
    let low = 0;
    let high = 0;
    while(queue.length > 0) {
      let stepModules = queue.slice(0, 1)[0];
      queue = queue.slice(1);
      if (stepModules.state == 0) {
        low += stepModules.modules.length;
      }
      else {
        high += stepModules.modules.length;
      }
      for(let i = 0; i < stepModules.modules.length; i ++) {
        let module = stepModules.modules[i];
        queue = this.pulseModule(module, stepModules.state, modules, queue, stepModules.from);
      }
    }
    return [low, high];
  }

  this.countPushes = (modules) => {
    // get rule which is parent to rx
    let parentModule = Object.keys(modules).filter(key => modules[key].dest.indexOf('rx') > -1)[0];
    // get all rules which leads to parent to rx so to count then number of pushes each of them require to come with 'off' 
    let seen = Object.keys(modules).filter(key => modules[key].dest.indexOf(parentModule) > -1).reduce((seen, name) => {
      seen[name] = 0;
      return seen;
    }, {});

    let pushes = 1;
    while(true) {
      let queue = [];
      this.pulseModule('button', 0, modules, queue);
      while(queue.length > 0) {
        let stepModules = queue.slice(0, 1)[0];
        queue = queue.slice(1);

        for(let i = 0; i < stepModules.modules.length; i ++) {
          let module = stepModules.modules[i];
          if (stepModules.state == 0 && Object.keys(seen).indexOf(module) > -1) {
            if (!seen[module]) {
              seen[module] = pushes;
            }
            else {
              // multiply all push button count to get number of push buttons to get rx 0
              return Object.keys(seen).reduce((mult, key) => mult * seen[key], 1);
            }
          }
          queue = this.pulseModule(module, stepModules.state, modules, queue, stepModules.from);
        }
      }
      pushes ++;
    }
  }

  this.run = (modules, count) => {
    let sumLow = 0;
    let sumHigh = 0;
    for(let i = 0; i < count; i ++) {
      let [low, high] = this.pushButton(modules);
      sumLow += low;
      sumHigh += high; 
    }
    return sumLow * sumHigh;
  }
}

export { parseInputData, PulsePropagation };