/**
 * --- Day 6: Wait For It ---
 */

 function parseInputData(data, separator) {

    return {
      times: data[0].split(':')[1].trim().split(/\s+/).map(t => parseInt(t)),
      distances: data[1].split(':')[1].trim().split(/\s+/).map(d => parseInt(d))
    }
}

const WaitAndRun = function () {

  this.calcDistance = (speed, time) => {
    return speed * (time - speed);
  }

  this.getDistances = (time) => {
    let records = [];
    for(let speed = 0; speed <= time; speed ++) {
      records.push(this.calcDistance(speed, time));
    }
    return records;
  }

  this.getRecords = (time, distance) => {
    return this.getDistances(time).filter(r => r > distance).length;
  }

  this.beatRecordRatio = (data) => {
    let res = 1;
    for(let i = 0; i < data.times.length; i ++) {
      let recordWays = this.getRecords(data.times[i], data.distances[i]);
      res = res * recordWays;
    }
    return res;
  }

  this.mergeData = (data) => {
    let res = {time: '', distance: ''};
    for(let i = 0; i < data.times.length; i ++) {
      res.time += ('' + data.times[i]);
      res.distance += ('' + data.distances[i]);
    }
    res.time = parseInt(res.time);
    res.distance = parseInt(res.distance);

    return res;
  }

  this.getLongRecord = (data) => {
    let singeData = this.mergeData(data);
    return this.getRecords(singeData.time, singeData.distance);
  }
}

export { parseInputData, WaitAndRun };