
async function render() {
    const getinfo = await $.get(`/api/workoutPopulated`);
    console.log('[Arr recevied]', getinfo);
    let indexforFri;
    let indexforSec;
    getinfo.forEach(function (item1,index) {
        
        document.getElementById('forworkouts').innerHTML += `
        <div class="col-md-6">
        <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Date:${item1.day}</h5>
        <div id='cardio${index}'>
        <h5>Cardio Exercises:</h5>
        </div>
        <div id='resistance${index}'>
        <h5>Resistance Exercises:</h5>
        </div>
        </div>
      </div>
        </div>
        `;

        let cardioEx = item1.cardioExercises;
        cardioEx.forEach(function (item2){
       document.getElementById(`cardio${index}`).innerHTML+=`
              <h6 class="card-subtitle mb-2 text-muted">Exercise Name: ${item2.name}</h6>
              <h6 class="card-subtitle mb-2 text-muted">Distance Covered: ${item2.distance}</h6>
              <h6 class="card-subtitle mb-2 text-muted">Duration: ${item2.duration}</h6>
              `;
            });

        let resistanceEx = item1.ResistanceExercises;
        resistanceEx.forEach(function (item3){
        document.getElementById(`resistance${index}`).innerHTML+=`
            <h6 class="card-subtitle mb-2 text-muted">Exercise Name: ${item3.name}</h6>
            <h6 class="card-subtitle mb-2 text-muted">Weight: ${item3.weight}</h6>
            <h6 class="card-subtitle mb-2 text-muted">sets: ${item3.sets}</h6>
            <h6 class="card-subtitle mb-2 text-muted">reps: ${item3.reps}</h6>
            `;
            });
    });
    
    return getinfo
}

render();

