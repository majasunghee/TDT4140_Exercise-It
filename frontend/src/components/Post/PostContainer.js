import React from "react";
import styles from "../../App.module.css";
import anonym from "../../icons/anonym.png";
import professional from "../../icons/professional.png";
import amateur from "../../icons/amateur.png";
import duration from "../../icons/duration.png";
import reps from "../../icons/reps.png";
import Settings from "../Settings/Settings";

import {
  getSingleWorkout,
  getSingleExercise,
  updateExercise,
  updateWorkout,
  deleteExercise,
  deleteWorkout
} from "../../actions/posts";

var postData = "";

const months = [
  "januar",
  "februar",
  "mars",
  "april",
  "mai",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "desember"
];

class PostContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      editing: false,
      content: ""
    };
  }

  componentDidMount() {
    this.getPost();
    window.scrollTo(0, 0);
    this.props.setRoute();
  }

  getPost() {
    if (window.location.href.split("?")[1] === "type=workout") {
      getSingleWorkout(window.location.href.split("?")[0].split("posts/")[1])
        .then(data => (postData = data))
        .then(() => this.setState({ loading: false }))
        .then(() => this.setState({ content: postData.content }));
    } else if (window.location.href.split("?")[1] === "type=exercise") {
      getSingleExercise(window.location.href.split("?")[0].split("posts/")[1])
        .then(data => (postData = data))
        .then(() => this.setState({ loading: false }))
        .then(() => this.setState({ content: postData.content }));
    }
  }

  updatePost() {
    if (window.location.href.split("?")[1] === "type=workout") {
      updateWorkout(
        window.location.href.split("?")[0].split("posts/")[1],
        this.state.content
      );
    } else if (window.location.href.split("?")[1] === "type=exercise") {
      updateExercise(
        window.location.href.split("?")[0].split("posts/")[1],
        this.state.content
      );
    }

    this.setState({ editing: false });
  }

  deletePost() {
    if (window.location.href.split("?")[1] === "type=workout") {
      deleteWorkout(window.location.href.split("?")[0].split("posts/")[1]);
      this.props.onDelete();
    } else if (window.location.href.split("?")[1] === "type=exercise") {
      deleteExercise(window.location.href.split("?")[0].split("posts/")[1]);
      this.props.onDelete();
    }
  }

  render() {
    if (this.state.loading) {
      return <div></div>;
    }

    return (
      <div>
        <Settings
          showInfo
          user={this.props.user}
          goHome={() => this.props.homeButton()}
          login={() => this.props.onLogin()}
          info={() => this.props.onInfo()}
          newExercise={() => this.newExercise()}
          newWorkout={() => this.newWorkout()}
          creatingNewExercise={this.state.newExercise}
          creatingNewWorkout={this.state.newWorkout}
          hideExercises={() =>
            this.setState({
              hideWorkouts: !this.state.hideExercises
                ? false
                : this.state.hideWorkouts,
              hideExercises: !this.state.hideExercises
            })
          }
          hideWorkouts={() =>
            this.setState({
              hideExercises: !this.state.hideWorkouts
                ? false
                : this.state.hideExercises,
              hideWorkouts: !this.state.hideWorkouts
            })
          }
          hiddenExercises={this.state.hideExercises}
          hiddenWorkouts={this.state.hideWorkouts}
        />
        <div className={styles.container}>
          <div>
            <div className={styles.mainHeader}>
              <h1>{postData.title}</h1>
            </div>
            <div className={styles.singlePostWrapper}>
              <img
                alt="Exercise-it!"
                className={styles.iconLarge}
                src={
                  postData.user
                    ? postData.userrole
                      ? professional
                      : amateur
                    : anonym
                }
              />
              <div className={styles.title}>
                <strong>{postData.user ? postData.user : "Anonym"}</strong>
              </div>
              <div className={styles.description}>
                {parseInt(postData.date.slice(8, 10), 10) +
                  ". " +
                  months[parseInt(postData.date.slice(5, 7), 10) - 1] +
                  " " +
                  postData.date.slice(0, 4)}
              </div>
              {postData.duration ? (
                <img
                  alt="Exercise-it!"
                  className={styles.iconInfo}
                  src={duration}
                />
              ) : (
                ""
              )}
              <div className={styles.duration}>
                {postData.duration ? postData.duration + " min" : ""}
              </div>
              {postData.reps &&
              postData.sets &&
              (postData.sets > 1 || postData.reps > 1) ? (
                <img
                  alt="Exercise-it!"
                  className={styles.iconInfoLeft}
                  src={reps}
                />
              ) : (
                ""
              )}
              <div className={styles.reps}>
                {postData.sets &&
                postData.sets &&
                (postData.sets > 1 || postData.reps > 1)
                  ? postData.reps + " rep. - " + postData.sets + " sett"
                  : ""}
              </div>
              <div
                className={styles.singlePostImage}
                style={{
                  backgroundImage:
                    "url(" + postData.image.toString().split("public")[1] + ")"
                }}
              />
              {this.state.editing ? (
                <textarea
                  value={this.state.content}
                  className={styles.inputFieldLarge}
                  onChange={change =>
                    this.setState({ content: change.target.value })
                  }
                />
              ) : (
                <div className={styles.text}>{this.state.content}</div>
              )}
              <div className={styles.rowSpace}>
                <div className={styles.row}>
                  {postData.exercises &&
                    postData.exercises.map(exercise => (
                      <div className={styles.filterListPost}>{exercise}</div>
                    ))}
                  {postData.musclegroups.map(exercise => (
                    <div className={styles.filterListPurple}>{exercise}</div>
                  ))}
                </div>
                {this.props.user.username === postData.user ||
                this.props.user.username === "admin" ? (
                  this.state.editing ? (
                    <div>
                      <button
                        className={styles.edit}
                        onClick={() => this.updatePost()}
                      >
                        Lagre
                      </button>
                      /
                      <button
                        className={styles.edit}
                        onClick={() => this.deletePost()}
                      >
                        Slett
                      </button>
                    </div>
                  ) : (
                    <button
                      className={styles.edit}
                      onClick={() =>
                        this.setState({ editing: !this.state.editing })
                      }
                    >
                      Rediger
                    </button>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostContainer;
