import React from "react";
import Logo from "../../logo.png";
import styles from "../../App.module.css";

const Header = props => {
  return (
    <div className={styles.appHeader}>
      <div onClick={() => props.goHome()} className={styles.shiny}>
        <img alt="Exercise-it!" className={styles.logo} src={Logo} />
        <div className={styles.showoff} />
      </div>
      <div>
          <div className={styles.userText}>
           {props.user.username ? 'Hei '+props.user.username+'!' : 'Velkommen!'}
          </div>
        <div className={styles.buttonRow}>
          <div
            onClick={() => props.toggleTheme()}
            className={styles.headerButton}
          >
            {props.light ? "Mørkt tema" : "Lyst tema"}
          </div>
          <div onClick={() => props.login()} className={styles.headerButton}>
           {props.user.username ? 'Logg ut' : 'Logg inn'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
