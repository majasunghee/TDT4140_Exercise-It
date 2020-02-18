import React from "react";
import styles from "../../App.module.css";

const PostContainer = props => {
  return (
    <div>
      <div className={styles.singlePostWrapper}>
        <div className={styles.title}>
          <strong>{props.post.title}</strong>
        </div>
        <div>
        {props.post.user ? props.post.user.username : 'Anonym'} - {props.post.date}
        </div>
        <img src={props.post.image.split('public')[1]} alt="Bilde" />
        <div>{props.post.content}</div>
      </div>
      <div className={styles.kommentarer}>
        <strong>Kommentar</strong>
        <div>
          <input placeholder="Skriv her" className={styles.inputField} />{" "}
          <button className={styles.button}>Send inn</button>{" "}
        </div>
        {props.post.kommentarer &&
          props.post.kommentarer.map(a => (
            <div className={styles.kommentar}>
              <strong>Brukernavn {a.username}</strong> - {a.kommentar}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostContainer;
