import React, { useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import CreateSpotFormModal from "../CreateSpotFormModal/index";
import "./Navigation.css";
import DropDown from "./NavBar/DropDownButton";
import LoginForm from "../LoginFormModal/LoginForm";
import SignupFormPage from "../SignupFormPage";
import { Modal } from "../../context/Modal";
import CreateSpotForm from "../CreateSpotFormModal/CreateSpotForm";
import Logo from "./NavBar/Logo.js";
import BecomeHostButton from "./NavBar/BecomeHostButton";

function Navigation({ isLoaded }) {
  const params = useParams();
  // const { spotId } = params;

  const { pathname } = useLocation();
  const spotId = (pathname) => pathname.split("/")[2];

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
    <header>
      <div className="nav-bar">
        <div
          className={
            pathname === `/spots/${spotId(pathname)}`
              ? "nav-container-spot-details"
              : "nav-container"
          }
        >
          <NavLink style={{ textDecoration: "none" }} exact to="/">
            <Logo />
          </NavLink>

          <div className="nav-buttons">
            {isLoaded && (
              <BecomeHostButton
                user={sessionUser}
                setLogin={setLogin}
                setShowModal={setShowModal}
                login={login}
              />
            )}
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
                  <CreateSpotForm setShowModal={setShowModal} />
                ) : (
                  <LoginForm setShowModal={setShowModal} />
                  
                )}
              </Modal>
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
    </header>
  );
}

export default Navigation;
