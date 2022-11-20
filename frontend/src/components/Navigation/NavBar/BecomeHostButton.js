import React, { NavLink } from "react";
import "./BecomeHostButton.css"


function BecomeHostButton({ user, setLogin, setShowModal, setShowHostModal}) {
    const handleClick = (e) => {
        e.preventDefault();
        if (user){
            setShowHostModal(true)
        }else {
            setLogin(true)
            setShowModal(true)
        }


      };
  return (


        <div className="become-host-wrapper">
            <div className="become-host-button" onClick={handleClick}>
                <span>Airbnbs your home</span>
            </div>
        </div>


  );
}

export default BecomeHostButton;
