import React from "react";
import Header from "./components/Header/Header";
import Feed from "./components/Feed/Feed";
import PostContainer from "./components/Post/PostContainer";

import styles from "./App.module.css";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feed: true,
      post: {},
      light: true,
      newExercise: false,
      newWorkout: false,
    };
  }

  homeButton = () => {
    this.setState({ feed: true, newExercise: false, newWorkout: false });
  };

  render() {
    return (
      <div className={this.state.light ? styles.lightMode : ""}>
        <Header
          user={this.props.user}
          goHome={() => this.homeButton()}
          toggleTheme={() => this.setState({ light: !this.state.light })}
          login={() => this.props.onLogin()}
          light={this.state.light}
        />
        <div className={styles.container}>
          {this.state.feed ? (
            <Feed
              user={this.props.user}
              creatingNewExercise={this.state.newExercise}
              creatingNewWorkout={this.state.newWorkout}
              newExercise={() => this.setState({ newExercise: !this.state.newExercise })}
              newWorkout={() => this.setState({ newWorkout: !this.state.newWorkout })}
              singlePost={post => {
                this.setState({ feed: false, post: post });
              }}
              token={this.props.token}
            />
          ) : (
            <PostContainer user={this.props.user} post={this.state.post} />
          )}
        </div>
      </div>
    );
  }
}

export default Home;
