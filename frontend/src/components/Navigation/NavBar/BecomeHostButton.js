import React, { NavLink } from "react";
import "./BecomeHostButton.css"


function BecomeHostButton() {
    const handleClick = (e) => {
        e.preventDefault();
        ;
      };
  return (


        <div className="become-host-wrapper">
            <div className="become-host-button">
                <span>Become a Host</span>
            </div>
        </div>


  );
}

export default BecomeHostButton;
