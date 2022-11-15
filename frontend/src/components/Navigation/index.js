import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
import DropDown from "./NavBar/DropDownButton";
import LoginForm from "../LoginFormModal/LoginForm";
import SignupFormPage from "../SignupFormPage";
import { Modal } from "../../context/Modal";

import Logo from "./NavBar/Logo.js";
import BecomeHostButton from "./NavBar/BecomeHostButton";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState(true);

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = <ProfileButton user={sessionUser} />;
  // } else {
  //   sessionLinks = (
  //     <>
  //       <LoginFormModal />
  //       <NavLink to="/signup">Sign Up</NavLink>
  //     </>
  //   );
  // }

  return (
    <div className="nav-bar">
      <div className="nav-container">

          <NavLink style={{ textDecoration: "none" }} exact to="/">
            <Logo />
          </NavLink>


          <div className="nav-buttons">
        <BecomeHostButton />
        {isLoaded && (
          <ProfileButton
            user={sessionUser}
            setLogin={setLogin}
            setShowModal={setShowModal}
          />
        )}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            {login ? (
              <LoginForm setShowModal={setShowModal} />
            ) : (
              <SignupFormPage setShowModal={setShowModal} />
            )}
          </Modal>

          
        )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
