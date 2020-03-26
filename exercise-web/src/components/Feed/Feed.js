import React from "react";
import Post from "../Post/Post";
import PostSmall from "../Post/PostSmall";
import NewExercise from "../NewPost/NewExercise";
import NewWorkout from "../NewPost/NewWorkout";
import NewMusclegroup from "../NewPost/NewMusclegroup";
import SpinnerPost from "../Spinner/SpinnerPost";
import styles from "./feed.module.css";
import left from "../../icons/left.png";
import right from "../../icons/right.png";
import search from "../../icons/search.png";

import { Link } from "react-router-dom";

import { getLatestExercises } from "../../fetch/exercise";
import { getLatestWorkouts } from "../../fetch/workout";
import { getMusclegroups } from "../../fetch/musclegroup";

//Class to build the feed with latest posts
class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //All post-data is stored in state
      musclegroups: {},
      exercises: {},
      workouts: {},
      //State also contains the filters applied by the user
      //The filters are both musclegroups and exercises
      selectedFilters: [],
      filter: "",
      //To display a loading-spinner, state keeps track of the loading while fetching
      loadingExercises: true,
      loadingMusclegroups: true,
      loadingWorkouts: true,
      //The scroller is used for the horizontal exercise-feed
      scroller: 0,
      createMusclegroup: false
    };
  }

  //Every time feed renders, fetches the data to build feed with
  componentDidMount() {
    this.buildFeed();
  }

  //Method to get all required data from fetch-methods
  //Gets the latest musclegroups, exercises and workouts, and stores the data in state
  //Sets loading to false when data is successfully fetched
  buildFeed = () => {
    //Disables the publish musclegroup-box if open
    this.setState({ createMusclegroup: false });
    this.props.home();
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

  //Fetches musclegroups again. Used after creating a new one
  getNewMusclegroups = () => {
    getMusclegroups().then(data =>
      this.setState({ musclegroups: data, createMusclegroup: false })
    );
  }

  
  //Function to display a workout-post in the feed
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

  //Function to display all the exercises, in a horizontally-scrolling feed
  buildAllExercises = () => {
    return (
      <div className={styles.horizontalFeed}>
        {/* Left-arrow */}
        <div
          onClick={() =>
            this.state.scroller !== 0
              ? this.setState({ scroller: this.state.scroller - 3 })
              : ""
          } >
            <img alt="<" src={left}
              className={
                this.state.scroller !== 0
                  ? styles.arrow
                  : styles.arrowDisabled
              } />
        </div>
        {/* Three exercises are displayed at a time */}
        {this.state.exercises
          .slice(this.state.scroller, this.state.scroller + 3)
          .map((post, i) => (
            <Link key={i} to={"/posts/" + post.id + `?type=exercise`}>
              <PostSmall title={post.title} image={post.image} />
            </Link>
          ))}
        {/* Right arrow */}
        <div
          onClick={() =>
            this.state.scroller + 4 < this.state.exercises.length
              ? this.setState({ scroller: this.state.scroller + 3 })
              : ""
          } >
          <img
            alt=">" src={right}
            className={
              this.state.scroller + 4 <
              this.state.exercises.length
                ? styles.arrow
                : styles.arrowDisabled
            } />
        </div>
      </div>
    );
  }

  //Fuction to build the search-field and filtering on the left side
  //Is visually a part of the settings, but actually built into the feed component
  buildFilter = () => {
    return (
      <div className={styles.filterContainer}>
        <input
          placeholder="Skriv inn nøkkelord"
          autoComplete="off"
          value={ this.state.filter.charAt(0).toUpperCase() + this.state.filter.slice(1) }
          onChange={change => this.setState({ filter: change.target.value })}
          className={
            this.filterFound() ? styles.filterEnabled : styles.filterDisabled
          }
          onKeyPress={event => event.key === "Enter" && this.addFilter()}
        />
        <img alt="" className={styles.search} src={search} />
        <button
          disabled={!this.filterFound()}
          onClick={() => this.addFilter()}
          className={ this.filterFound() ? styles.buttonFilter : styles.buttonFilterDisabled }
        >
          Legg til filter
        </button>
        {//Listing all the active filters, and removes them at click
        this.state.selectedFilters.map(filter => (
          <div
            className={styles.filterList}
            onClick={() => this.removeFilter(filter)}
          >
            {"- " + filter}
          </div>
        ))}
      </div>
    )
  }

  //Adds the filter the user is searching for, if it is found
  //Resets the value of the search-input
  addFilter = () => {
    if (this.filterFound()) {
      this.setState({
        selectedFilters: [...this.state.selectedFilters, this.state.filter],
        filter: ""
      });
    }
  }

  //Removes a given filter from the list of active filters
  removeFilter = filter => {
    var newFilters = [];
    this.state.selectedFilters.forEach(a =>
      a !== filter ? newFilters.push(a) : ""
    );
    this.setState({ selectedFilters: newFilters });
  }

  //Checks if the filter the user is searching for exists
  //Returns the given filter, if it is not already active
  filterFound = () => {
    var match = "";
    if (!this.state.selectedFilters.includes(this.state.filter)) {
      //Searching through musclegroups
      this.state.musclegroups.forEach(a =>
        this.state.filter === a.name ? (match = a.name) : "") 
      ||
      //Searching through exercises
      this.state.exercises.forEach(a =>
        this.state.filter === a.title ? (match = a.title) : ""
      );
      return match;
    }
  };

  //Filter-method to check if a post contains all the filters
  //Is applied to all posts when the list of filters is longer than zero
  checkSelectedFilters = post => {
    var postExercises = [];
    var postMusclegroups = [];
    var match = true;
    //If the post contains exercises, the post must be a workout
    //Retrieves all exercises and musclegroups from the post
    if (post.exercises) {
      post.exercises.forEach(a => postExercises.push(a.title));
      post.exercises.forEach(exercise =>
        exercise.musclegroups.forEach(musclegroup =>
          postMusclegroups.push(musclegroup.name)
        )
      );
    //If the post contains a musclegroup-object, it must be an exercise
    //Retrieves all musclegroups from the post
    } else if (post.musclegroups) {
      postExercises.push(post.title);
      post.musclegroups.forEach(musclegroup =>
        postMusclegroups.push(musclegroup.name)
      );
    }
    //Matches all the filters to the exercises and musclegroups from the post
    //If one of the filters does not exist in the post, match is set to false
    this.state.selectedFilters.forEach(a =>
      postExercises.includes(a) || postMusclegroups.includes(a)
        ? ""
        : (match = false)
    );
    return match;
  };

  //Checks if there are no posts matching the filters
  //Used to display the message "Ingen treff.."
  feedEmpty = () => {
    return (
      //Are there no exercises or workouts matching the filters?
      (this.state.exercises.filter(post =>
        this.checkSelectedFilters(post)).length === 0
      && this.state.workouts.filter(post =>
        this.checkSelectedFilters(post)).length === 0) 
      //Are there no exercises matching, and the workouts are hidden?
      || (this.state.exercises.filter(post =>
        this.checkSelectedFilters(post)
      ).length === 0 && this.props.hiddenWorkouts)
      //Are there no workouts matching, and the exercises are hidden?
      || (this.state.workouts.filter(post =>
        this.checkSelectedFilters(post)
      ).length === 0 && this.props.hiddenExercises)
    );
  }

  //Rendering the entire feed, using the functions above
  render() {
    if (
      //Wait until all the data has been fetched
      //While loading, return the spinner, footer and empty filtering for the settings
      this.state.loadingMusclegroups ||
      this.state.loadingExercises ||
      this.state.loadingWorkouts
    ) {
      return (
        <div className={styles.container}>
          <div className={styles.content}>
            <SpinnerPost />
            <div className={styles.footer}> Exercise.It © • estb. 2020 </div>
            <div className={styles.filterContainer}>
              <input
                placeholder="Skriv inn nøkkelord"
                className={styles.filterDisabled}
              />
              <img alt="" className={styles.search} src={search} />
              <button disabled className={styles.buttonFilterDisabled}>
                Legg til filter
              </button>
            </div>
            </div>
          </div>
      );
    }
    return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* The header displays a greeting message unless the feed is empty */}
        <div className={ this.feedEmpty() ? styles.headerEmpty : styles.mainHeader }>
          <h1>
            {this.feedEmpty() ? "Ingen treff .."
              : this.props.user.username
              ? "Hei, " + this.props.user.username + "!"
              : "Velkommen!"}
          </h1>
        </div>
        {/* Importing the components for publishing new posts
        Activated based on state from the feed, recieves required data from feed as props */}
        <NewExercise
          musclegroups={this.state.musclegroups}
          createMusclegroup={() =>
            this.setState({
              createMusclegroup: !this.state.createMusclegroup
            })
          }
          reFetch={() => this.buildFeed()}
          user={this.props.user}
          isCreating={this.props.creatingNewExercise}
        />
        <NewWorkout
          exercises={this.state.exercises}
          reFetch={() => this.buildFeed()}
          user={this.props.user}
          isCreating={this.props.creatingNewWorkout}
        />
        <NewMusclegroup
          musclegroups={this.state.musclegroups}
          reFetch={() => this.getNewMusclegroups()}
          isCreating={
            !this.props.creatingNewWorkout &&
            this.props.creatingNewExercise &&
            this.state.createMusclegroup
          }
        />
        {/* Displays two workouts before the horizontal list of exercises, unless workouts are hidden*/}
        <div className={styles.feed}>
          {!this.props.hiddenWorkouts
            ? this.state.selectedFilters.length === 0
              ? this.state.workouts.slice(0, 2).map((post, i) => (
                this.buildPost(post, 'workout', i)
                ))
              // If any filters are applied, we list all matching posts vertically, starting with workouts
              : this.state.workouts.map((post, i) =>
                  this.checkSelectedFilters(post) ? (
                    this.buildPost(post, 'workout', i)
                  ) : (
                    ""
                  )
                )
            : ""}
        </div>
        {/* The exercises are listed in a horizontal feed, unless any filters are applied */}
          <div className={styles.feed}>
            <div>
              {/* The horizontal feed is not rendered if the exercises are hidden */}
              {!this.props.hiddenExercises ? (
                this.state.selectedFilters.length === 0 &&
                !this.props.hiddenWorkouts ? (
                  this.buildAllExercises()
                ) : (
                  // When filters are applied, the matching exercises are rendered as regular posts
                  this.state.exercises.map((post, i) =>
                    this.checkSelectedFilters(post) ? (
                      this.buildPost(post, 'exercise', i)
                      ) : ( "" )
                  )
                )
              ) : (
                ""
              )}
              {//If the horizontal exercise-feed is displayed:
              //All the rest of the workouts are displayed below it
              this.state.selectedFilters.length === 0 &&
                !this.props.hiddenWorkouts &&
                this.state.workouts.slice(2).map((post, i) => (
                  this.buildPost(post, 'workout', i)
                ))}
            </div>
          </div>
        <div className={styles.footer}> Exercise.It © • est. 2020 </div>
        {this.buildFilter()}
        </div>
      </div>
    );
  }
}

export default Feed;
