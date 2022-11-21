import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import "../LoginFormModal/LoginForm.css"
import facebook from "../LoginFormModal/icons/facebook.svg"
import apple from "../LoginFormModal/icons/apple.svg"
import emailIcon from "../LoginFormModal/icons/email.png"
import google from "../LoginFormModal/icons/google.png"
import close from "../LoginFormModal/icons/close.svg"

function SignupFormPage({ setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const closeModal = (e) => {
    e.preventDefault();
    setShowModal(false)
  }
  const redirect = (e) => {
    e.preventDefault();
    history.push('/comingsoon')
    setShowModal(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({
          firstName,
          lastName,
          email,
          username,
          password,
        })
      )
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  const loginDemo = () => {
    return dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    ).then(() => setShowModal(false));
  };

  return (
    <div className="form-wrapper">
      <div className="heading-wrapper">
      <div className="login-heading">
        <div className="close-button" onClick={closeModal}><img src={close} alt="close" /> </div>
        Sign up</div>
        </div>
      <div className="form-inputs">
        <div className="welcome-text">Welcome to Airbnbs</div>

    <form onSubmit={handleSubmit}>
    <ul className="errors-list">
            {Object.values(errors).map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
      <label for="firstName">

        <input
          type="text"
          name="firstName"
          placeholder="Fist Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label >
      <label for="lastName">

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label for="email">

        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label for="signupUsername">

        <input
          type="text"
          name="signUpsername"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label for="signUpPassword">

        <input
          type="password"
          name="signUpPassword"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label for="confirm">

        <input
          type="password"
          name="confirm"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <div className="button-container">
            <div className="login-button" type="submit" onClick={handleSubmit}>
              Continue
            </div>
          </div>
          {/* <button type="submit">Log In</button> */}
        </form>
        <div className="login-demo-button-container">
          <div className="login-demo-button" onClick={loginDemo}>
            Login as Demo User
          </div>
          <div className="or-container">

          <div className="or-text"><div className="line-one"></div> or <div className="line-two"></div></div>
          </div>
        </div>
        <div className="extra-login-buttons">
          <div className="other-login-buttons">
            <div className="company-icon">
              <img src={facebook} alt="facebook" />
            </div>
            <div className="button-text" onClick={redirect}>Continue with Facebook</div>
          </div>
          <div className="other-login-buttons">
            <div className="company-icon">
            <img src={google} id="google" alt="google" />
            </div>
            <div className="button-text" onClick={redirect}>Continue with Google</div>
          </div>
          <div className="other-login-buttons">
            <div className="company-icon"><img src={apple} id="apple" alt="facebook" /></div>
            <div className="button-text" onClick={redirect}>Continue with Apple</div>
          </div>
          <div className="other-login-buttons">
            <div className="company-icon"><img src={emailIcon} alt="facebook" /></div>
            <div className="button-text" onClick={redirect}>Continue with email</div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default SignupFormPage;
