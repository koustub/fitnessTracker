const mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost:27017/workouts', {useNewUrlParser: true, useUnifiedTopology: true,});
mongoose.set('useCreateIndex', true);
const cardio = require( './models/cardio.js' );
const workout = require( './models/Workout.js' );
const resistance = require('./models/resistance.js');


function saveCardio( data ){

    const cardioex = {
        name :  data.name,
        distance  : data.distance,
        duration : data.duration,
      
    }
    const exc = new cardio  ( cardioex);
    return exc.save(  );
}

function saveResistance( data ){
    const resistanceex = {
        name : data.name,
        weight : data.weight,
        sets : data.sets,
        reps : data.reps
    }
    const exr = new resistance (resistanceex);
    return exr.save();
}

 function saveNewWorkout(data){
     const workoutobj = {
         day : data.day,
         cardioExcercises :  data.cardioExcercises,
        resistanceExcercises : data.resistanceExcercises

 }
 const workOut = new workout (workoutobj);
    return workOut.save();

 }

 async function getWorkout(date){
    const Newgetworkout =  await workout.findOne({day:`${date}`});
    return Newgetworkout;
 }
async function pushCardioExcercises(obj){
    console.log('[workout id,cardio id]:',obj)
  const pushCardioId = mongoose.Types.ObjectId(obj.cardioId);
  console.log('[cardio id received]:',pushCardioId);
  const pushCardioArray = await workout.updateOne({_id:`${obj.workoutId}`}, { $push: {cardioExercises : `${obj.cardioId}` } });
  console.log('[updated workout document]:',pushCardioArray);
     return pushCardioArray
   }
   async function pushResistanceExcercises(obj){
    console.log('[workout id,Resistance id]:',obj)
  
  const pushResistanceArray = await workout.updateOne({_id:`${obj.workoutId}`}, { $push: {ResistanceExercises : `${obj.resistanceId}` } });
  console.log('[updated workout document]:',pushResistanceArray);
     return pushResistanceArray
   }
   async function getWorkoutPopulated(){
    const getWorkout = await workout.find().populate("cardioExercises ResistanceExercises");
    return getWorkout
   }
 
module.exports = {
    saveCardio,
    saveResistance,
    saveNewWorkout,
    getWorkout,
    pushCardioExcercises,
    pushResistanceExcercises,
    getWorkoutPopulated,
}