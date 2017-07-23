var moment = require("moment");
var mongoose = require("mongoose");
var async = require("async");

mongoose.connect("mongodb://localhost:27017/HackerEarth");

// var express = require("express");

// var app = express();

// app.set("view engine", "ejs");

// app.get("/", function(req, res){
//     res.render("./views/home");
// })

// app.listen(3000, function(){
//     console.log("App listening on port: "+3000);
// });

var clockingSchema = new mongoose.Schema({
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

var clockingModel = mongoose.model("miningclocks", clockingSchema);

var liscenseSchema = new mongoose.Schema({
    CardNumber: String,
    Surname: String,
    Name: String,
    UserType: String,
    Liscense: String,
});

var liscenseModel = mongoose.model("liscense", liscenseSchema);

var filteredSchema = new mongoose.Schema({
    CardNumber: String,
    TimeTaken: Number,
    Liscense: String
});

var filteredModel = mongoose.model("filtered", filteredSchema);

// o = {};
// var mapFuntion = function(){
//     console.log("mappping");
//     // var key = this.CardNumber;
//     var key = "36482";
//     // var time = new Date();
//     console.log("map, key: "+key);
//     // var time = this.InsertDate;
//     // console.log("map, time: "+time);
//     // var value = {
//         // time : time,
//         // direction : this.Direction 
//     // }
//     emit(key, 1);
// }
// var reduceFunction = function(key, values){
//     var returnObject = {
//         CardNumber : key,
//         timeTaken : 0
//     };
//     // returnObject.timeTaken += values;
//     // values.forEach(function(value){
//     //     // if(value.direction.equals("1")){
//     //         returnObject.timeTaken += value.time;
//     //     // }
//     // });
//     console.log("KEY: "+key);
//     console.log(values);
//     return returnObject;
// };

// var finalizeFunction = function(key, reducedValue){
//     var returnObject = {
//         Liscense : x.Liscense,
//         time : reducedValue.timeTaken,
//         CardNumber:reducedValue.CardNumber
//     };
//     return returnObject;
// }

// liscenseModel.find({UserType:"employee"}).exec(function(err, result){
    // result.forEach(function(x){
        // console.log("hey");
        // clockingModel.mapReduce(
        //     mapFuntion, 
        //     reduceFunction, 
        //     {
        //         out: "filtered",
        //         finalize: finalizeFunction
        //     });
    // });
// });

var o = {};
o.map = function () {
    var key = this.CardNumber;
    var time = new Date(this.InsertDate).getTime();
    var value = {
        CardNumber : key,
        timeTaken : time,
        direction : this.Direction,
        count : 0
    }
    emit(key, value);
}
o.reduce = function (key, values) {
    var returnObject = {
        CardNumber : key,
        timeTaken : 0,
        direction: -1,
        count : 0
    };
    values.forEach(function(value){
        if(value.direction==1){
            returnObject.timeTaken += value.timeTaken;
        }
        else if(value.direction==0){
            returnObject.timeTaken -= value.timeTaken;
        }
        else{
            returnObject.timeTaken = value.timeTaken;
        }
        returnObject.count++;
    });
    return returnObject;
}
clockingModel.mapReduce(o, function (err, results) {
// if(err) throw err;
    results.forEach(function(x){
        liscenseModel.findOne({CardNumber: x.value.CardNumber}).exec(function(err, result){
            // x.value.Liscense = result.Liscense;
            // console.log(x.value);
            var modelt = {
                CardNumber : x.value.CardNumber,
                TimeTaken : x.value.timeTaken,
                Liscense : result.Liscense
            };
            filteredModel.create(modelt, function(err){
                if(!err){
                    console.log("Success");
                }
            })
        });
        // console.log(x.value);
    });
});
