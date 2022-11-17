import React, { useState } from "react";
// import * as sessionActions from '../../store/session';
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./DeleteSpotConfirmation.css";

function DeleteSpotConfirmation({ setShowDeleteModal, spotId, spot }) {
    const [errors, setErrors] = useState([]);

  const history = useHistory()
  const dispatch = useDispatch();

  const handleClick = () => {
    setErrors({});
    return dispatch(spotsActions.fetchDeleteSpot(spotId))
      .then(() => {
        setShowDeleteModal(false);
        history.push('/')
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };
  const mouseHandler = (e) => {
    // logic here
    let noBtn = document.getElementById("no-button");

    noBtn.onmousemove = function (e) {
      let rect = e.target.getBoundingClientRect();
      let x = e.clientX - rect.left;
      noBtn.style.setProperty("--x", x + "px");
    };
    noBtn.onmouseleave = function (e) {
      let rect = e.target.getBoundingClientRect();
      let x = 140;
      noBtn.style.setProperty("--x", x + "px");
    };

    let yesBtn = document.getElementById("yes-button");

    yesBtn.onmousemove = function (e) {
      let rect = e.target.getBoundingClientRect();
      let x = e.clientX - rect.left;
      yesBtn.style.setProperty("--x", x + "px");
    };
    yesBtn.onmouseleave = function (e) {
      let rect = e.target.getBoundingClientRect();
      let x = 140;
      yesBtn.style.setProperty("--x", x + "px");
    };
  };
  return (
    <div className="delete-confirmation">
      <div className="title">
        <div className="title-text">Delete Spot</div>
      </div>
      <div className="delete-wrapper">
        <div className="delete-content">
          <div className="confirmation-message">
            Are you sure you want to delete your spot?
          </div>
          <div className="buttons">
            <div
              id="yes-button"
              onMouseOver={mouseHandler}
              onClick={handleClick}
            >
              Yes
            </div>
            <div
              id="no-button"
              onMouseOver={mouseHandler}
              onClick={() => setShowDeleteModal(false)}
            >
              No
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteSpotConfirmation;
