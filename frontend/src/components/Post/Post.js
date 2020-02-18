import React from "react";
import styles from "../../App.module.css";

const Post = props => {
  return (
    <div className={styles.postWrapper}>
      <div className={styles.title}>
        <strong>{props.title}</strong>
        <div className={styles.subtitle}><strong>Treningsøkt</strong></div>
      </div>
      <div>
       {props.user ? 'Av' + props.user.username : 'Anonym'} - {props.date}
      </div>
      <img src={props.image.split('public')[1]} alt="Bilde" />
      <div>{props.content.slice(0, 80)}..</div>
    </div>
  );
};

export default Post;
