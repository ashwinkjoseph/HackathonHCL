// Load Chance for generating pseudo random time
var Chance = require('chance');
// Instantiate Chance so it can be used
var chance = new Chance();

// Load AWS SDK
var fs = require("fs");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/HackerEarth");

var schema1 = new mongoose.Schema({
    CardNumber: String,
    Surname: String,
    Name: String,
    UserType: String,
    Liscense: String
});

var model1 = mongoose.model("liscense", schema1);

var schema2 = new mongoose.Schema({
    CardNumber: String,
    LayoutId: Number,
    TransitDate: String,
    TransitStatus: String,
    Surname: String,
    Name: String,
    Terminal: String,
    Direction: Number,
    STR_DIRECTION: String,
    UserType: String,
    Site: Number,
    InsertDate: String
});

var model2 = mongoose.model("miningclocks", schema2);

// import schema for generating random madlogs
var loggerGenerator = require('./schema2.js');
var dream = loggerGenerator.dream;
var MessageBodys = require("./messagebody.js");
var count = 0;

function sendGeneratedMessagesAtRandomInterval(durationCoeff) {
    if(count<5) {
        durationCoeff = durationCoeff || 1;
        setTimeout(function () {
                var obj = dream.useSchema('Identities')
                .generateRnd()
                .output()
            MessageBodys.push(obj);
            var doc = new model1(obj);
            doc.save(function(err){
                if(!err){
                    console.log("making"+count);
                    count++;
                    sendGeneratedMessagesAtRandomInterval(durationCoeff);
                }
            });            
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
                    var obj2 = dream
                        .useSchema('MiningClocks')
                        .generateRnd()
                        .output()
                    var doc2 = new model2(obj2);
                    doc2.save(function(err){
                        MessageBody.push(obj2);
                        console.log("making"+counts);
                        counts++;
                        sendGeneratedMessagesAtRandomIntervals(durationCoeff);
                    });                    
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