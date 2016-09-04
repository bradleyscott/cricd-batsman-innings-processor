var assert = require('assert');
var processor = require('../eventProcessors.js');
var should = require('should');

describe('A dot ball', function() {
    var e = { runs: 0 };
    var increment = processor.delivery(e);

    it('should not increase the batsmans score', function() {
        increment.runs.should.equal(0);
    });

    it('should increment the number of balls faced', function() {
        increment.ballsFaced.should.equal(1);
    });
});

describe('A single', function() {
    var e = { runs: 1 };
    var increment = processor.delivery(e);

    it('should increase the batsmans score by 1', function() {
        increment.runs.should.equal(1);
    });

    it('should increment the number of balls faced', function() {
        increment.ballsFaced.should.equal(1);
    });
});

describe('A no ball', function() {
    describe('where no runs were taken', function(){
        var e = { runs: 0 };
        var increment = processor.noBall(e);

        it('should not increase the batsmans score', function() {
            increment.runs.should.equal(0);
        });

        it('should increment the number of balls faced', function() {
            increment.ballsFaced.should.equal(1);
        });
    });

    describe('where 1 run was taken', function(){
        var e = { runs: 1 };
        var increment = processor.noBall(e);

        it('should increase the batsmans score by 1', function() {
            increment.runs.should.equal(1);
        });

        it('should increment the number of balls faced', function() {
            increment.ballsFaced.should.equal(1);
        });
    });
});

describe('A wide', function() {
    describe('where no runs were taken', function(){
        var e = { runs: 0 };
        var increment = processor.wide(e);

        it('should not increase the batsmans score', function() {
            increment.runs.should.equal(0);
        });

        it('should not increment the number of balls faced', function() {
            increment.ballsFaced.should.equal(0);
        });
    });

    describe('where 1 run was taken', function(){
        var e = { runs: 1 };
        var increment = processor.wide(e);

        it('should not increase the batsmans score', function() {
            increment.runs.should.equal(0);
        });

        it('should not increment the number of balls faced', function() {
            increment.ballsFaced.should.equal(0);
        });
    });
});

describe('A bye', function() {
    var e = { runs: 1 };
    var increment = processor.bye(e);

    it('should not increase the batsmans score', function() {
        increment.runs.should.equal(0);
    });

    it('should increment the number of balls faced', function() {
        increment.ballsFaced.should.equal(1);
    });
});

describe('A leg bye', function() {
    var e = { runs: 1 };
    var increment = processor.legBye(e);

    it('should not increase the batsmans score', function() {
        increment.runs.should.equal(0);
    });

    it('should increment the number of balls faced', function() {
        increment.ballsFaced.should.equal(1);
    });
});

describe('Bowled', function() {
    var e = {};
    var increment = processor.bowled(e);

    it('should not increase the batsmans score', function() {
        increment.runs.should.equal(0);
    });

    it('should increment the number of balls faced', function() {
        increment.ballsFaced.should.equal(1);
    });

    it('should be recorded as the method of dismissal', function(){
        increment.should.have.property('dismissal');
    });
});

describe('Caught', function() {
    var e = {};
    var increment = processor.caught(e);

    it('should not increase the batsmans score', function() {
        increment.runs.should.equal(0);
    });

    it('should increment the number of balls faced', function() {
        increment.ballsFaced.should.equal(1);
    });

    it('should be recorded as the method of dismissal', function(){
        increment.should.have.property('dismissal');
    });
});

describe('Handled ball', function() {
    var e = { runs: 0 };
    var increment = processor.handledBall(e);

    it('should not increase the batsmans score', function() {
        increment.runs.should.equal(0);
    });

    it('should increment the number of balls faced', function() {
        increment.ballsFaced.should.equal(1);
    });

    it('should be recorded as the method of dismissal', function(){
        increment.should.have.property('dismissal');
    });
});

describe('Double hit', function() {
    var e = {};
    var increment = processor.doubleHit(e);

    it('should not increase the batsmans score', function() {
        increment.runs.should.equal(0);
    });

    it('should increment the number of balls faced', function() {
        increment.ballsFaced.should.equal(1);
    });

    it('should be recorded as the method of dismissal', function(){
        increment.should.have.property('dismissal');
    });
});

