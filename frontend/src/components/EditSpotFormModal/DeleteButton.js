import React, { useState } from "react";
// import * as sessionActions from '../../store/session';
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "../SpotDetailsPage/SpotDetails.css";

function DeleteButton() {
  const handleClick = (e) => {
    e.preventDefault();
    // if (user){
    //     setShowHostModal(true)
    // }else {
    //     setLogin(true)
    //     setShowModal(true)
    // }
  };
  return (
    <div className="delete-spot-button" onClick={handleClick}>
      Delete
    </div>
  );
}

export default DeleteButton;
