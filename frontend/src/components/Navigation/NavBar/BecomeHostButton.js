import React, { NavLink } from "react";
import { useHistory } from "react-router-dom";
import "./BecomeHostButton.css"
import language from "./NavImages/language.svg"

function BecomeHostButton({ user, setLogin, setShowModal, setShowHostModal}) {
    const history = useHistory()
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
            <div className="language" onClick={() => {
                history.push('/comingsoon')
            }}>

                <img src={language} alt="language" />


                </div>
        </div>


  );
}

export default BecomeHostButton;
