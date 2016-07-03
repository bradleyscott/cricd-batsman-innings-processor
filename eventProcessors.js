var debug = require('debug')('batsman-innings-processor-eventProcessors');
var _ = require('underscore');
var exports = module.exports = {};

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
