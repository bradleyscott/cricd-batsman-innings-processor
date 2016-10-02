var debug = require('debug')('batting-processor:eventProcessors');
var moment = require('moment');
var _ = require('underscore');
var exports = module.exports = {};

exports.calculateMinutes = function(stats) {
  debug('Calculating innings at crease for %s batsmen', stats.length);

  for(var i = 0; i < stats.length - 1; i++) {
    var end1 = moment(stats[i].events[0].timestamp);
    var end2 = moment(stats[i].events[stats[i].events.length - 1].timestamp);
    var difference = end1.diff(end2, 'minutes');
    stats[i].minutes = difference;
  }
};

var getBatsmansIndex = function(stats, batsman) {
  for(var i = 0; i < stats.length; i++)
    if(stats[i].batsman.id == batsman.id) return i;

  stats.push({
    batsman: batsman,
    runs: 0,
    scoring: {},
    ballsFaced: 0,
    events: []
  });
  return stats.length - 1;
};

exports.incrementStats = function(stats, increment) {
  debug('Incrementing stats using: %s', JSON.stringify(increment));

  var batsman = increment.event.batsman ? increment.event.batsman : increment.event.batsmen.striker;
  var index = getBatsmansIndex(stats, batsman);
  stats[index].runs += increment.runs;

  if(stats[index].runs && stats[index].scoring[increment.runs])
    stats[index].scoring[increment.runs]++;
  else if(stats[index].runs && !stats[index].scoring[increment.runs])
    stats[index].scoring[increment.runs] = 1;

  if(increment.dismissal) stats[index].dismissal = increment.dismissal;
  stats[index].ballsFaced += increment.ballsFaced;
  stats[index].strikeRate = (stats[index].runs / stats[index].ballsFaced) * 100;
  stats[index].events.push(increment.event);
};

exports.delivery = function(e) {
  debug('Processing delivery: %s', JSON.stringify(e));
  var increment = {};
  e.runs ? increment.runs = parseInt(e.runs) : increment.runs = 0;
  increment.ballsFaced = 1;
  increment.event = e;

  return increment;
};

exports.noBall = function(e) {
  debug('Processing noBall: %s', JSON.stringify(e));
  var increment = {};
  e.runs ? increment.runs = parseInt(e.runs) : increment.runs = 0;
  increment.ballsFaced = 1;
  increment.event = e;

  return increment;
};

exports.wide = function(e) {
  debug('Processing wide: %s', JSON.stringify(e));
  var increment = {};
  increment.runs = 0;
  increment.ballsFaced = 0;
  increment.event = e;

  return increment;
};

exports.bye = function(e) {
  debug('Processing bye: %s', JSON.stringify(e));
  var increment = {};
  increment.runs = 0;
  increment.ballsFaced = 1;
  increment.event = e;

  return increment;
};

exports.legBye = function(e) {
  debug('Processing legBye: %s', JSON.stringify(e));
  var increment = {};
  increment.runs = 0;
  increment.ballsFaced = 1;
  increment.event = e;

  return increment;
};

exports.bowled = function(e) {
  debug('Processing bowled: %s', JSON.stringify(e));
  var increment = {};
  increment.runs = 0;
  increment.ballsFaced = 1;
  increment.dismissal = e;
  increment.event = e;

  return increment;
};

exports.timedOut = function(e) {
  debug('Processing timedOut: %s', JSON.stringify(e));
  var increment = {};
  increment.runs = 0;
  increment.ballsFaced = 0;
  increment.dismissal = e;
  increment.event = e;

  return increment;
};

exports.caught = function(e) {
  debug('Processing caught: %s', JSON.stringify(e));
  var increment = {};
  increment.runs = 0;
  increment.ballsFaced = 1;
  increment.dismissal = e;
  increment.event = e;

  return increment;
};

exports.handledBall = function(e) {
  debug('Processing handledBall: %s', JSON.stringify(e));
  var increment = {};
  increment.runs = e.runs;
  increment.ballsFaced = 1;
  increment.dismissal = e;
  increment.event = e;

  return increment;
};

exports.doubleHit = function(e) {
  debug('Processing doubleHit: %s', JSON.stringify(e));
  var increment = {};
  increment.runs = 0;
  increment.ballsFaced = 1;
  increment.dismissal = e;
  increment.event = e;

  return increment;
};


exports.hitWicket = function(e) {
  debug('Processing hitWicket: %s', JSON.stringify(e));
  var increment = {};
  increment.runs = 0;
  increment.ballsFaced = 1;
  increment.dismissal = e;
  increment.event = e;

  return increment;
};

exports.lbw = function(e) {
  debug('Processing lbw: %s', JSON.stringify(e));
  var increment = {};
  increment.runs = 0;
  increment.ballsFaced = 1;
  increment.dismissal = e;
  increment.event = e;

  return increment;
};

exports.obstruction = function(e) {
  debug('Processing obstruction: %s', JSON.stringify(e));
  var increment = {};
  increment.runs = e.runs;

  if(e.batsman.id == e.batsmen.striker.id) {
    increment.ballsFaced = 1;
  }
  else increment.ballsFaced = 0;

  increment.dismissal = e;
  increment.event = e;

  return increment;
};

exports.runOut = function(e) {
  debug('Processing runOut: %s', JSON.stringify(e));
  var increment = {};

  if(e.batsmen.striker.id == e.batsman.id) {
    increment.runs = e.runs;
    increment.ballsFaced = 1;
  }
  else {
    increment.runs = 0;
    increment.ballsFaced = 0;
  }
  increment.dismissal = e;
  increment.event = e;

  return increment;
};

exports.stumped = function(e) {
  debug('Processing stumped: %s', JSON.stringify(e));
  var increment = {};
  increment.runs = 0;
  increment.ballsFaced = 1;
  increment.dismissal = e;
  increment.event = e;

  return increment;
};
