import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import { fetchAllReviews } from "../../store/reviews";
import stars from "../SpotDetailsPage/SpotDetailsPageImages/stars.svg";
import userIcon from "../Navigation/NavBarImages/user-icon.svg";
import ReviewForm from "./ReviewForm";
import "./Reviews.css";
import { Modal } from "../../context/Modal";
import DeleteReviewConfirmation from "./DeleteReviewConfirmation";
import AllReviewsModal from "./AllReviewsModal";
import LoginForm from "../LoginFormModal/LoginForm";

function Reviews({ isLoaded, spot, reviews, showWriteReviewsModal,setShowWriteReviewsModal, showDeleteReviewModal, setShowDeleteReviewModal }) {


  const [showAllReviewsModal, setShowAllReviewsModal] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch();

  //   const reviews = useSelector((state) => state.reviews.reviews);
    // const reviewIsSubmitted = review
    const user = useSelector((state) => state.session.user);
    // const reviewState = useSelector((state) => state.reviews.reviews)
    const reviewsArray = Object.values(reviews ? reviews : []);

    const deleteReviewId = reviewsArray.length ? reviewsArray.find(ele => ele.userId === user?.id)?.id : null

    const reviewExists = (reviews) => {

        // for(let reviewKey in reviews){
        //     let review = reviews[reviewKey];
        //     if(review.userId === user.id){
        //         return false
        //     }
        // }
        for (let i = 0; i < reviews?.length; i++) {
            let review = reviews[i]
            if (review?.userId === user?.id){
                return true
            }
        }
        return false
    }

const openLoginModel = () => {
  setShowModal(true)
}

    const handleDeleteClick = () => {
        setShowDeleteReviewModal(true)
    }
  const handleClick = () => {

    setShowWriteReviewsModal(true);
  };

  const handleAllReviewsClick = () => {
    setShowAllReviewsModal(true);
  };
  useEffect(() => {
    dispatch(fetchAllReviews(spot?.id));
  }, [dispatch, spot.id, user]);


  if (!reviews) {
    return (
      <div className="reviews-section">
        <div className="no-review-heading">
        <div className="review-details">
          <img src={stars} style={{ height: 16, width: 16 }} alt="star" />{" "}
          &nbsp;
          {spot?.avgStarRating} · &nbsp;
          <span>{spot?.numReviews} Reviews</span>
          </div>
          <div className="review-buttons">

          {isLoaded && user && (spot?.ownerId !== user?.id) && (!reviewExists(reviewsArray)) ? (
            (<div className="write-review-button" onClick={handleClick}>
              Write a Review
            </div>)
          ) : (reviewExists(reviewsArray) ? (<div className="delete-review-button" onClick={handleDeleteClick}> Delete Review
          </div>) : null)
         }
         {!user && (spot?.ownerId !== user?.id) && (!reviewExists(reviewsArray)) &&
          (<div className="write-review-button" onClick={openLoginModel}>
          Write a Review
        </div>)
        }
        {showModal && spot &&(
            <Modal onClose={() => setShowModal(false)}>
              <LoginForm
                setShowModal={setShowModal}
              />
            </Modal>
          )}
         </div>
          {showWriteReviewsModal && spot &&(
            <Modal onClose={() => setShowWriteReviewsModal(false)}>
              <ReviewForm
                spot={spot}
                user={user}
                setShowWriteReviewsModal={setShowWriteReviewsModal}
              />
            </Modal>
          )}

          {showDeleteReviewModal && (
            <Modal onClose={() => setShowDeleteReviewModal(false)}>
              <DeleteReviewConfirmation
                setShowDeleteModal={setShowDeleteReviewModal}
                spotId={spot.id}
                reviewId={deleteReviewId}
              />
            </Modal>
          )}
        </div>
      </div>
    );
  }


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
         <div className="review-details">
          <img src={stars} style={{ height: 16, width: 16 }} alt="star" />{" "}
          &nbsp;
          {spot?.avgStarRating} · &nbsp;
          <span>{spot?.numReviews} Reviews</span>
          </div>
          <div className="review-buttons">
          {isLoaded && user && (spot?.ownerId !== user?.id) && (!reviewExists(reviewsArray)) ? (
            (<div className="write-review-button" onClick={handleClick}>
              Write a Review
            </div>)
          ) : (reviewExists(reviewsArray) ? (<div className="delete-review-button" onClick={handleDeleteClick}> Delete Review
          </div>) : null)
         }
         {!user && (spot?.ownerId !== user?.id) && (!reviewExists(reviewsArray)) &&
          (<div className="write-review-button" onClick={openLoginModel}>
          Write a Review
        </div>)
        }
        {showModal && spot &&(
            <Modal onClose={() => setShowModal(false)}>
              <LoginForm
                setShowModal={setShowModal}
              />
            </Modal>
          )}
         </div>
          {showWriteReviewsModal && spot &&(
            <Modal onClose={() => setShowWriteReviewsModal(false)}>
              <ReviewForm
                spot={spot}
                user={user}
                setShowWriteReviewsModal={setShowWriteReviewsModal}
              />
            </Modal>
          )}

          {showDeleteReviewModal && (
            <Modal onClose={() => setShowDeleteReviewModal(false)}>
              <DeleteReviewConfirmation
                setShowDeleteModal={setShowDeleteReviewModal}
                spotId={spot.id}
                reviewId={deleteReviewId}
              />
            </Modal>
          )}
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
          <div className="show-all-reviews-button" onClick={handleAllReviewsClick}>
          Show All {reviewsArray.length} Reviews
          </div>
          {showAllReviewsModal && (
            <Modal onClose={() => setShowAllReviewsModal(false)}>
              <AllReviewsModal
                spot={spot}
                user={user}
                isLoaded={isLoaded}
                reviewsArray={reviewsArray}
                setShowAllReviewsModal={setShowAllReviewsModal}
              />
            </Modal>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="reviews-section">
        <div className="review-heading">
        <div className="review-details">
          <img src={stars} style={{ height: 16, width: 16 }} alt="star" />{" "}
          &nbsp;
          {spot?.avgStarRating} · &nbsp;
          <span>{spot?.numReviews} Reviews</span>
          </div>
          <div className="review-buttons">
          {isLoaded && user && (spot?.ownerId !== user?.id) && (!reviewExists(reviewsArray)) ? (
            (<div className="write-review-button" onClick={handleClick}>
              Write a Review
            </div>)
          ) : (reviewExists(reviewsArray) ? (<div className="delete-review-button" onClick={handleDeleteClick}> Delete Review
          </div>) : null)
         }
         {!user && (spot?.ownerId !== user?.id) && (!reviewExists(reviewsArray)) &&
          (<div className="write-review-button" onClick={openLoginModel}>
          Write a Review
        </div>)
        }
        {showModal && spot &&(
            <Modal onClose={() => setShowModal(false)}>
              <LoginForm
                setShowModal={setShowModal}
              />
            </Modal>
          )}
         </div>
          {showWriteReviewsModal && spot &&(
            <Modal onClose={() => setShowWriteReviewsModal(false)}>
              <ReviewForm
                spot={spot}
                user={user}
                setShowWriteReviewsModal={setShowWriteReviewsModal}
              />
            </Modal>
          )}

          {showDeleteReviewModal && (
            <Modal onClose={() => setShowDeleteReviewModal(false)}>
              <DeleteReviewConfirmation
                setShowDeleteModal={setShowDeleteReviewModal}
                spotId={spot.id}
                reviewId={deleteReviewId}
              />
            </Modal>
          )}
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
