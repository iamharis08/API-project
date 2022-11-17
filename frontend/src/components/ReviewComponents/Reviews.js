import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { fetchAllReviews } from "../../store/reviews";
import stars from "../SpotDetailsPage/SpotDetailsPageImages/stars.svg";
import "./Reviews.css";
function Reviews({ spot }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);

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
      <div className="reviews">{
        
      }</div>
    </div>
  );
}

export default Reviews;
