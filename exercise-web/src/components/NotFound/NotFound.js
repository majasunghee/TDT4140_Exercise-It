import React from "react";
import styles from "./notFound.module.css";

const NotFound = () => {
    return (
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.mainHeader}>404</div>
            <div className={styles.text}>Har du løpt feil vei?</div>
          </div>
        </div>
    );
}

export default NotFound;
