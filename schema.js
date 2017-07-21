
var dream = require("dreamjs");
var MessageBody = require("./messagebody.js");

var terminals = {
    "27":["TRCH01"],
    "1":["Thebu"],
    "2":["iThemba"],
    "3":["BrS_2E"],
    "4":["BrS_MS"]
}

dream.customType('IdentityCard', function(helper) {
    helper.identity = helper.oneOf(MessageBody);
    return helper.identity.CardNumber;
});

dream.customType('IdentitySurname', function(helper){
    return helper.identity.Surname;
});

dream.customType('IdentityName', function(helper){
    return helper.identity.Name;
});

dream.customType('IdentityUser', function(helper){
    return helper.identity.UserType;
});

var transitStatus = [0, 4, 12];
dream.customType('TransitStatusType', function(helper) {
    return helper.oneOf(transitStatus);
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

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

dream.customType('TransitDateType', function(helper) {
    helper.date = randomDate(new Date(2017, 0, 1, 0, 10), new Date(2017, 0, 1, 0, 25));
    return helper.date.toISOString();
});

dream.customType('insertDateType', function(helper) {
    return randomDate(helper.date, new Date(helper.date.getFullYear(), helper.date.getMonth(), helper.date.getDay(), helper.date.getHours(), (helper.date.getMinutes()+15))).toISOString();
});

dream.customType('LayoutIdType', function(helper) {
    return 2;
});

dream.customType('SiteType', function(helper) {
    var site = helper.oneOf(Object.keys(terminals));
    helper.site = site;
    return helper.site;
});

dream.customType('TerminalType', function(helper){
    return terminals[helper.site];
});

dream.schema('MiningClocks', {
    CardNumber: 'IdentityCard',
    LayoutId: 'LayoutIdType',
    TransitDate: 'TransitDateType',
    TransitStatus: 'TransitStatusType',
    Surname: 'IdentitySurname',
    Name: 'IdentityName',
    Terminal: 'TerminalType',
    Direction: 'DirectionType',
    STR_DIRECTION: 'StrDirectionType',
    UserType: 'IdentityUser',
    Site: 'SiteType',
    InsertDate: 'insertDateType'
});


module.exports = {
    dream: dream
};