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
import SearchBar from "./NavBar/SearchBar";

function Navigation({ isLoaded }) {
  const params = useParams();
  // const { spotId } = params;

  const { pathname } = useLocation();
  const spotId = (pathname) => pathname.split("/")[2];

  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);
  const [showHostModal, setShowHostModal] = useState(false);
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
            pathname === `/`
            // pathname === `/spots/${spotId(pathname)}`
              ? "nav-container"
              : "nav-container-spot-details"
          }
        >
          <NavLink style={{ textDecoration: "none" }} exact to="/">
            <Logo />
          </NavLink>

          <SearchBar />

          <div className="nav-buttons">
            {isLoaded && (
              <BecomeHostButton
                user={sessionUser}
                setLogin={setLogin}
                setShowHostModal={setShowHostModal}
                setShowModal={setShowModal}

              />
            )}
            {isLoaded && (
              <ProfileButton
                user={sessionUser}
                setLogin={setLogin}
                setShowModal={setShowModal}
                setShowHostModal={setShowHostModal}
              />
            )}

            {showHostModal && (
              <Modal onClose={() => setShowHostModal(false)}>
                  <CreateSpotForm setShowHostModal={setShowHostModal} showHostModal={showHostModal} />
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
