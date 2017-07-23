var mongoose = require("mongoose");

var filteredSchema = new mongoose.Schema({
    CardNumber: String,
    TimeTaken: Number,
    Liscense: String
});

var filteredModel = mongoose.model("filtered", filteredSchema);