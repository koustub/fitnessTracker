const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Workout = new Schema({
    day : {type: String},
    cardioExercises : [{type: Schema.Types.ObjectId,ref: 'cardio'}],
    ResistanceExercises :[{type: Schema.Types.ObjectId,ref: 'resistance'}]
});

module.exports = mongoose.model('Workout', Workout);