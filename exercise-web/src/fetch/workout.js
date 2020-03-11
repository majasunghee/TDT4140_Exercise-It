export const getSingleWorkout = async id => {
    const idData = new FormData();
    idData.append("id", id);
  
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
  
    var parameters = {
      method: "POST",
      body: idData,
      redirect: "follow"
    };
  
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
  
  export const updateWorkout = async (id, content, add, rem) => {
    const newdata = new FormData();
    newdata.append("content", content);
    newdata.append("relations", add + "/" + rem);
  
    var parameters = {
      method: "PATCH",
      redirect: "follow",
      body: newdata
    };
  
    const response = await fetch(
      "http://localhost:8000/workouts/" + id + "/",
      parameters
    );
    const data = await response.json();
    console.log("updating workout..");
    return data;
  };
  
  export const deleteWorkout = async id => {
    var parameters = {
      method: "DELETE",
      redirect: "follow"
    };
  
    const response = await fetch(
      "http://localhost:8000/workouts/" + id + "/",
      parameters
    );
    console.log("deleting exercise..");
  };
  