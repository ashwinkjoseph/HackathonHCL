// schema.js

// This will include the globally installed dreamjs which required NODE_PATH to be set
// or include from local install
var dream = require('dreamjs');
var terminals = {
    "27":["TRCH01"],
    "1":["Thebu"],
    "2":["iThemba"],
    "3":["BrS_2E"],
    "4":["BrS_MS"]
}
var lastcardNumberCache = {};
var cardNumberGenerator = function(college, helper) {
    if (!lastcardNumberCache[college]) {
        lastcardNumberCache[college] = helper.chance.integer({ min: 10000, max: 50000 });
    }

    return lastcardNumberCache[college]++;
}

dream.customType('cardNumberType', function(helper) {
    return cardNumberGenerator(helper.college, helper);
});

var transitStatus = [0, 4, 12];
dream.customType('TransitStatusType', function(helper) {
    return helper.oneOf(transitStatus);
});

var names = ["Batman", "Goku", "Luffy", "Zoro", "Sanji", "Vegeta", "Broly", "Nami", "Robin"];
dream.customType('NameType', function(helper) {
    return helper.oneOf(names);
});

var Surnames = ["Batman", "Kakarot", "Monkey", "Roranoa", "Vinsmoke", "Prince", "Broly", "iman", "nibor"];
dream.customType('SurnameType', function(helper) {
    return helper.oneOf(Surnames);
});

var direction = [0, 1];
dream.customType('DirectionType', function(helper) {
    helper.Direction = helper.oneOf(direction);
    return helper.Direction;
});

dream.customType('StrDirectionType', function(helper) {
    if (helper.Direction == 0) {
        return "Exit";
    }
    else{
        return "Entry";
    }
});

dream.customType('SiteType', function(helper) {
    var site = helper.oneOf(Object.keys(terminals));
    helper.site = site;
    return helper.site;
});

let userTypes = ["employee", "external personall"];
dream.customType('UserType', function(helper) {
    return helper.oneOf(userTypes);
});

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

dream.customType('TransitDateType', function(helper) {
    helper.date = randomDate(new Date(2017, 0, 1, 0, 10), new Date(2017, 0, 1, 0, 25));
    return helper.date;
});

dream.customType('insertDateType', function(helper) {
    return randomDate(helper.date, new Date(helper.date.getFullYear(), helper.date.getMonth(), helper.date.getDay(), helper.date.getHours(), (helper.date.getMinutes()+15)));
});

dream.customType('LayoutIdType', function(helper) {
    return 2;
});

dream.customType('TerminalType', function(helper){
    return terminals[helper.site];
});

dream.schema('MiningClocks', {
    CardNumber: 'cardNumberType',
    LayoutId: 'LayoutIdType',
    TransitDate: 'TransitDateType',
    TransitStatus: 'TransitStatusType',
    Surname: 'SurnameType',
    Name: 'NameType',
    Terminal: 'TerminalType',
    Direction: 'DirectionType',
    STR_DIRECTION: 'StrDirectionType',
    UserType: 'UserType',
    Site: 'SiteType',
    InsertDate: 'insertDateType'
});


module.exports = {
    dream: dream
};