import React from "react";
import styles from "./user.module.css";
import { userData } from "../../fetch/user";
import Post from "../Post/Post";
import SpinnerPost from "../Spinner/SpinnerPost";

import professional from "../../icons/professional.png";
import amateur from "../../icons/amateur.png";

import { Link, Redirect } from "react-router-dom";

class UserPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      userrole: false,
      workouts: [],
      exercises: [],
      loading: true
    };
  }

  componentDidMount() {
    if (window.location.href.split("userpage/")[1]) {
    userData(window.location.href.split("userpage/")[1])
    .then(data => this.setState({ username: data.username, userrole: data.userrole, workouts: data.workouts, exercises: data.exercises }))
    .then(() => this.setState({ loading: false }))
    }
  }

  buildPost = (post, type, id) => {
    return (
      <Link key={id} to={"/posts/" + post.id + `?type=${type}`}>
        <Post
          user={post.user}
          date={post.date}
          title={post.title}
          image={post.image}
          content={post.content}
        />
      </Link>
    );
  }

  render() {
  window.scrollTo(0, 0);

  if (this.props.user && !this.props.user.username) {
    return <Redirect to={'/login'} />
  }

  if (this.state.loading) {
    return (
      <div className={styles.container}>
      <div className={styles.content}>
        <SpinnerPost />
      </div>
      </div>
    )
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.content}>
      <div className={styles.wrapper}>

        <div className={styles.stick}>
        <div className={styles.UserContainer}>
          <div className={styles.PB_frame}>
          <img
                alt="Exercise-it!"
                className={styles.icon}
                src={
                  this.state.userrole
                    ? professional
                    : amateur
                }
              />
            </div>
          <div className={styles.personalia}>
            <p id={styles.Name}>
              {this.state.username}
            </p>
            <p>
              {this.props.user && this.props.user.username === this.state.username ? this.props.user.email : ''}
            </p>
            <p>
              {this.state.userrole ? 'Profesjonell' : 'Amatør'}
            </p>
          </div>
          </div>
          </div>

          <div className={styles.statWrapper}>
            <div>
              <p id={styles.stat}>
              {this.state.workouts.length}
              </p>
              <p id={styles.Hstat}>
                Økter
              </p>
            </div>
            <div> 
              <p id={styles.stat}>
                {this.state.exercises.length}
              </p>
              <p id={styles.Hstat}>
                Øvelser
              </p>
            </div>
          </div>
          <div>
          {this.state.workouts.length ? (
          <div>
          <div className={styles.ContentSplitterWrapper}>
              <p>Mine økter</p>
              </div>
              <div className={styles.linje} />
              {this.state.workouts.map((post, i) => (
                this.buildPost(post, 'workout', i)
                ))}
          </div> ) : ''}
        {this.state.exercises.length ? (
        <div>
          <div className={styles.ContentSplitterWrapper}>
              <p>Mine øvelser</p>
            </div>
              <div className={styles.linje} />
              {this.state.exercises.map((post, i) => (
                this.buildPost(post, 'exercise', i)
                ))}
                </div> ) : ''}
          </div>
        </div>
      </div>  
    </div>
  );}
};

export default UserPage;
