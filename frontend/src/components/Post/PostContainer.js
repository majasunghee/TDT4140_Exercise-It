import React from "react";
import styles from "../../App.module.css";
import anonym from "../../icons/anonym.png";
import professional from "../../icons/professional.png";
import amateur from "../../icons/amateur.png";
import Settings from "../Settings/Settings"

import {getSingleWorkout} from "../../actions/workouts";

var postData = '';

class PostContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.getPost();
    window.scrollTo(0, 0);
    this.props.setRoute();
  }
  
  getPost() {
    const formdata = new FormData();
    formdata.append('id', window.location.href.split("posts/")[1]);
    
   getSingleWorkout(formdata).then(data => postData = data).then(() => this.setState({loading: false}));
  }

  render() {
  
  if (this.state.loading) {
    return <div></div>
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
          <strong>
            {postData.user ? postData.user : "Anonym"}
          </strong>
        </div>
        <div className={styles.description}>{postData.date}</div>
        <img
          alt="Bilde"
          className={styles.singlePostImage}
          src={
             (postData.image).toString().split("public")[1] 
          }
        />
        <div>{postData.content}</div>
      </div>
      {/* <div className={styles.kommentarer}>
        <strong>Kommentar</strong>
        <div>
          <input placeholder="Skriv her" className={styles.inputField} />{" "}
          <button className={styles.button}>Send inn</button>{" "}
        </div>
        {postData.kommentarer &&
          postData.kommentarer.map(a => (
            <div className={styles.kommentar}>
              <strong>Brukernavn {a.username}</strong> - {a.kommentar}
            </div>
          ))}
      </div> */}
    </div></div></div>
  ); }
};

export default PostContainer;
