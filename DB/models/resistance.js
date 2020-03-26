const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let resistance = new Schema({
    name : {type :String,required : true},
    weight : Number,
    reps : Number,
    sets : Number

});

module.exports = mongoose.model('resistance', resistance);