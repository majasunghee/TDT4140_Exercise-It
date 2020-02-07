import React from "react";
import Logo from "./logo.png";

import styles from "./App.module.css";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      role: "hobby"
    };
  }

  render() {
    return (
      <div className={styles.loginWrapper}>
        <div className={styles.tag}>ALPHA 0.1</div>
        <div className={styles.loginLogoWrapper}>
          <img alt="Exercise-it!" className={styles.loginLogo} src={Logo} />
        </div>
        <div className={styles.loginFormWrapper}>
          <div className={styles.loginForm}>
            <h2>Kom i gang!</h2>
            <h3> Mitt navn</h3>
            <input
              onChange={change => this.setState({ name: change.target.value })}
              placeholder="Navn"
              className={styles.inputLogin}
            />
            <h3> Min rolle</h3>
            <div>
              <button
                onClick={() => this.setState({ role: "hobby" })}
                className={
                  this.state.role === "hobby"
                    ? styles.toggleTrue
                    : styles.toggleFalse
                }
              >
                Hobbytrening
              </button>
              <button
                onClick={() => this.setState({ role: "ekspert" })}
                className={
                  this.state.role === "ekspert"
                    ? styles.toggleTrue
                    : styles.toggleFalse
                }
              >
                Treningsekspert
              </button>
            </div>
            <button
              onClick={() => {
                this.state.name.length > 2 &&
                  this.props.onRegister(this.state.name, this.state.role);
              }}
              className={
                this.state.name.length > 2
                  ? styles.buttonRegister
                  : styles.buttonRegisterDisabled
              }
            >
              Fortsett
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
