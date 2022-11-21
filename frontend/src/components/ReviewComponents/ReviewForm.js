import React, { useState, useEffect } from "react";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCreateReview } from "../../store/reviews";
import "./Reviews.css"
import "../CreateSpotFormModal/CreateSpotForm.css";
import "../LoginFormModal/LoginForm.css";
import close from "../LoginFormModal/icons/close.svg";

function ReviewForm({ spot, user, setShowWriteReviewsModal }) {
  const dispatch = useDispatch();

  //   const sessionUser = useSelector(state => state.session.user);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState();
  const [errors, setErrors] = useState({});

  const closeModal = () => {
    setShowWriteReviewsModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const newReview = {
      review,
      stars,
    };
    return dispatch(fetchCreateReview(newReview, spot.id))
      .then(() => setShowWriteReviewsModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className="review-form-wrapper">
      <div className="heading-wrapper">
        <div className="login-heading">
          <div className="close-button" onClick={closeModal}>
            <img src={close} alt="close" />{" "}
          </div>
          Write a review
        </div>
      </div>
      <div className="review-form-inputs">
        <div className="welcome-text"> Write a Review for {spot.name}</div>
        <form onSubmit={handleSubmit}>
        <ul className="errors-list">
            {Object.values(errors).map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>

          <label>

            <input
              type="number"
              name="stars"
              placeholder="Give a Rating from 1 to 5"
              min='0'
              max='5'
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              required
            />
          </label>
          <label>

            <textarea
              type="text"
              name="description"
              value={review}
              placeholder= {`Write a Review for ${spot.name}`}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </label>
          <div className="button-container">
            <button className="login-button" type="submit" >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;
