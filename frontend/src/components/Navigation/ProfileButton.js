import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";
import * as sessionActions from "../../store/session";
import DropDown from "./NavBar/DropDownButton.js";
import "./Navigation.css";

function ProfileButton({ user, setLogin, setShowModal }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { pathname } = useLocation();
  const spotId = (pathname) =>  pathname.split('/')[2]


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      {/* <button onClick={openMenu}> */}
      {/* <i className="fas fa-user-circle" /> */}
      {/* </button> */}

      <DropDown openMenu={openMenu} />

      {showMenu &&
        (user ? (

          <div className= {pathname === `/spots/${spotId(pathname)}` ? "profile-dropdown-container-spot-details" : "profile-dropdown-container"}>
            <ul className="profile-dropdown">
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </ul>
          </div>
        ) : (
          <div className= {pathname === `/spots/${spotId(pathname)}` ? "profile-dropdown-container-spot-details" : "profile-dropdown-container"}>
            <ul className="profile-dropdown">
            <li>
                <div id="signup-button"
                  onClick={() => {
                    setLogin(false);
                    setShowModal(true);
                  }}
                >
                  Sign Up
                </div>
              </li>
              <li>
                <div id="login-button"
                  onClick={() => {
                    setLogin(true);
                    setShowModal(true);
                  }}
                >
                  Log In
                </div>
              </li>

            </ul>
          </div>
        ))}
    </>
  );
}

export default ProfileButton;
