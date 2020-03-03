import React from "react";
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
    this.setState({ loading: true });
    if (this.state.register) {
      registerUser(this.getUserFields()).then(res => res ?
        loginUser(this.getUserFields())
          .then(data => this.props.onAuth(data))
          .then(() => this.setState({ error: true })) : this.setState({ error: true, loading: false })
      );
    } else {
      loginUser(this.getUserFields())
        .then(data => this.props.onAuth(data))
        .then(res => !res && this.setState({ error: true, loading: false }));
    }
  }

  render() {
    return (
      <div className={styles.loginWrapper}>
        <div className={styles.loginLogoWrapper}>
          <div className={styles.hero}>
            <div className={styles.bannerPurple}>
              <div className={styles.antiHero}>
                <div className={styles.loginHeader}>Exercise.it!</div>
                <div>En aktiv side for deg som ønsker </div>
                <div>å dele trening og bli inspirert</div>
              </div>
            </div>
          </div>
          <div className={styles.hero2}>
            <div className={styles.bannerOrange} />
          </div>
        </div>
        <div className={styles.loginFormWrapper}>
          {this.state.loading ? (
            <div className={styles.loginForm}>
              <Spinner />
            </div>
          ) : (
            <div className={styles.loginForm}>
              {this.state.register ? (
                <div className={styles.loginSubheader}>Kom i gang!</div>
              ) : (
                <div className={styles.loginSubheader}>Logg inn</div>
              )}
              <input
                name="username"
                spellcheck="false"
                onChange={this.onChange}
                placeholder="Brukernavn"
                className={styles.inputLogin}
              />
              {this.state.register ? (
                <div>
                  <input
                  spellcheck="false"
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
                  <input
                    name="repeatPassword"
                    onChange={this.onChange}
                    placeholder="Gjenta passord"
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
                  <div>
                    <button
                      onClick={() => this.setState({ role: false })}
                      className={
                        !this.state.role
                          ? styles.toggleTrue
                          : styles.toggleFalse
                      }
                    >
                      Amatør
                    </button>
                    <button
                      onClick={() => this.setState({ role: true })}
                      className={
                        this.state.role ? styles.toggleTrue : styles.toggleFalse
                      }
                    >
                      Profesjonell
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
                      ? styles.buttonLogin
                      : styles.buttonLoginDisabled
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
                <button
                  className={styles.link}
                  onClick={() => this.props.onCancel()}
                >
                  Hopp over
                </button>
                {this.state.error ? (
                  this.state.register ? <div className={styles.error}>Ugyldig brukerinfo..</div> :
                <div className={styles.error}>Feil navn eller passord..</div>
              ) : (
                ""
              )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
