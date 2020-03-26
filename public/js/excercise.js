let date;
if ((localStorage.getItem('getNewworkout') !== null)){
  const getNewworkoutId =  JSON.parse(localStorage.getItem('getNewworkout'));
   date = getNewworkoutId.day;
  console.log(`[Object received From Local Storage] =>`,getNewworkoutId);
}
  
async function render (){
    const getNewworkout =  await $.get( `/api/workout/${date}`);
    console.log('info found',getNewworkout);
    workoutId = getNewworkout._id;
}
render();
document.getElementById('moreDetails').addEventListener('click', function () {
    if (type.value === 'Select Exercise Type') {
        alert('please select any of the following');
    }

    else if (type.value === 'cardio') {

        details.innerHTML = `
        <div class="cardio-name ui input">
        <input type="text" name="cardio-name" id="cardio-name" placeholder="Running" />
      </div>
      <div class="distance ui input">
        <input type="number" name="distance" id="distance" placeholder="distance" />
      </div>
      <div class="distance ui input">
        <input   type="number" name="duration" id="duration" placeholder="duration" />
      </div>
`;



    }
    else if (type.value === 'resistance') {
        console.log(`${type.value}`);
        details.innerHTML = `<div class="exercise">
        <label for="name">Exercise Name:</label>
        <input type="text" name="name" id="name" placeholder="Bench Press" />
      </div>
      <div class="weight">
        <label for="weight">Weight (lbs):</label>
        <input type="number" name="weight" id="weight" placeholder="200" />
      </div>
      <div class="sets">
        <label for="sets">Sets:</label>
        <input type="number" name="sets" id="sets" placeholder="4" />
      </div>
      <div class="reps">
        <label for="reps">Reps:</label>
        <input type="number" name="reps" id="reps" placeholder="10" />
      </div>
      <div class="resistance-duration">
        <label for="resistance-duration">Duration (minutes):</label>
        <input type="number" name="resistance-duration" id="resistance-duration" placeholder="10" />
      </div>
    </div>`;
    }



});

document.getElementById('add').addEventListener('click', async function () {
    if (type.value === 'Select Exercise Type') {
        alert('please select any of the following');
    }
    else if (type.value === 'cardio') {
        const name = document.getElementById('cardio-name');
        const duration = document.getElementById('duration');
        const distance = document.getElementById('distance');
        console.log(`cardio name :${name.value} duration: ${duration.value} distance:${distance.value}`);
        const newCardio = {
            name : `${name.value}`,
            distance : distance.value,
            duration : duration.value
        }

        const createCardio = await $.post( '/api/createCardioExcercise', newCardio );
        console.log('cardio Created',createCardio);
       const  saveCardio = {
            workoutId : workoutId,
            cardioId : createCardio._id
        };
        const updateWorkoutCardio = await $.post('/api/updateWorkoutCardio',saveCardio);
        console.log('saving cardio in workout',updateWorkoutCardio);
        details.innerHTML = '';
        type.value = 'Select Exercise Type';
    }
    else if (type.value === 'resistance') {
        const name = document.getElementById('name');
        const weight = document.getElementById('weight');
        const sets = document.getElementById('sets');
        const reps = document.getElementById('reps');
        console.log(`name :${name.value} weight: ${weight.value} sets:${sets.value} reps:${reps.value}`);
        const newResistance = {
            name : `${name.value}`,
            weight : weight.value,
            sets : sets.value,
            reps : reps.value
        }
        const createResistance = await $.post( '/api/createResistanceExcercise', newResistance );
        console.log('cardio Created',createResistance);
        const  saveResistance = {
          workoutId : workoutId,
          resistanceId : createResistance._id
      };
      const updateWorkoutresistance = await $.post('/api/updateWorkoutResistance',saveResistance);
      console.log('saving Resistance in workout',updateWorkoutresistance);
        details.innerHTML = '';
        type.value = 'Select Exercise Type';
    }
});
