import React, { useState } from "react";
import dropDownMenuIcon from "../NavBarImages/DropDownMenuIcon.svg";
import userIcon from "../NavBarImages/user-icon.svg";
import "./DropDown.css";

function DropDown({ openMenu }) {
  const [hover, setHover] = useState(false);

  return (
    <div className="drop-down">
      <div
        className={hover ? "drop-down-button-hover":"drop-down-button"}
        onClick={openMenu}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
      
        <div className="drop-down-icons">
          <div id="menu-icon-container">
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
