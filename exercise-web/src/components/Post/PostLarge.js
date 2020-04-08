import React from "react";
import styles from "./post.module.css";
import anonym from "../../icons/anonym.png";
import professional from "../../icons/professional.png";
import amateur from "../../icons/amateur.png";
import duration from "../../icons/duration.png";
import reps from "../../icons/reps.png";

import Rating from "../Rating/Rating";

import months from "../../consts/months"

//fetch functions for getting and updating posts
import { getLatestExercises, getSingleExercise, updateExercise, deleteExercise } from "../../fetch/exercise";
import { getSingleWorkout, updateWorkout, deleteWorkout } from "../../fetch/workout";

import { getMusclegroups } from "../../fetch/musclegroup";

import { postFeedback } from "../../fetch/feedback";

import { Link } from "react-router-dom";

var postData = "";

class PostLarge extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      editing: false,
      content: "",
      newRelations: "",
      removeRelations: "",
      filter: "",
      musclegroups: {},
      exercises: {},
      postFilters: [],
      visibility: true,
      //
      rating: 0,
      comment: ""
    };
  }

  componentDidMount() {
    this.getPost();
    window.scrollTo(0, 0);
    this.getMeta();
  }

  getMeta() {
    getMusclegroups().then(data => this.setState({ musclegroups: data }));
    getLatestExercises().then(data => this.setState({ exercises: data }));
  }

  getPost() {
    if (window.location.href.split("?")[1] === "type=workout") {
      getSingleWorkout(window.location.href.split("?")[0].split("posts/")[1])
        .then(data => (postData = data))
        .then(() => this.setState({ loading: false }))
        .then(() => this.setState({ content: postData.content, visibility: postData.visibility }));
    } else if (window.location.href.split("?")[1] === "type=exercise") {
      getSingleExercise(window.location.href.split("?")[0].split("posts/")[1])
        .then(data => (postData = data))
        .then(() => this.setState({ loading: false }))
        .then(() => this.setState({ content: postData.content, visibility: postData.visibility }));
    }
  }

  updatePost() {
    if (window.location.href.split("?")[1] === "type=workout") {
      updateWorkout(
        window.location.href.split("?")[0].split("posts/")[1],
        this.state.content,
        this.state.visibility,
        this.state.newRelations,
        this.state.removeRelations
      ).then(() => this.forceUpdate());
    } else if (window.location.href.split("?")[1] === "type=exercise") {
      updateExercise(
        window.location.href.split("?")[0].split("posts/")[1],
        this.state.content,
        this.state.visibility,
        this.state.newRelations,
        this.state.removeRelations
      ).then(() => this.forceUpdate());
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

  postFeedback() {
    postFeedback(window.location.href.split("?")[0].split("posts/")[1],
      this.props.user.username, this.state.rating, this.state.comment)
  }

  download = () => {
    const downloadData = `${postData.title} av ${postData.user ? postData.user : 'anonym'}\n${postData.date}\n\n${postData.content} `
    var blob = new Blob( [ downloadData ], {
      type: 'application/octet-stream'
    });
    
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = `${postData.title}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  filterFound = () => {
    var match = "";
    postData.exercises &&
      this.state.exercises.forEach(a =>
        this.state.filter === a.title &&
        (!postData.exercises.includes(this.state.filter) ||
          this.state.removeRelations.includes(this.state.filter)) &&
        !this.state.postFilters.includes(this.state.filter)
          ? (match = a.title)
          : ""
      );
    !postData.exercises &&
      postData.musclegroups &&
      this.state.musclegroups.forEach(a =>
        this.state.filter === a.name &&
        (!postData.musclegroups.includes(this.state.filter) ||
          this.state.removeRelations.includes(this.state.filter)) &&
        !this.state.postFilters.includes(this.state.filter)
          ? (match = a.name)
          : ""
      );
    return match;
  };

  addFilter() {
    if (this.filterFound()) {
      if (
        this.state.removeRelations
          .split(" ")
          .filter(a => a === this.state.filter).length === 0
      ) {
        this.setState({
          newRelations: this.state.newRelations + " " + this.filterFound()
        });
        this.setState({
          postFilters: [...this.state.postFilters, this.state.filter],
          filter: ""
        });
      } else {
        this.setState({
          removeRelations: this.state.removeRelations.replace(
            " " + this.state.filter,
            ""
          ),
          filter: ""
        });
      }
    }
  }

  removeFilter(filter) {
    var oldIds = this.state.newRelations.split(" ").slice(1);
    var newFilters = [];
    var newIds = "";
    oldIds.splice(this.state.postFilters.indexOf(filter), 1);
    oldIds.forEach(id => (newIds = newIds + " " + id));

    this.state.postFilters.forEach(a =>
      a !== filter ? newFilters.push(a) : ""
    );
    this.setState({ postFilters: newFilters, newRelations: newIds });
  }

  render() {
    if (this.state.loading) {
      return <div></div>;
    }

    return (
      <div className={styles.container}>
        <div className={!this.props.hideSettings ? styles.hide : styles.content}>
          <div>
            <div className={styles.mainHeader}>
              <h1>{postData.title}</h1>
            </div>
            <div className={styles.singlePostWrapper}>
              
            {postData.user ?
            <Link to={`/userpage/${postData.user}`}>
              <img
                alt="Exercise-it!"
                className={styles.iconLarge}
                src={
                  postData.userrole
                  ? professional
                  : amateur
                }
              /></Link> : 
              <div>
              <img
              alt="Exercise-it!"
              className={styles.iconLarge}
              src={anonym}
              /></div> }
              <div className={styles.title}>  
                <strong> {postData.user ? 
                  <Link to={`/userpage/${postData.user}`}>{postData.user}</Link>
                  : "Anonym"}
                  </strong>
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
              )}{" "}
              {this.state.editing ? (
                <div>
                  <input
                    name="filter"
                    className={
                      this.filterFound()
                        ? styles.inputMedium
                        : styles.inputMediumDisabled
                    }
                    placeholder={
                      window.location.href.split("?")[1] === "type=exercise"
                        ? "Finn muskelgrupper"
                        : "Finn øvelser"
                    }
                    value={
                      this.state.filter.charAt(0).toUpperCase() +
                      this.state.filter.slice(1)
                    }
                    onChange={change =>
                      this.setState({ filter: change.target.value })
                    }
                    onKeyPress={event =>
                      event.key === "Enter" ? this.addFilter() : ""
                    }
                  />
                  <button
                    className={
                      this.filterFound()
                        ? styles.buttonSmall
                        : styles.buttonSmallDisabled
                    }
                    onClick={() => this.addFilter()}
                  >
                    Velg
                  </button>
                  <button 
                        className={this.state.visibility ? styles.buttonVis : styles.button} 
                        onClick={() => this.setState({ visibility: !this.state.visibility })} >
                      {this.state.visibility ? "Synlig" : "Skjult"}
                  </button>
                </div>
              ) : (
                ""
              )}
              <div className={styles.rowSpace}>
                <div className={styles.row}>
                  {postData.exercises &&
                    postData.exercises
                      .filter(a => !this.state.removeRelations.includes(a))
                      .map((exercise) => (
                        <div
                          className={styles.filterListPost}
                          onClick={() =>
                            this.state.editing &&
                            this.setState({
                              removeRelations:
                                this.state.removeRelations + " " + exercise
                            })
                          }
                        >
                          {exercise}
                        </div>
                      ))}
                  {this.state.postFilters.length > 0
                    ? this.state.postFilters.map(filter => (
                        <div
                          className={styles.filterListPost}
                          onClick={() =>
                            this.state.editing && this.removeFilter(filter)
                          }
                        >
                          {filter}
                        </div>
                      ))
                    : ""}
                  {postData.musclegroups
                    .filter(a => !this.state.removeRelations.includes(a))
                    .map(workout => (
                      <div
                        className={styles.filterListPurple}
                        onClick={() =>
                          window.location.href.split("?")[1] ===
                            "type=exercise" &&
                          this.state.editing &&
                          this.setState({
                            removeRelations:
                              this.state.removeRelations + " " + workout
                          })
                        }
                      >
                        {workout}
                      </div>
                    ))}
                </div>
                <div>
                  {!this.state.editing ? (
                <button className= {styles.button} onClick={() => this.download()}>
                    Last ned 
                  </button>) : ''}
                {(this.props.user && this.props.user.username === postData.user) ||
                (this.props.user && this.props.user.username) === "admin" ? (
                  this.state.editing ? (
                    <div>
                    <div>
                      <button
                        className={styles.buttonSmall}
                        onClick={() => this.updatePost()}
                      >
                        Lagre
                      </button>
                      <button
                        className={styles.buttonSmall}
                        onClick={() => this.deletePost()}
                      >
                        Slett
                      </button>
                    </div>
                  </div>
                  ) : (
                    <button
                      className={styles.button}
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
          {!this.state.editing && this.props.user && postData.user !== this.props.user.username ? 
          <div className={styles.singlePostWrapper}>
          <div>  
              <strong>
              Vurdering og kommentar
              </strong>
              <div className={styles.rowSpace}>
              <textarea
                  value={this.state.comment}
                  className={styles.inputFieldMedium}
                  onChange={change =>
                    this.setState({ comment: change.target.value })
                  }
                />
              <div className={styles.col}>
              <Rating getRating={rating => this.setState({rating: rating})}/>
                <button
                  className={this.state.comment.length > 3 || this.state.rating ? styles.button : styles.buttonDisabled}
                  onClick={() => this.postFeedback()}
                >
                  Send inn
                </button>
              </div>
              </div>
              </div>
          </div> : ''}
          <div className={styles.footer}> Exercise.It © • est. 2020 </div>
        </div>
      </div>
    );
  }
}

export default PostLarge;
