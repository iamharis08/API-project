import React, { NavLink } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { clearSearchSpots } from "../../../store/spots";
import logo from "../NavBarImages/airbnbLogo.svg";
import "./Logo.css"


function Logo() {
  const history = useHistory()
  const dispatch = useDispatch()
  return (


        <div className="logo" onClick={() => dispatch(clearSearchSpots())}>
          <div id="logo-pic">
            <img src={logo} />
          </div>
          <div className="logo-text-container">
          <div id="logo-text">
            airbnbs
            </div>
          </div>

        </div>


  );
}

export default Logo;
