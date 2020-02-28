export const getSingleExercise = async id => {
  const idData = new FormData();
  idData.append('id', id);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  var parameters = {
    method: "POST",
    body: idData,
    redirect: "follow"
  }

  const response = await fetch("http://localhost:8000/exercise/", parameters);
  const data = await response.json();
  console.log("getting single exercise..");
  return data;
};

export const getLatestExercises = async () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  var parameters = {
    method: "GET",
    headers: headers,
    redirect: "follow"
  };

  const response = await fetch("http://localhost:8000/exercises/", parameters);
  const data = await response.json();
  console.log("getting latest exercises..");
  return data;
};

export const updateExercise = async newdata => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  var parameters = {
    method: "PUT",
    headers: headers,
    redirect: "follow",
    body: JSON.stringify(newdata)
  };

  const response = await fetch("http://localhost:8000/exercises/", parameters);
  const data = await response.json();
  console.log("updating existing exercise..");
  return data;
};

export const getSingleWorkout = async id => {
  const idData = new FormData();
  idData.append('id', id);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  var parameters = {
    method: "POST",
    body: idData,
    redirect: "follow"
  }

  const response = await fetch("http://localhost:8000/workout/", parameters);
  const data = await response.json();
  console.log("getting single workout..");
  return data;
};

export const getLatestWorkouts = async () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  var parameters = {
    method: "GET",
    headers: headers,
    redirect: "follow"
  };

  const response = await fetch("http://localhost:8000/workouts/", parameters);
  const data = await response.json();
  console.log("getting latest workouts..");
  return data;
};

export const updateWorkout = async () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  var parameters = {
    method: "GET",
    headers: headers,
    redirect: "follow"
  };

  const response = await fetch("http://localhost:8000/workouts/", parameters);
  const data = await response.json();
  console.log("updating workout..");
  return data;
};