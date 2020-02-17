export const getSingleExercise = async userdata => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  var parameters = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(userdata),
    redirect: "follow"
  };

  const response = await fetch("http://localhost:8000/exercises/", parameters);
  const data = await response.json();
  console.log("trying to log in user..");
  console.log(data);
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
