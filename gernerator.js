// Load Chance for generating pseudo random time
var Chance = require('chance');
// Instantiate Chance so it can be used
var chance = new Chance();

// Load AWS SDK
var fs = require("fs");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/HackerEarth");
// import schema for generating random madlogs
var loggerGenerator = require('./schema2.js');
var dream = loggerGenerator.dream;
var MessageBodys = require("./messagebody.js");
var count = 0;

function sendGeneratedMessagesAtRandomInterval(durationCoeff) {
    if(count<5) {
        durationCoeff = durationCoeff || 1;
        setTimeout(function () {
            MessageBodys.push(dream
                .useSchema('Identities')
                .generateRnd()
                .output());
            console.log("making"+count);
            count++;
            sendGeneratedMessagesAtRandomInterval(durationCoeff);
        }, chance.millisecond() * durationCoeff);
    }
    else{
        console.log(MessageBodys);
        var loggerGenerators = require('./schema.js');
        var dreams = loggerGenerators.dream;
        var MessageBody = [];
        var counts = 0;

        function sendGeneratedMessagesAtRandomIntervals(durationCoeff) {
            if(counts<5) {
                durationCoeff = durationCoeff || 1;
                setTimeout(function () {
                    MessageBody.push(dream
                        .useSchema('MiningClocks')
                        .generateRnd()
                        .output());
                    console.log("making"+counts);
                    counts++;
                    sendGeneratedMessagesAtRandomIntervals(durationCoeff);
                }, chance.millisecond() * durationCoeff);
            }
            else{
                console.log(MessageBody);
            }
        }

        sendGeneratedMessagesAtRandomIntervals();
    }
}

sendGeneratedMessagesAtRandomInterval();