import React from "react";
import styles from "./settings.module.css";

const Info = () => {
    return (
        <div className={styles.container}>
        <div className={styles.content}>
            <div className={styles.mainHeader}>Exercise-It!</div>
            <div className={styles.text}>En aktiv side for deg som ønsker å dele trening og bli inspirert</div>
            <br />
            <div className={styles.text}>TDT4140 - Programvareutvikling, NTNU Våren 2020</div>
            <div className={styles.text}>Gruppe 62 - Maja, Solveig, Hedda, Aleksander, Aksel, Bendik, Jonas</div>
          </div>
        </div>
    );
}

export default Info;