describe('Hit wicket', function() {
    var e = {};
    var increment = processor.hitWicket(e);

    it('should not increase the batsmans score', function() {
        increment.runs.should.equal(0);
    });

    it('should increment the number of balls faced', function() {
        increment.ballsFaced.should.equal(1);
    });

    it('should be recorded as the method of dismissal', function(){
        increment.should.have.property('dismissal');
    });
});

describe('LBW', function() {
    var e = {};
    var increment = processor.lbw(e);

    it('should not increase the batsmans score', function() {
        increment.runs.should.equal(0);
    });

    it('should increment the number of balls faced', function() {
        increment.ballsFaced.should.equal(1);
    });

    it('should be recorded as the method of dismissal', function(){
        increment.should.have.property('dismissal');
    });
});

describe('Obstruction', function() {
    describe('where the striker was dismissed', function(){
        
        describe('where no runs were taken', function(){
            var e = { runs: 0, batsman: { id: 1 }, batsmen: { striker: { id: 1 }} };
            var increment = processor.obstruction(e);

            it('should not increase the batsmans score', function() {
                increment.runs.should.equal(0);
            });

            it('should increment the number of balls faced', function() {
                increment.ballsFaced.should.equal(1);
            });

            it('should be recorded as the method of dismissal', function(){
                increment.should.have.property('dismissal');
            });
        });

        describe('where 1 run was taken', function(){
            var e = { runs: 1, batsman: { id: 1 }, batsmen: { striker: { id: 1 }} };
            var increment = processor.obstruction(e);

            it('should increase the batsmans score by 1', function() {
                increment.runs.should.equal(1);
            });

            it('should increment the number of balls faced', function() {
                increment.ballsFaced.should.equal(1);
            });

            it('should be recorded as the method of dismissal', function(){
                increment.should.have.property('dismissal');
            });
        });
    });

    describe('where the striker was not dismissed', function(){
        var e = { runs: 0, batsman: { id: 1 }, batsmen: { striker: { id: 2 }} };
        var increment = processor.obstruction(e);

        it('should not increase the batsmans score', function() {
            increment.runs.should.equal(0);
        });

        it('should not increment the number of balls faced', function() {
            increment.ballsFaced.should.equal(0);
        });

        it('should be recorded as the method of dismissal', function(){
            increment.should.have.property('dismissal');
        });
    });
});

describe('A run out', function() {
    describe('where the striker was dismissed', function(){
        
        describe('where no runs were taken', function(){
            var e = { runs: 0, batsman: { id: 1 }, batsmen: { striker: { id: 1 }} };
            var increment = processor.runOut(e);

            it('should not increase the batsmans score', function() {
                increment.runs.should.equal(0);
            });

            it('should increment the number of balls faced', function() {
                increment.ballsFaced.should.equal(1);
            });

            it('should be recorded as the method of dismissal', function(){
                increment.should.have.property('dismissal');
            });
        });

        describe('where 1 run was taken', function(){
            var e = { runs: 1, batsman: { id: 1 }, batsmen: { striker: { id: 1 }} };
            var increment = processor.runOut(e);

            it('should increase the batsmans score by 1', function() {
                increment.runs.should.equal(1);
            });

            it('should increment the number of balls faced', function() {
                increment.ballsFaced.should.equal(1);
            });

            it('should be recorded as the method of dismissal', function(){
                increment.should.have.property('dismissal');
            });
        });
    });

    describe('where the striker was not dismissed', function(){
        var e = { runs: 0, batsman: { id: 1 }, batsmen: { striker: { id: 2 }} };
        var increment = processor.runOut(e);

        it('should not increase the batsmans score', function() {
            increment.runs.should.equal(0);
        });

        it('should not increment the number of balls faced', function() {
            increment.ballsFaced.should.equal(0);
        });

        it('should be recorded as the method of dismissal', function(){
            increment.should.have.property('dismissal');
        });
    });
});

describe('Stumped', function() {
    var e = {};
    var increment = processor.stumped(e);

    it('should not increase the batsmans score', function() {
        increment.runs.should.equal(0);
    });

    it('should increment the number of balls faced', function() {
        increment.ballsFaced.should.equal(1);
    });

    it('should be recorded as the method of dismissal', function(){
        increment.should.have.property('dismissal');
    });
});
