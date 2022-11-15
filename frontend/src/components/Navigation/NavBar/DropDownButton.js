import React from "react";
import dropDownMenuIcon from "../NavBarImages/DropDownMenuIcon.svg";
import userIcon from "../NavBarImages/user-icon.svg";
import "./DropDown.css";

function DropDown() {
  return (
    <div className="drop-down">
      <div className="drop-down-button">
        <div className="drop-down-icons">
          <div id='menu-icon-container'>
            <img id="menu-icon" src={dropDownMenuIcon} alt="menu" />
          </div>
          <div id="user-icon-container">
            <img id="user-icon" src={userIcon} alt="userIcon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropDown;
