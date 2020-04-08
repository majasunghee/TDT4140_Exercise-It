import url from "../consts/django-url"

export const getMusclegroups = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
  
    var parameters = {
      method: "GET",
      headers: headers,
      redirect: "follow"
    };
  
    const response = await fetch(`http://${url}:8000/musclegroups/`, parameters);
    const data = await response.json();
    console.log("getting all musclegroups..");
    return data;
  };
  