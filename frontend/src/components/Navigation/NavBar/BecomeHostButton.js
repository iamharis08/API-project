import React, { NavLink } from "react";
import "./BecomeHostButton.css"


function BecomeHostButton({ user, setLogin, setShowModal}) {
    const handleClick = (e) => {
        e.preventDefault();
        setShowModal(true)
      };
  return (


        <div className="become-host-wrapper">
            <div className="become-host-button" onClick={handleClick}>
                <span>Become a Host</span>
            </div>
        </div>


  );
}

export default BecomeHostButton;
