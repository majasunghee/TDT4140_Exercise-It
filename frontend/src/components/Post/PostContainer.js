import React from "react";
import styles from "../../App.module.css";
import anonym from "../../icons/anonym.png"
import professional from "../../icons/professional.png"
import amateur from "../../icons/amateur.png"

const PostContainer = props => {
  return (
    <div>
          <div className={styles.mainHeader}><h1>{props.post.title}</h1></div>
      <div className={styles.singlePostWrapper}>
      <img
            alt="Exercise-it!"
            className={
             styles.icon
            }
            src={props.user && props.user.username ? props.user.role ? professional : amateur : anonym}
          />
        <div>
        {props.post.user ? props.post.user.username : 'Anonym'} - {props.post.date}
        </div>
        <div className={styles.singlePostImage} style={{  
      backgroundImage: "url("+props.post.image.split('public/')[1]+")",
    }}/>
        <div>{props.post.content}</div>
      </div>
      {/* <div className={styles.kommentarer}>
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
      </div> */}
    </div>
  );
};

export default PostContainer;
