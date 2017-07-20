var fs = require('fs');
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/testing');

var db = mongoose.connection;

db.on("error", function() {
    throw new Error('unable to connect to database at ' + 'mongodb://127.0.0.1/HackerEarth');
});

var sampleModel = new mongoose.Schema({
    text: String
});

var model = mongoose.model("sample", sampleModel);

var Model = new model({
    text: "hey"
});

Model.save(function(err) {
    if (err) {
        console.log("not done");
    } else {
        console.log("done");
    }
});


// fs.readFile('./leave.csv', function(err, data) {
//     if (err) throw err;

//     data.toString().split("/n").every(function(x) {
//         console.log(x);
//         console.log("\n\n");
//         return false;
//     });
//     // data = data + '';

//     // data = data.split('\n');

//     // for (var i = 0; i < data.length; i += 1) {
//     //     var row = data[i].split(',');

//     //     console.log(row);

//     // }
// });

// var fast_csv = require('fast-csv');
// var tempArray = new Array();
// console.log("START");
// fast_csv.fromPath("leave.csv").on("data", function(data) {
//     data.every(function(element) {
//         console.log(element);
//     }, this);
// });
// .on("end", function() {
//     tempArray.sort();
//     console.log(tempArray);

//     fast_csv.writeToPath("outputfile.csv", tempArray)
//         .on("finish", function() {
//             console.log("END");
//         });

// });