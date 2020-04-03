import React, { Component } from "react";
import "./Login.css";
import { firebaseApp } from "../firebase";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { email: "", password: "" },
      guest: false
    };
  }
  
  componentDidMount() {
    console.log('login mounted')
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = e => {
    e.preventDefault();
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        // Handle Errors here.
        console.log(error);
        // ...
      });
      this.props.signIn();
  };

  signup = e => {
    e.preventDefault();
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(function(error) {
        // Handle Errors here.
        console.log(error);
        // ...
      });
      this.props.signIn();

  };

 

  render() {
    return (
      <div className="Login">
        <h1>ZenGarden</h1>
        <div className="LoginFormContainer">
          <p>
            Welcome! If you'd like to sign in to save favorites and add your own
            quotes, please create an account. Otherwise, continue as a guest.
          </p>
          <form>
            <span>
              <label htmlFor="email">Email</label>
              <input
                onChange={this.handleChange}
                type="email"
                name="email"
                placeholder="Your email"
              />
            </span>
            <span>
              <label htmlFor="password">Password</label>
              <input
                onChange={this.handleChange}
                type="password"
                name="password"
                placeholder="Your password"
              />
            </span>
            <span className="ButtonWrapper">
              <button type="submit" onClick={this.signup}>
                Sign Up
              </button>{" "}
              <button type="submit" onClick={this.login}>
                Log In
              </button>
            </span>
            <span className="GuestSpan">
              <p>Or, continue as a </p>
              <span className="GuestLogin" onClick={this.props.guestHandler}>
                guest
              </span>
            </span>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
