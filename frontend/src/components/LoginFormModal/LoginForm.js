import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./LoginForm.css";
import facebook from "./icons/facebook.svg"
import apple from "./icons/apple.svg"
import email from "./icons/email.png"
import google from "./icons/google.png"
import close from "./icons/close.svg"

function LoginForm({ setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

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
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
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
        Log in</div>
        </div>
      <div className="form-inputs">
        <div className="welcome-text">Welcome to Airbnbs</div>

        <form onSubmit={handleSubmit}>
          <ul className="errors-list">
            {Object.values(errors).map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>

          <label for="username">
            <input
              type="text"
              name="username"
              placeholder="Email address or username"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
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
            <div className="company-icon"><img src={email} alt="facebook" /></div>
            <div className="button-text" onClick={redirect}>Continue with email</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
