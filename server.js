const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const orm = require( './db/orm' );

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static("public"));



app.post( '/api/createCardioExcercise',  async function ( req, res ){
    const newCardio = req.body;
    console.log('Received New Cardio Excercise: ', newCardio.name )
    const mongoResponse = await orm.saveCardio( req.body );
    console.log('saving the list',mongoResponse);
    res.send ( mongoResponse)
});
app.post( '/api/createResistanceExcercise',  async function ( req, res ){
    const newResistance = req.body;
    console.log('Received New Resistance Excercise: ', newResistance.name )
    const mongoResonse = await orm.saveResistance( req.body );
    console.log( mongoResonse );
    res.send ( mongoResonse)
});
app.post( '/api/createNewWorkout',  async function ( req, res ){

    const mongoResonse = await orm.saveNewWorkout( req.body );
    console.log( mongoResonse );
    res.send (mongoResonse);
});
app.get( `/api/workout/:day?`, async function( req, res ){
    let day = req.params.day;
    const workoutInfo = await orm.getWorkout( day );
    res.send(workoutInfo);
} );

app.get( `/api/workoutPopulated`, async function( req, res ){
    const workoutInfo = await orm.getWorkoutPopulated();
    console.log(workoutInfo)
    res.send(workoutInfo);
} );
app.get( `/api/workoutCardioExcercises/:id?`, async function( req, res ){
    let id = req.params.id;
    const workoutInfo = await orm.getWorkoutCardioExcercises( id );
    res.send(workoutInfo);
} );

app.post( `/api/updateWorkoutCardio`, async function( req, res ){
    const workoutInfo = await orm.pushCardioExcercises(req.body );
    res.send(workoutInfo);
} );
app.post( `/api/updateWorkoutResistance`, async function( req, res ){
    //console.log('[resistance id received:]',req.body)
    const workoutInfo = await orm.pushResistanceExcercises(req.body );
    res.send(workoutInfo);
} );
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });

