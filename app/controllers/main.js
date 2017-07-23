var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');
var liscenceModel = mongoose.model("liscense");
var filteredmodel = mongoose.model("filtered");
var moment = require("moment");
var teams = require("../datasets/teams");
var averageQue = require("../datasets/averageQue");
var worstQue = require("../datasets/worstQue");
var Sync = require("sync");
var threshholds = {
    "Load Haul Dumper" : {
        best : 54139811210,
        average : 108279622420
    },
    "Roofbolter" : {
        best : 304648193759,
        average : 609296387517
    },
    "Continous Miner":{
        best : 1944,
        average: 3988
    },
    "Shuttle Car":{
        best:45732223898,
        average:81464447796
    }
}

var dispatch = function(selectedteam){
    console.log(dispatched);
    //send message to each member and inform them about task and role and other team members
}
module.exports = function (app) {
    app.use('/', router);
};
router.get("/home", function(req, res){
    res.render("login", {
        title: "login",
        success: "none"
    });
});

router.post("/login", function(req, res){
    var CardNumber = req.body.cardNumber + "";
    var time = req.body.transitDate;
    time = moment(time);
    var liscence;
    var TimeTaken;
    console.log("Card Number" +CardNumber);
    console.log(typeof CardNumber);
    filteredmodel.findOne({CardNumber:CardNumber}).exec(function(err, results){
        if(!err){
            if(results!=null){
                console.log(results);
                liscence = results.Liscense;
                TimeTaken = results.TimeTaken;
            }
        }
    });
    console.log("teams: ");
    console.log(teams);
    var timeAllowed = threshholds[liscence];
    if(TimeTaken<timeAllowed.best){
        if(teams.length>=1){
            teams.forEach(function(team){
                let flag = false;
                if(!team.ready){
                    if(liscence=="Load Haul Dumper"){
                        if(team.LHD.values.length<1){
                            team.LHD.values.push(CardNumber);
                            flag = true;
                        }
                    }
                    if(liscence=="Roofbolter"){
                        if(team.RB.values.length<1){
                            team.RB.values.push(CardNumber);
                            flag = true;
                        }
                    }
                    if(liscence=="Continous Miner"){
                        if(team.CM.values.length<1){
                            team.CM.values.push(CardNumber);
                            flag = true;
                        }
                    }
                    if(liscence=="Shuttle Car"){
                        if(team.SC.values.length<3){
                            team.SC.values.push(CardNumber);
                            flag = true;
                        }
                    }
                    if(!flag){
                        team.ready = true;
                    } 
                }
                else{
                    var team = {
                        ready : false,
                        SC : {
                            values : []
                        },
                        LHD : {
                            values : []
                        },
                        RB:{
                            values : []
                        },
                        CM :{
                            values : []
                        },
                        helpers : [],
                        optional : []
                    };
                    if(liscence=="Load Haul Dumper"){
                        team.LHD.values.push(CardNumber);
                    }
                    if(liscence=="Roofbolter"){
                        team.RB.values.push(CardNumber);
                    }
                    if(liscence=="Continous Miner"){
                        team.CM.values.push(CardNumber);
                    }
                    if(liscence=="Shuttle Car"){
                        team.SC.values.push(CardNumber);
                    }
                    teams.push(team);
                    setTimeout(function(){
                        var selectedteam = teams.shift();
                        if(!selectedteam.ready){
                            while(team.SC.values.length<3){
                                team.SC.values.push(averageQue.SC.values.shift());
                            }
                            while(team.CM.values.length<1){
                                team.CM.values.push(averageQue.CM.values.shift());
                            }
                            while(team.RB.values.length<1){
                                team.RB.values.push(averageQue.RB.values.shift());
                            }
                            while(team.LHD.values.length<1){
                                team.LHD.values.push(averageQue.LHD.values.shift());
                            }
                            while(team.helpers.length<3){
                                team.helpers.push(worstQue.shift());
                            }
                        }
                        dispatch(selectedteam);
                    }, 120000);
                }
            });
        }
        else{
            var team = {
                ready : false,
                SC : {
                    values : []
                },
                LHD : {
                    values : []
                },
                RB:{
                    values : []
                },
                CM :{
                    values : []
                }
            };
            if(liscence=="Load Haul Dumper"){
                team.LHD.values.push(CardNumber);
            }
            if(liscence=="Roofbolter"){
                team.RB.values.push(CardNumber);
            }
            if(liscence=="Continous Miner"){
                team.CM.values.push(CardNumber);
            }
            if(liscence=="Shuttle Car"){
                team.SC.values.push(CardNumber);
            }
            teams.push(team);
            setTimeout(function(){
                var selectedteam = teams.shift();
                if(!selectedteam.ready){
                    while(team.SC.values.length<3){
                        team.SC.values.push(averageQue.SC.values.shift());
                    }
                    while(team.CM.values.length<1){
                        team.CM.values.push(averageQue.CM.values.shift());
                    }
                    while(team.RB.values.length<1){
                        team.RB.values.push(averageQue.RB.values.shift());
                    }
                    while(team.LHD.values.length<1){
                        team.LHD.values.push(averageQue.LHD.values.shift());
                    }
                    while(team.helpers.length<3){
                        team.helpers.push(worstQue.shift());
                    }
                }
                dispatch(selectedteam);
            }, 120000);
        }
    }
    else{
        if(TimeTaken<timeAllowed.average){
            if(liscence=="Load Haul Dumper"){
                averageQue.LHD.values.push(CardNumber);
            }
            if(liscence=="Roofbolter"){
                averageQue.RB.values.push(CardNumber);
            }
            if(liscence=="Continous Miner"){
                averageQue.CM.values.push(CardNumber);
            }
            if(liscence=="Shuttle Car"){
                averageQue.SC.values.push(CardNumber);
            }
        }
        else{
            worstQue.push(CardNumber);
        }
    }
    console.log(teams);
});