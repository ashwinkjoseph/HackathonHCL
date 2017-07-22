var moment = require("moment");
function randomDate(start, end) {
    return moment(start.valueOf() + Math.random() * (end.valueOf() - start.valueOf()));
}

// dream.customType('TransitDateType', function(helper) {
//     helper.date = randomDate(new Date(2017, 0, 1, 0, 10), new Date(2017, 0, 1, 0, 25));
//     return helper.date.toISOString();
// });

// dream.customType('insertDateType', function(helper) {
//     var date = randomDate(helper.date, new Date(helper.date.getFullYear(), helper.date.getMonth(), helper.date.getDay(), helper.date.getHours(), (helper.date.getMinutes()+15)));
//     return date.toISOString();
// });

var transit = function(helper) {
    var d1 = moment();
    var d2 = d1.add(15, 'm');
    console.log("d1 " + d1);
    console.log("d2 "+d2);
    helper.date = randomDate(d1, d2);
    return helper.date.toISOString();
};

var insert = function(helper) {
    console.log("helper.date "+helper.date);
    var d2 = helper.date.add(15, 'm');
    console.log("d2: "+d2);
    var date = randomDate(helper.date, d2);
    return date.toISOString();
};

console.log(transit(this));
console.log(insert(this));