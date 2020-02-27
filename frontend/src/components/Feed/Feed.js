import React from "react";
import Post from "../Post/Post";
import Card from "../Card/Card";
import NewExercise from "../NewPost/NewExercise"
import NewWorkout from "../NewPost/NewWorkout"
import SpinnerPost from "../Spinner/SpinnerPost";
import styles from "../../App.module.css";

import { getLatestExercises, getLatestWorkouts } from "../../actions/posts";
import { getMusclegroups } from "../../actions/musclegroups";

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      musclegroups: {},
      exercises: {},
      workouts: {},
      selectedFilters: [],
      filter: '',
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
    this.props.defaultHome();
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

  filterFound = () => {
    var match = '';
    if (!this.state.selectedFilters.includes(this.state.filter)) {
    this.state.musclegroups.forEach(a => this.state.filter === a.name ? match = a.name : '') || this.state.exercises.forEach(a => this.state.filter === a.title ? match = a.title : '')
    return match;
    }
  }

  addFilter() {
    if (this.filterFound()) {
    this.setState({selectedFilters: [...this.state.selectedFilters, this.state.filter], filter: ''})
    }
  }

  removeFilter(filter) {
    var newFilters = [];
    this.state.selectedFilters.forEach(a => a !== filter ?
    newFilters.push(a) : '');
    this.setState({selectedFilters: newFilters})
  }

  checkSelectedFilters = post => {
    var postExercises = [];
    var postMusclegroups = [];
    var match = true;
    if (post.exercises) {
      post.exercises.forEach(a => postExercises.push(a.title));
      post.exercises.forEach(exercise =>
        exercise.musclegroups.forEach(musclegroup =>
        postMusclegroups.push(musclegroup.name)
      ));
    }
    else if (post.musclegroups) {
      postExercises.push(post.title);
      post.musclegroups.forEach(musclegroup =>
        postMusclegroups.push(musclegroup.name)
      );
    }
    this.state.selectedFilters.forEach(a =>
      (postExercises.includes(a) || postMusclegroups.includes(a)) ? '' : match = false
    );
    return match;
  };

  render() {
    if (this.state.loadingMusclegroups || this.state.loadingExercises || this.state.loadingWorkouts) {
      return (      <div>
        <div className={styles.feedContainer}><SpinnerPost /></div></div>)
    }
    return (
      <div>
        <div className={styles.feedContainer}>
          <div className={styles.mainHeader}><h1>{this.props.user.username ? 'Hei, '+this.props.user.username+'!' : 'Velkommen!'}</h1></div>
          <NewExercise musclegroups={this.state.musclegroups} reFetch={() => this.buildFeed()} user={this.props.user} isCreating={this.props.creatingNewExercise}/>
          <NewWorkout exercises={this.state.exercises} reFetch={() => this.buildFeed()} user={this.props.user} isCreating={this.props.creatingNewWorkout}/>         
          <div className={styles.feed}>
          {!this.props.hiddenWorkouts ?
          (this.state.selectedFilters.length === 0
              ? this.state.workouts.slice(0, 2).map(post => (
                  <div onClick={() => this.props.singlePost(post, 'workout')}>
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
                  this.checkSelectedFilters(post) ? (
                    <div onClick={() => this.props.singlePost(post, 'workout')}>
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
                )) : ''}
          </div>
        </div>
        <div className={styles.feedContainer}>
          <div className={styles.feed}>
            {!this.state.loading ? (
              <div>
               {!this.props.hiddenExercises ? 
                this.state.selectedFilters.length === 0 ? (
               <div className={styles.cardContainer}>
                  <div className={this.state.scroller !== 0 ? styles.arrow : styles.arrowDisabled} onClick={() => this.state.scroller !== 0 ? this.setState({scroller: this.state.scroller - 3}) : ''}>{"<"}</div>
                  {this.state.exercises.slice(this.state.scroller, this.state.scroller+3).map(post => (
                    <div onClick={() => this.props.singlePost(post, 'exercise')}>
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
                    </div>))}
                <div className={ this.state.scroller+3 < this.state.exercises.length ? styles.arrow : styles.arrowDisabled} onClick={() => this.state.scroller+4 < this.state.exercises.length ? this.setState({scroller: this.state.scroller + 3}) : ''}>{">"}</div>
             </div>) : 
                  this.state.exercises.map(post => (
                    this.checkSelectedFilters(post) ?
                    <div onClick={() => this.props.singlePost(post, 'exercise')}>
                      <Post
                        url={post.url}
                        user={post.user}
                        date={post.date}
                        title={post.title}
                        image={post.image}
                        content={post.content}
                        sets={post.sets}
                        reps={post.reps}
                        exercise
                      />
                    </div> : ''
                  )
                ) : ''}
               { this.state.selectedFilters.length === 0 && !this.props.hiddenWorkouts && this.state.workouts.slice(2).map(post => (
                  <div onClick={() => this.props.singlePost(post, 'workout')}>
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
        <div className={styles.filterContainer}>
      <input 
      placeholder="Filtrer på muskelgrupper og øvelser"
      name="Filter"
      autocomplete="off"
      value={this.state.filter.charAt(0).toUpperCase() + this.state.filter.slice(1)}
      onChange={change => this.setState({ filter: change.target.value })}
      className={this.filterFound() ? styles.filterEnabled : styles.filterDisabled}
      onKeyPress={event =>
                  event.key === "Enter" ? this.addFilter() : ""
                }/>
            <button
                  disabled={!this.filterFound()}
                  onClick={() => this.addFilter()}
                  className={
                    this.filterFound()
                      ? styles.buttonFilter
                      : styles.buttonFilterDisabled
                  }
                >
                  Legg til
                </button>
      {this.state.selectedFilters.map(filter =>
      <div className={styles.filterList} onClick={() => this.removeFilter(filter)} >{filter}</div>)}
      </div>
      </div>
    );
  }
}

export default Feed;
