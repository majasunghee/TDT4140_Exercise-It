import React from "react";
import Header from "./Header";
import Feed from "./Feed";
import PostContainer from "./PostContainer";

import styles from "./App.module.css";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feed: true,
      post: {},
      light: false,
      publishing: false
    };
  }

  homeButton = () => {
    this.setState({ feed: true, publishing: false });
  };

  render() {
    return (
      <div className={this.state.light ? styles.lightMode : ""}>
        <Header
          name={this.props.state.name}
          goHome={() => this.homeButton()}
          toggleTheme={() => this.setState({ light: !this.state.light })}
          logout={() => this.props.onLogout()}
          light={this.state.light}
        />
        <div className={styles.container}>
          {this.state.feed ? (
            <Feed
              name={this.props.state.name}
              publishing={this.state.publishing}
              onPublishing={() => this.setState({ publishing: true })}
              singlePost={post => {
                this.setState({ feed: false, post: post });
              }}
            />
          ) : (
            <PostContainer post={this.state.post} />
          )}
        </div>
      </div>
    );
  }
}

export default Home;
