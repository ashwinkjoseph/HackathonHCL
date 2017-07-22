
var dream = require('dreamjs');
var sites = ["27", "1", "2", "3", "4"];
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

var names = ["Batman", "Goku", "Luffy", "Zoro", "Sanji", "Vegeta", "Broly", "Nami", "Robin"];
dream.customType('NameType', function(helper) {
    return helper.oneOf(names);
});

var Surnames = ["Batman", "Kakarot", "Monkey", "Roranoa", "Vinsmoke", "Prince", "Broly", "iman", "nibor"];
dream.customType('SurnameType', function(helper) {
    return helper.oneOf(Surnames);
});

let userTypes = ["employee", "external personall"];
dream.customType('UserType', function(helper) {
    return helper.oneOf(userTypes);
});

let LiscenseTypes = ["Load Haul Dumper", "Roofbolter", "Shuttle Car", "Continous Miner"];
dream.customType('LiscenseType', function(helper) {
    return helper.oneOf(LiscenseTypes);
});

dream.customType('SiteType', function(helper) {
    return helper.oneOf(sites);
});

dream.schema('Identities', {
    CardNumber: 'cardNumberType',
    Surname: 'SurnameType',
    Name: 'NameType',
    UserType: 'UserType',
    Liscense: 'LiscenseType',
    site: "SiteType"
});

module.exports = {
    dream: dream
};