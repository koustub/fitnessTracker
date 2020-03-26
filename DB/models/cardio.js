const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cardio = new Schema({
    name : {type :String,required : true},
    duration : Number,
    distance : Number,

});

module.exports = mongoose.model('cardio', cardio);