import React from "react";
import Post from "../Post/Post";
import Card from "../Card/Card";
import NewExercise from "../NewPost/NewExercise";
import NewWorkout from "../NewPost/NewWorkout";
import Spinner from "../Spinner/Spinner";
import styles from "../../App.module.css";

import { getLatestExercises } from "../../actions/exercises";
import { getMusclegroups } from "../../actions/musclegroups";
import { getLatestWorkouts } from "../../actions/workouts";

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      musclegroups: {},
      exercises: {},
      workouts: {},
      valgteMuskler: [],
      valgteØvelser: [],
      loadingExercises: true,
      loadingMusclegroups: true,
      loadingWorkouts: true,
      scroller: 0
    };
  }

  componentDidMount() {
    this.buildFeed();
  }

  buildFeed() {
    getMusclegroups()
      .then(data => this.setState({ musclegroups: data }))
      .then(() => this.setState({ loadingMusclegroups: false }));
    getLatestExercises()
      .then(data => this.setState({ exercises: data }))
      .then(() => this.setState({ loadingExercises: false }));
    getLatestWorkouts()
      .then(data => this.setState({ workouts: data }))
      .then(() => this.setState({ loadingWorkouts: false }));
  }

  checkChoosenmuskler = post => {
    var alleØvelser = [];
    var alleMuskler = [];
    var match = 0;
    post.exercises.forEach(a => alleØvelser.push(a));
    alleØvelser.forEach(a =>
      this.state.øvelser[Number.parseInt(a, 10)]
        ? (alleMuskler = [
            ...alleMuskler,
            ...this.state.øvelser[Number.parseInt(a, 10)].muskler
          ])
        : ""
    );
    alleMuskler.forEach(a =>
      this.state.valgteMuskler.includes(a) ? (match = match + 1) : ""
    );
    return match === this.state.valgteMuskler.length;
  };

  render() {
    if (
      this.state.loadingMusclegroups ||
      this.state.loadingExercises ||
      this.state.loadingWorkouts
    ) {
      return (
        <div>
          <div className={styles.feedContainer}>
            <Spinner />
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className={styles.feedContainer}>
          <div className={styles.feed}>
            <div className={styles.actionBar}>
              <NewExercise
                reFetch={() => this.buildFeed()}
                user={this.props.user}
                createNew={() => this.props.newExercise()}
                isCreating={this.props.creatingNewExercise}
              />
              <NewWorkout
                reFetch={() => this.buildFeed()}
                user={this.props.user}
                createNew={() => this.props.newWorkout()}
                isCreating={this.props.creatingNewWorkout}
              />
            </div>
            {this.state.valgteMuskler.length === 0
              ? this.state.workouts.slice(0, 3).map(post => (
                  <div onClick={() => this.props.singlePost(post)}>
                    <Post
                      user={post.user}
                      date={post.date}
                      title={post.title}
                      image={post.image}
                      content={post.content}
                    />
                  </div>
                ))
              : this.state.workouts.map(post =>
                  this.checkChoosenmuskler(post) ? (
                    <div onClick={() => this.props.singlePost(post)}>
                      <Post
                        user={post.user}
                        date={post.date}
                        title={post.title}
                        image={post.image}
                        content={post.content}
                      />{" "}
                    </div>
                  ) : (
                    ""
                  )
                )}
          </div>
          <div className={styles.filter}>
            <h3>
              <strong>Sorter på muskelgrupper</strong>
            </h3>
            <br />
            {this.state.musclegroups.map(tag => (
              <div
                onClick={() =>
                  this.state.valgteMuskler.includes(tag)
                    ? this.setState({
                        valgteMuskler: this.state.valgteMuskler.filter(
                          a => a !== tag
                        )
                      })
                    : this.setState(prev => ({
                        valgteMuskler: [...prev.valgteMuskler, tag]
                      }))
                }
                className={
                  this.state.valgteMuskler.includes(tag)
                    ? styles.choosenLink
                    : styles.filterLink
                }
              >
                {tag.name}
              </div>
            ))}

            <h3>
              <strong>Sorter på øvelser</strong>
            </h3>
            {!this.state.loading
              ? this.state.exercises.map(øvelse => (
                  <div
                    onClick={() =>
                      this.state.valgteØvelser.includes(øvelse.title)
                        ? this.setState({
                            valgteØvelser: this.state.valgteØvelser.filter(
                              a => a !== øvelse.title
                            )
                          })
                        : this.setState(prev => ({
                            valgteØvelser: [...prev.valgteØvelser, øvelse.title]
                          }))
                    }
                    className={
                      this.state.valgteØvelser.includes(øvelse.title)
                        ? styles.choosenLink
                        : styles.filterLink
                    }
                  >
                    {øvelse.title}
                  </div>
                ))
              : ""}
          </div>
        </div>
        <div className={styles.feedContainer}>
          <div className={styles.feed}>
            {this.state.valgteMuskler.length === 0 && !this.state.loading ? (
              <div>
                <div className={styles.cardContainer}>
                  <div
                    className={
                      this.state.scroller !== 0
                        ? styles.arrow
                        : styles.arrowDisabled
                    }
                    onClick={() =>
                      this.state.scroller !== 0
                        ? this.setState({ scroller: this.state.scroller - 4 })
                        : ""
                    }
                  >
                    {"<"}
                  </div>
                  {this.state.exercises
                    .slice(this.state.scroller, this.state.scroller + 4)
                    .map(post => (
                      <div onClick={() => this.props.singlePost(post)}>
                        <Card
                          url={post.url}
                          user={post.user}
                          date={post.date}
                          title={post.title}
                          image={post.image}
                          content={post.content}
                          sets={post.sets}
                          reps={post.reps}
                        />
                      </div>
                    ))}
                  <div
                    className={
                      this.state.scroller + 4 < this.state.exercises.length
                        ? styles.arrow
                        : styles.arrowDisabled
                    }
                    onClick={() =>
                      this.state.scroller + 4 < this.state.exercises.length
                        ? this.setState({ scroller: this.state.scroller + 4 })
                        : ""
                    }
                  >
                    {">"}
                  </div>
                </div>
                <div className={styles.cardContainer}></div>
                {this.state.workouts.slice(3).map(post => (
                  <div onClick={() => this.props.singlePost(post)}>
                    <Post
                      user={post.user}
                      date={post.date}
                      title={post.title}
                      image={post.image}
                      content={post.content}
                    />
                  </div>
                ))}{" "}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
