import React from "react";
import styles from "./post.module.css";

const PostSmall = props => {
  return (
    <div className={styles.postWrapperSmall} style={{  
      backgroundImage: "url("+props.image.split('public/')[1]+")",
    }}>
      <div className={styles.title}>
        <strong>{props.title}</strong> <div className={styles.subtitle}>
        <strong>Øvelse</strong>
      </div>
      </div>
    </div>
  );
};

export default PostSmall;
