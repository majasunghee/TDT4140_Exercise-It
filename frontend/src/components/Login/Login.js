import React from "react";
import Logo from "../../logo.png";
import Spinner from "../Spinner/Spinner";

import styles from "../../App.module.css";
import { registerUser, loginUser } from "../../actions/user";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      role: false,
      password: "",
      repeatPassword: "",
      register: false,
      error: false,
      loading: false
    };
  }

  buttonEnabled() {
    if (this.state.register) {
      return (
        this.state.username.length > 2 &&
        this.state.password.length > 4 &&
        this.state.password === this.state.repeatPassword &&
        this.state.email.includes("@") &&
        this.state.email.length > 6
      );
    } else {
      return this.state.username.length > 2 && this.state.password.length > 4;
    }
  }

  getUserFields() {
    return {
      username: `${this.state.username}`,
      email: `${this.state.email}`,
      role: `${this.state.role}`,
      visibility: `${"false"}`,
      password: `${this.state.password}`
    };
  }

  onChange = change =>
    this.setState({ [change.target.name]: change.target.value, error: false });

  authenticateUser() {
    this.setState({loading: true})
    if (this.state.register) {
      registerUser(this.getUserFields()).then(
        loginUser(this.getUserFields())
          .then(data => this.props.onAuth(data))
          .then(() => this.setState({ error: true }))
      );
    } else {
      loginUser(this.getUserFields())
        .then(data => this.props.onAuth(data))
        .then(() => this.setState({ error: true }));
    }
  }

  render() {
    return (
      <div className={styles.loginWrapper}>
        <div className={styles.loginLogoWrapper}>
          <img
            alt="Exercise-it!"
            className={
              !this.buttonEnabled()
                ? styles.loginLogo
                : styles.loginLogoActivated
            }
            src={Logo}
          />
        </div>
        <div className={styles.loginFormWrapper}>
        {this.state.loading ? (<div className={styles.loginForm}><Spinner /></div>) :
          (<div className={styles.loginForm}>
            <div
              className={styles.backButton}
              onClick={() => this.props.onCancel()}
            >
              Hopp over
            </div>
            {this.state.register ? <h2>Kom i gang!</h2> : <h2>Logg inn!</h2>}
            <h3> Brukernavn</h3>
            <input
              name="username"
              onChange={this.onChange}
              placeholder="Navn"
              className={styles.inputLogin}
            />
            {this.state.register ? (
              <div>
                <h3> E-post</h3>
                <input
                  name="email"
                  onChange={this.onChange}
                  placeholder="E-post"
                  className={styles.inputLogin}
                />
                {(!this.state.email.includes("@") ||
                  this.state.email.length <= 6) &&
                0 < this.state.email.length ? (
                  <div>E-post adressen er ikke gyldig!</div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
            <h3> Passord</h3>
            <input
              name="password"
              onChange={this.onChange}
              placeholder="Passord"
              type="password"
              className={styles.inputLogin}
              onKeyPress={event =>
                event.key === "Enter" ? this.authenticateUser() : ""
              }
            />
            {this.state.register ? (
              <div>
                <h3> Gjenta passord</h3>
                <input
                  name="repeatPassword"
                  onChange={this.onChange}
                  placeholder="Passord"
                  type="password"
                  onKeyPress={event =>
                    event.key === "Enter" ? this.authenticateUser() : ""
                  }
                  className={styles.inputLogin}
                />
                {this.state.repeatPassword.length > 0 &&
                this.state.password !== this.state.repeatPassword ? (
                  <div>Passordene stemmer ikke overens!</div>
                ) : (
                  ""
                )}{" "}
              </div>
            ) : (
              ""
            )}
            {this.state.register ? (
              <div>
                <h3> Min rolle</h3>
                <div>
                  <button
                    onClick={() => this.setState({ role: false })}
                    className={
                      !this.state.role ? styles.toggleTrue : styles.toggleFalse
                    }
                  >
                    Hobbytrening
                  </button>
                  <button
                    onClick={() => this.setState({ role: true })}
                    className={
                      this.state.role ? styles.toggleTrue : styles.toggleFalse
                    }
                  >
                    Treningsekspert
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
            <div>
              <button
                disabled={!this.buttonEnabled()}
                onClick={() => this.authenticateUser()}
                className={
                  this.buttonEnabled()
                    ? styles.buttonRegister
                    : styles.buttonRegisterDisabled
                }
              >
                Fortsett
              </button>
              <button
                onClick={() => {
                  this.setState({ register: !this.state.register });
                }}
                className={styles.link}
              >
                {this.state.register ? "Jeg har bruker" : "Registrer deg"}
              </button>
            </div>
            {this.state.error ? (
              <div className={styles.error}>Noe gikk galt..</div>
            ) : (
              ""
            )}
          </div>)}
        </div>
      </div>
    );
  }
}

export default Login;
