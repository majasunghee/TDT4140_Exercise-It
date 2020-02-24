import React from "react";
import styles from "../../App.module.css";
import anonym from "../../icons/anonym.png"
import professional from "../../icons/professional.png"
import amateur from "../../icons/amateur.png"

const Post = props => {
  console.log(props.image)
  return (
    <div className={styles.postWrapper}>
           <img
            alt="Exercise-it!"
            className={
             styles.icon
            }
            src={props.user && props.user.username ? props.user.role ? professional : amateur : anonym}
          />
          <div className={styles.title}>
        <strong>{props.title}</strong>
        <div className={styles.subtitle}><strong>Treningsøkt</strong></div>
      </div>
      <div className={styles.description}>
       {props.user ? 'Av ' + props.user.username : 'Anonym'} - {props.date}
      </div>
      <div className={styles.postImage} style={{  
      backgroundImage: "url("+props.image.split('public/')[1]+")",
    }}><div className={styles.gradient}/></div>
      <div>{props.content.slice(0, 210)}..</div>
    </div>
  );
};

export default Post;
