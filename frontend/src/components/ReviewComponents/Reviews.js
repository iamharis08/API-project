import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { fetchAllReviews } from "../../store/reviews";
import stars from "../SpotDetailsPage/SpotDetailsPageImages/stars.svg";
import userIcon from "../Navigation/NavBarImages/user-icon.svg";

import "./Reviews.css";

function Reviews({ spot }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  if (reviews) {
    console.log(reviews);
  }

  const convertToDate = (oldDate) => {
    const date = oldDate.split("T")[0];
    const newDate = new Date(date);
    const convertedDate = newDate.toDateString();
    return convertedDate;
  };
  useEffect(() => {
    dispatch(fetchAllReviews(spot?.id));
  }, [dispatch]);

  if (!reviews) {
    return (
      <div className="reviews-section">
        <div className="review-heading">
          <img src={stars} style={{ height: 16, width: 16 }} alt="star" />
          &nbsp;
          {"0"} · &nbsp;
          <span>No Reviews</span>
        </div>
      </div>
    );
  }

  return (
    <div className="reviews-section">
      <div className="review-heading">
        <img src={stars} style={{ height: 16, width: 16 }} alt="star" /> &nbsp;
        {spot?.avgStarRating} · &nbsp;
        <span>{spot?.numReviews} Reviews</span>
      </div>
      <div className="reviews">
        {Object.values(reviews).map((review) => (
          <div key={review.id} className="review-container">
            <div className="review-box">
              <div className="review-info">
                <div className="user-review-profile-image">
                  <img src={userIcon} alt="user profile pic" />
                </div>
                <div className="review-user-name">{review.User.firstName}</div>
                <div className="review-date">
                  {convertToDate(review.createdAt)}
                </div>
              </div>
              <div className="review-description">{review.review}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;
