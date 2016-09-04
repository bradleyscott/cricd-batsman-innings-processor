var assert = require('assert');
var processor = require('../eventProcessors.js');
var should = require('should');

var getStats = function(){
    return {
            runs: 0,
            ballsFaced: 0,
            strikeRate: 0,
            scoring: {},
            dismissal: null,
            events: []
        };
};

describe('The batsmans score', function(){
    it('should not increase on a dot ball', function(){
        var stats = getStats();
        var increment = { runs: 0, event: { eventType: 'delivery' }};
        processor.incrementStats(stats, increment);
        stats.runs.should.equal(0);
    });

    it('should increase by 1 when a single is scored', function(){
        var stats = getStats();
        var increment = { runs: 1, event: { eventType: 'delivery' }};
        processor.incrementStats(stats, increment);
        stats.runs.should.equal(1);
    });
});

describe('The balls faced count', function(){
    it('should increment on a legal delivery', function(){
        var stats = getStats();
        var increment = { runs: 0, ballsFaced: 1, event: { eventType: 'delivery' }};
        processor.incrementStats(stats, increment);
        stats.ballsFaced.should.equal(1);
    });

    it('should not increment on a wide', function(){
        var stats = getStats();
        var increment = { runs: 0, ballsFaced: 0, event: { eventType: 'wide' }};
        processor.incrementStats(stats, increment);
        stats.ballsFaced.should.equal(0);
    });

    it('should increment on a no ball', function(){
        var stats = getStats();
        var increment = { runs: 0, ballsFaced: 1, event: { eventType: 'noBall' }};
        processor.incrementStats(stats, increment);
        stats.ballsFaced.should.equal(1);
    });
});

describe('The method of dismissal', function(){
    it('should be set when the batsman is dismissed', function(){
        var stats = getStats();
        var increment = { wicket: { eventType: 'bowled' }, event: { eventType: 'bowled' }};
        processor.incrementStats(stats, increment);
        stats.should.have.property('dismissal');
    });

    it('should not be set when the batsman is not dismissed', function(){
        var stats = getStats();
        var increment = { runs: 0, ballsFaced: 0, event: { eventType: 'wide' }};
        processor.incrementStats(stats, increment);
        should.not.exist(stats.dismissal);
    });
});

describe('The methods of scoring count', function(){
    it('should increment singles when there is a single', function(){
        var stats = getStats();
        var increment = { runs: 1, event: { eventType: 'delivery' }};
        processor.incrementStats(stats, increment);
        stats.scoring[1].should.equal(1);
    });

    it('should increment boundary four when there is a boundary', function(){
        var stats = getStats();
        var increment = { runs: 4, event: { eventType: 'delivery' }};
        processor.incrementStats(stats, increment);
        stats.scoring[4].should.equal(1);
    });
});