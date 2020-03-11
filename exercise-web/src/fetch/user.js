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

  console.log("trying to register new user..");
  const response = await fetch("http://localhost:8000/users/", parameters);
  const data = await response.json();
  return response.ok ? data : false;
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

  console.log("trying to log in user..");
  const response = await fetch("http://localhost:8000/login/", parameters);
  const data = await response.json();
  return response.status === 200 ? data : false;
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

  console.log("trying to authenticate user..");
  const response = await fetch("http://localhost:8000/auth/", parameters);
  const data = await response.json();
  return response.status === 200 ? data : false;
};
