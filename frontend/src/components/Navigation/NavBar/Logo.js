import React, { NavLink } from "react";
import logo from "../NavBarImages/airbnbLogo.svg";
import "./Logo.css"
function Logo() {
  return (


        <div className="logo">
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
