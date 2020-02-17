export const registerUser = async userdata => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Basic YWRtaW46Z3J1cHBlNjI=");

  var parameters = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(userdata),
    redirect: "follow"
  };
  const response = await fetch("http://localhost:8000/users/", parameters);
  const data = await response.json();
  console.log("registering new user..");
  console.log(data);
  return data;
};

export const loginUser = async userdata => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  var parameters = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(userdata),
    redirect: "follow"
  };

  const response = await fetch("http://localhost:8000/login/", parameters);
  const data = await response.json();
  console.log("trying to log in user..");
  console.log(data);
  return data;
};

export const getUser = async token => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Token ${token}`);

  var parameters = {
    method: "GET",
    headers: headers,
    redirect: "follow"
  };

  const response = await fetch("http://localhost:8000/auth/", parameters);
  const data = await response.json();
  console.log("trying to authenticate user..");
  console.log(data);
  return data;
};
