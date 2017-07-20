// Load Chance for generating pseudo random time
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

// Load AWS SDK
var fs = require("fs");

// import schema for generating random madlogs
var loggerGenerator = require('./schema.js');
var dream = loggerGenerator.dream;
var MessageBody = [];
var count = 0;

function sendGeneratedMessagesAtRandomIntervals(durationCoeff) {
    if(count<100) {
        durationCoeff = durationCoeff || 1;
        setTimeout(function () {
            MessageBody.push(dream
                .useSchema('MiningClocks')
                .generateRnd()
                .output());
            console.log("making"+count);
            count++;
            sendGeneratedMessagesAtRandomIntervals(durationCoeff);
        }, chance.millisecond() * durationCoeff);
    }
    else{
        console.log(MessageBody);
    }
}


sendGeneratedMessagesAtRandomIntervals();