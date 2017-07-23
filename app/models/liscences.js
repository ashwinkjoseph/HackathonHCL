var mongoose = require("mongoose");

var liscenseSchema = new mongoose.Schema({
    CardNumber: String,
    Surname: String,
    Name: String,
    UserType: String,
    Liscense: String,
});

var liscenseModel = mongoose.model("liscense", liscenseSchema);