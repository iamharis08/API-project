import React, { useState } from "react";
// import * as sessionActions from '../../store/session';
import * as reviewsActions from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "../EditSpotFormModal/DeleteSpotConfirmation.css";

function DeleteReviewConfirmation({ setShowDeleteModal, spotId, reviewId }) {
    const [errors, setErrors] = useState([]);
    console.log("DELTEREVIEWID",reviewId)
  const history = useHistory()
  const dispatch = useDispatch();

  const handleClick = () => {
    setErrors({});
    return dispatch(reviewsActions.fetchDeleteReview(reviewId, spotId))
      .then(() => {
        setShowDeleteModal(false);
        history.push(`/spots/${spotId}`)
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };
  const mouseHandler = (e) => {
    // logic here

  };
  return (
    <div className="delete-confirmation">
      <div className="title">
        <div className="title-text">Delete Review</div>
      </div>
      <div className="delete-wrapper">
        <div className="delete-content">
          <div className="confirmation-message">
            Are you sure you want to delete your Review?
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

export default DeleteReviewConfirmation;
