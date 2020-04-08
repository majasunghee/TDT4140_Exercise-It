import url from "../consts/django-url"

export const postFeedback = async (postId, username, rating, comment) => {
  const postData = new FormData();
  postData.append("postId", postId);
  postData.append("username", username);
  postData.append("rating", rating);
  postData.append("comment", comment);

  var parameters = {
    method: "POST",
    body: postData,
    redirect: "follow"
  };

  const response = await fetch(`http://${url}:8000/feedback/`, parameters);
  const data = await response.json();
  console.log("posting feedback..");
  return data;
};

export const getFeedbackForPost = async id => {
  const idData = new FormData();
  idData.append("id", id);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  var parameters = {
    method: "POST",
    body: idData,
    redirect: "follow"
  };

  const response = await fetch(`http://${url}:8000/feedback/`, parameters);
  const data = await response.json();
  console.log("getting feedback for post..");
  return data;
};

export const deleteFeedback = async id => {
  var parameters = {
    method: "DELETE",
    redirect: "follow"
  };

  const response = await fetch(
    `http://${url}:8000/feedback/` + id + "/",
    parameters
  );
  const data = await response.json();
  console.log("deleting feedback..");
  return data;
};