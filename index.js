var express = require('express');
var app = express();
var debug = require('debug')('batsman-innings');
var eventStore = require('./eventstore.js');
var eventProcessors = require('./eventProcessors.js');
var _ = require('underscore');

app.get('/', function(req, res) {
    debug('Request received with query params %s', JSON.stringify(req.query));

    var match = req.query.match;
    var batsman = req.query.batsman;

    if(!match || !batsman) {
        var error = 'matchId and batsmanId must be included in request query params';
        debug(error);
        return res.status(400).send(error);
    }

    var events = eventStore.getEvents(batsman, match, function(error, events) {
        if(error) {
            debug(error);
            return res.status(500).send(error);
        }

        if(events.length == 0) {
            var message = 'No events for this batsman in this match';
            debug(message);
            return res.status(404).send(message);
        }

        var stats = {
            runs: 0,
            ballsFaced: 0,
            strikeRate: 0,
            scoring: {},
            dismissal: null,
            events: []
        };

        _(events).each(function(e) {
            debug('Invoking processor for: %s', e.eventType);

            try {
                var increment = eventProcessors[e.eventType](e);
                eventProcessors.incrementStats(stats, increment);
            } catch(error) {
                var message = 'Error trying to process events. ' + error;
                debug(message);
                return res.status(500).send(message);
            }
        });

        return res.send(stats);
    });
});

app.listen(3000);
console.log('batsman-innings-processor listening on port 3000...');