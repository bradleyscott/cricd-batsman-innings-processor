var express = require('express');
var app = express();
var debug = require('debug')('batsman-innings');
var Promise = require('bluebird');
var eventStore = Promise.promisifyAll(require('./eventstore.js'));
var eventProcessors = require('./eventProcessors.js');
var _ = require('underscore');

app.get('/', function(req, res) {
    debug('Request received with query params %s', JSON.stringify(req.query));

    var match = req.query.match;
    var batsman = req.query.batsman;
    var innings = req.query.innings;

    if(!match) {
        var error = 'match must be included in request query params';
        debug(error);
        return res.status(400).send(error);
    }

    var getEvents;
    if(batsman) getEvents = eventStore.getBatsmanEventsAsync(batsman, match);
    else getEvents = eventStore.getMatchEventsAsync(match);

    getEvents.then(function(events){
        if(events.length == 0) {
            var message = 'No events for this batsman in this match';
            debug(message);
            return res.status(404).send(message);
        }

        var stats = {};
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

        if(innings && batsman) stats = stats[innings][batsman];
        else if(innings) stats = stats[innings];
        
        return res.send(stats);
    })
    .catch(function(error){
        debug(error);
        return res.status(500).send(error);
    });
});

app.listen(3000);
console.log('batsman-innings-processor listening on port 3000...');