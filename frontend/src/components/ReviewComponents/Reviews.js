import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { fetchAllReviews } from "../../store/reviews";
import stars from "../SpotDetailsPage/SpotDetailsPageImages/stars.svg";
import userIcon from "../Navigation/NavBarImages/user-icon.svg";

import "./Reviews.css";

function Reviews({ spot, reviews }) {
  const dispatch = useDispatch();
//   const reviews = useSelector((state) => state.reviews.reviews);



  useEffect(() => {

    dispatch(fetchAllReviews(spot.id))
  }, [dispatch, spot.id]);

  if (!reviews) {
    return (
      <div className="reviews-section">
        <div className="no-review-heading">
          <img src={stars} style={{ height: 16, width: 16 }} alt="star" />
          &nbsp;
          {"0"} · &nbsp;
          <span>No Reviews</span>
          <div className="write-review-button">Write a Review</div>
        </div>
      </div>
    );
  }
  const reviewsArray = Object.values(reviews)



    const array = [0, 1, 2, 3, 4, 5,];


    const convertToDate = (oldDate) => {
      if(oldDate){
          const date = oldDate.split("T")[0];
          const newDate = new Date(date);
          const convertedDate = newDate.toDateString();
          return convertedDate;
      }

      return null;
    };
  if (reviewsArray.length > 6) {return (
    <div className="reviews-section">

      <div className="review-heading">
        <img src={stars} style={{ height: 16, width: 16 }} alt="star" /> &nbsp;
        {spot?.avgStarRating} · &nbsp;
        <span>{spot?.numReviews} Reviews</span>
      <div className="write-review-button">Write a Review</div>
      </div>


      <div className="reviews">
        {reviews && array.map((id) => (
          <div key={id} className="review-container">
            <div className="review-box">
              <div className="review-info">
                <div className="user-review-profile-image">
                  <img src={userIcon} alt="user profile pic" />
                </div>
                <div className="name-date-container">
                  <div className="review-user-name">
                    {reviewsArray[id]?.User.firstName}
                  </div>
                  <div className="review-date">
                    {convertToDate(reviewsArray[id]?.createdAt)}
                  </div>
                </div>
              </div>
              <div className="review-description">{reviewsArray[id]?.review}</div>
            </div>
          </div>
        ))}
        <div className="show-all-reviews-button">
            Show All {reviewsArray.length} Reviews
        </div>

      </div>
    </div>
  );}
  else {
    return (
        <div className="reviews-section">
        <div className="review-heading">
          <img src={stars} style={{ height: 16, width: 16 }} alt="star" /> &nbsp;
          {spot?.avgStarRating} · &nbsp;
          <span>{spot?.numReviews} Reviews</span>
        </div>
        <div className="reviews">
          {reviewsArray && reviewsArray.map((review, id) => (
            <div key={id} className="review-container">
              <div className="review-box">
                <div className="review-info">
                  <div className="user-review-profile-image">
                    <img src={userIcon} alt="user profile pic" />
                  </div>
                  <div className="name-date-container">
                    <div className="review-user-name">
                      {review.User.firstName}
                    </div>
                    <div className="review-date">
                      {convertToDate(review.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="review-description">{review.review}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Reviews;
