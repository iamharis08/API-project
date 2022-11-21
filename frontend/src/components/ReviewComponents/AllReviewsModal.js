import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { fetchAllReviews } from "../../store/reviews";
import stars from "../SpotDetailsPage/SpotDetailsPageImages/stars.svg";
import userIcon from "../Navigation/NavBarImages/user-icon.svg";
import ReviewForm from "./ReviewForm";
import "./Reviews.css";
import { Modal } from "../../context/Modal";
import DeleteReviewConfirmation from "./DeleteReviewConfirmation";
import close from "../LoginFormModal/icons/close.svg"
function AllReviewsModal({ isLoaded, user, spot, reviewsArray, setShowAllReviewsModal }) {


  const dispatch = useDispatch();




    const deleteReviewId = reviewsArray.length ? reviewsArray.find(ele => ele.userId === user?.id)?.id : null

    const reviewExists = (reviews) => {


        for (let i = 0; i < reviews?.length; i++) {
            let review = reviews[i]
            if (review?.userId === user?.id){
                return true
            }
        }
        return false
    }

    const closeModal = () => {
        setShowAllReviewsModal(false)
    }

  const convertToDate = (oldDate) => {
    if (oldDate) {
      const date = oldDate.split("T")[0];
      const newDate = new Date(date);
      const convertedDate = newDate.toDateString();
      return convertedDate;
    }

    return null;
  };

    return (
    <div className="all-reviews-modal">
      <div className="modal-reviews-section">
        <div className="all-reviews-heading">
            <div className="close-button" onClick={closeModal}><img src={close} alt="close" /> </div>
            <div className="review-title-text">
            All Reviews for <span>{spot.name}</span>
         </div>
         <div className="all-review-details">
          <img src={stars} style={{ height: 16, width: 16 }} alt="star" />{" "}
          &nbsp;
          {spot?.avgStarRating} · &nbsp;
          <span>{spot?.numReviews} Reviews</span>
          </div>


        </div>

        <div className="reviews">
          {reviewsArray.length &&
            reviewsArray.map((review, id) => (
              <div key={id} className="review-container">
                <div className="all-reviews-box">
                  <div className="review-info">
                    <div className="user-review-profile-image">
                      <img src={userIcon} alt="user profile pic" />
                    </div>
                    <div className="name-date-container">
                      <div className="review-user-name">
                        {review?.User.firstName}
                      </div>
                      <div className="review-date">
                        {convertToDate(review?.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="review-description">
                    {review?.review}
                  </div>
                </div>
              </div>
            ))}

        </div>
      </div>
      </div>
    );
  }


export default AllReviewsModal;
