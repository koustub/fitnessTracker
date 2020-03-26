document.getElementById('newWorkout').addEventListener('click', async function () {
    var d = new Date();
    console.log(d);
    console.log('new Workout Created');
    const workoutNew = {
        day: d.getDate(),
        cardioExcercises: [],
        resistanceExcercises: []
    }
    const createNewWorkout = await $.post('/api/createNewWorkout', workoutNew);
    console.log('[object Received]:', createNewWorkout);
});

document.getElementById('continueBtn').addEventListener('click', function () {
    var d = new Date();
    let day = d.getDate() - 1;
    console.log(`[Date To be Searched]:`, day)
    async function render(day) {
        const getNewworkout = await $.get(`/api/workout/${day}`);
        console.log('[Object Received] :', getNewworkout);
        if (getNewworkout === "") {
            var d = new Date();
            console.log(d);
            console.log('new Workout Created');
            const workoutNew = {
                day: d.getDate()-1,
                cardioExcercises: [],
                resistanceExcercises: []
            }
            const createNewWorkout = await $.post('/api/createNewWorkout', workoutNew);
            console.log('[object Received]:', createNewWorkout);
            workoutId = getNewworkout._id;
        }
        else {
            localStorage.setItem('getNewworkout', JSON.stringify(getNewworkout));
        }
    }
    render(day);
});