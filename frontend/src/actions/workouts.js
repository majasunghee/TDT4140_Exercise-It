export const publishWorkout = async userdata => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
  
    var parameters = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(userdata),
      redirect: "follow"
    };
    const response = await fetch("http://localhost:8000/workouts/", parameters);
    const data = await response.json();
    console.log("posting a new workout..");
    console.log(data);
    return data;
  };
  
  export const getSingleWorkout = async userdata => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
  
    var parameters = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(userdata),
      redirect: "follow"
    };
  
    const response = await fetch("http://localhost:8000/workouts/", parameters);
    const data = await response.json();
    console.log("trying to log in user..");
    console.log(data);
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
    console.log(data)
    return data;
  };
  