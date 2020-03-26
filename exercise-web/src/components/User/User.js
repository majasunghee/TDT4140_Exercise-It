import React from "react";
import styles from "./user.module.css";
import { userData } from "../../fetch/user";
import Post from "../Post/Post";
import SpinnerPost from "../Spinner/SpinnerPost";

import professional from "../../icons/professional.png";
import amateur from "../../icons/amateur.png";

import { Link } from "react-router-dom";

class UserPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      loading: true
    };
  }

  componentDidMount() {
    userData(this.props.user.username)
    .then(data => this.setState({ posts: data }))
    .then(() => this.setState({ loading: false }))
  }

  componentWillReceiveProps(newProps) {
    if (newProps.user.username) {
      userData(newProps.user.username)
      .then(data => this.setState({ posts: data }))
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
                  this.props.user.role
                    ? professional
                    : amateur
                }
              />
            </div>
          <div className={styles.personalia}>
            <p id={styles.Name}>
              {this.props.user.username}
            </p>
            <p>
              {this.props.user.role ? 'Profesjonell' : 'Amatør'}
            </p>
          </div>
          </div>
          </div>

          <div className={styles.statWrapper}>
            <div> 
              <p id={styles.stat}>
                {this.state.posts.length && this.state.posts[0].length}
              </p>
              <p id={styles.Hstat}>
                Øvelser
              </p>
            </div>
            <div>
              <p id={styles.stat}>
              {this.state.posts.length && this.state.posts[1].length}
              </p>
              <p id={styles.Hstat}>
                Økter
              </p>
            </div>
          </div>
          <div>
          {this.state.posts.length && this.state.posts[0].length ? (
          <div>
          <div className={styles.ContentSplitterWrapper}>
              <p>Mine økter</p>
              </div>
              <div className={styles.linje} />
              {this.state.posts.length && this.state.posts[1].map((post, i) => (
                this.buildPost(post, 'workout', i)
                ))}
          </div> ) : ''}
        {this.state.posts.length && this.state.posts[0].length ? (
        <div>
          <div className={styles.ContentSplitterWrapper}>
              <p>Mine øvelser</p>
            </div>
              <div className={styles.linje} />
              {this.state.posts.length && this.state.posts[0].map((post, i) => (
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
