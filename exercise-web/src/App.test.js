import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import Post from "./components/Post/Post";

const testuser = {
  username: "Testuser",
  email: "test@user.com",
  role: true
};

it('sums numbers', () => {
    expect(1).toEqual(1);
    expect(2).toEqual(2);
});0

it('renders app without crashing', () => {
const div = document.createElement('div');
ReactDOM.render(<App />, div);
expect(div.textContent).toContain("Exercise.it!");
});

it('renders post without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <Post
    user={testuser}
    date={'09-08-2019'}
    title={'Testpost'}
    image={''}
    content={'Testcontent'}
    exercise={true}
  />, div);
  expect(div.textContent).toContain("Testpost");
});