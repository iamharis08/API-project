import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { fetchAllReviews } from "../../store/reviews";
import stars from "../SpotDetailsPage/SpotDetailsPageImages/stars.svg";
import userIcon from "../Navigation/NavBarImages/user-icon.svg";
import ReviewForm from "./ReviewForm";
import "./Reviews.css";
import { Modal } from "../../context/Modal";

function Reviews({ spot, reviews, user, showWriteReviewsModal,setShowWriteReviewsModal }) {
  const dispatch = useDispatch();
  console.log(user, spot,"-----------", reviews)
  //   const reviews = useSelector((state) => state.reviews.reviews);
    // const reviewIsSubmitted = review
    const reviewExists = (reviews) => {
        {for(let reviewKey in reviews){
            let review = reviews[reviewKey];
            if(review.userId === user.id){
                return false
            }
        }}
        return true
    }
  const handleClick = () => {
    setShowWriteReviewsModal(true);
  };
  useEffect(() => {
    dispatch(fetchAllReviews(spot?.id));
  }, [dispatch, spot.id]);

  if (!reviews) {
    return (
      <div className="reviews-section">
        <div className="no-review-heading">
          <img src={stars} style={{ height: 16, width: 16 }} alt="star" />
          &nbsp;
          {"0"} · &nbsp;
          <span>No Reviews</span>
          {(spot.ownerId !== user.id) && (reviewExists(reviews)) ? (
            <div className="write-review-button" onClick={handleClick}>
              Write a Review
            </div>
          ) : null}
          {showWriteReviewsModal && spot &&(
            <Modal onClose={() => setShowWriteReviewsModal(false)}>
              <ReviewForm
                spot={spot}
                user={user}
                setShowWriteReviewsModal={setShowWriteReviewsModal}
              />
            </Modal>
          )}
        </div>
      </div>
    );
  }
  const reviewsArray = Object.values(reviews);

  const array = [0, 1, 2, 3, 4, 5];

  const convertToDate = (oldDate) => {
    if (oldDate) {
      const date = oldDate.split("T")[0];
      const newDate = new Date(date);
      const convertedDate = newDate.toDateString();
      return convertedDate;
    }

    return null;
  };
  if (reviewsArray.length > 6) {
    return (
      <div className="reviews-section">
        <div className="review-heading">
          <img src={stars} style={{ height: 16, width: 16 }} alt="star" />{" "}
          &nbsp;
          {spot?.avgStarRating} · &nbsp;
          <span>{spot?.numReviews} Reviews</span>
          {(spot.ownerId !== user.id) && (reviewExists(reviews)) ? (
            <div className="write-review-button" onClick={handleClick}>
              Write a Review
            </div>
          ) : null}
          {showWriteReviewsModal && (
            <Modal onClose={() => setShowWriteReviewsModal(false)}>
              <ReviewForm
                spot={spot}
                user={user}
                setShowWriteReviewsModal={setShowWriteReviewsModal}
              />
            </Modal>)}
        </div>

        <div className="reviews">
          {reviews &&
            array.map((id) => (
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
                  <div className="review-description">
                    {reviewsArray[id]?.review}
                  </div>
                </div>
              </div>
            ))}
          <div className="show-all-reviews-button">
            Show All {reviewsArray.length} Reviews
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="reviews-section">
        <div className="review-heading">
          <img src={stars} style={{ height: 16, width: 16 }} alt="star" />{" "}
          &nbsp;
          {spot?.avgStarRating} · &nbsp;
          <span>{spot?.numReviews} Reviews</span>
          {(spot.ownerId !== user.id) && (reviewExists(reviews)) ? (
            <div className="write-review-button" onClick={handleClick}>
              Write a Review
            </div>
          ) : null}
                {showWriteReviewsModal && (
            <Modal onClose={() => setShowWriteReviewsModal(false)}>
              <ReviewForm
                spot={spot}
                user={user}
                setShowWriteReviewsModal={setShowWriteReviewsModal}
              />
            </Modal>)}
        </div>
        <div className="reviews">
          {reviewsArray &&
            reviewsArray.map((review, id) => (
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
    );
  }
}

export default Reviews;
