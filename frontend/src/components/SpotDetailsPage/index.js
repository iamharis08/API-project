import React, { useState, useEffect } from "react";
import {
  Redirect,
  useHistory,
  NavLink,
  useParams,
  Link,
} from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { fetchSpot } from "../../store/spots";
import stars from "./SpotDetailsPageImages/stars.svg";
import checkin from "./SpotDetailsPageImages/check-in.svg";
import location from "./SpotDetailsPageImages/location.svg";
import calender from "./SpotDetailsPageImages/calender.svg";
import offers from "./SpotDetailsPageImages/airbnboffers.jpg";

import EditButton from "../EditSpotFormModal/EditButton";
import DeleteButton from "../EditSpotFormModal/DeleteButton";
import { Modal } from "../../context/Modal";
import EditSpotForm from "../EditSpotFormModal/EditSpotForm";
import DeleteSpotConfirmation from "../EditSpotFormModal/DeleteSpotConfirmation";
import "./SpotDetails.css";
import Reviews from "../ReviewComponents/Reviews";
import DeleteReviewConfirmation from '../ReviewComponents/DeleteReviewConfirmation'
import { fetchAllReviews } from "../../store/reviews";

function SpotDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const { spotId } = params;

  const spot = useSelector((state) => state.spots.spot);

  const sessionUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.reviews.reviews)
  const [login, setLogin] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showWriteReviewsModal, setShowWriteReviewsModal] = useState(false)

  const spotImages = spot?.SpotImages;
  const array = [0, 1, 2, 3, 4];
  useEffect(() => {
    dispatch(fetchSpot(spotId));

    // dispatch(fetchAllReviews(spotId))
  }, [dispatch]);

  if (!spotImages || !spot) {
    return null;
  }
  return (
    <div className="spot-details">
      <div className="spot-details-container">
        <div className="spot-headings">
          <div className="spot-info-wrapper">
            <div className="spot-name">
              <h1> {spot?.name} </h1>
            </div>
            <div className="spot-sub-info">
              <img src={stars} alt="stars" /> {spot?.avgStarRating} ·{" "}
              <span>{spot?.numReviews} Reviews</span>&nbsp; · &nbsp;
              <span>
                {spot?.city}, {spot?.state}, {spot?.country}
              </span>
            </div>
          </div>
          {sessionUser && spot.Owner.id === sessionUser.id && (
            <EditButton
              user={sessionUser}
              setShowEditModal={setShowEditModal}
            />
          )}
          {sessionUser && spot.Owner.id === sessionUser.id && (
            <DeleteButton
              user={sessionUser}
              setShowDeleteModal={setShowDeleteModal}
            />
          )}
          {showEditModal && (
            <Modal onClose={() => setShowEditModal(false)}>
              <EditSpotForm
                setShowEditModal={setShowEditModal}
                spotId={spotId}
                spot={spot}
              />
            </Modal>
          )}
          {showDeleteModal && (
            <Modal onClose={() => setShowDeleteModal(false)}>
              <DeleteSpotConfirmation
                setShowDeleteModal={setShowDeleteModal}
                spotId={spotId}
                spot={spot}
              />
            </Modal>
          )}
        </div>
        <div className="spot-pictures-wrapper">
          <div className="spot-grid">
            {/* {spotImages?.map((image,i) =>
              <div key={image.id} id={`spot-image-${i}`}>
              <img  src={image.url ? image.url : "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"} alt="spot-image"/>
              </div>
            )} */}
            {array.map((id, index) => (
              <div key={index} id={`spot-image-${index}`}>
                <img
                  src={
                    spotImages[index]?.url
                      ? spotImages[index].url
                      : "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                  }
                  alt="spot-image"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="middle-page-details">
          <div className="spot-hosted-details">
            <div className="hostedBy">
              <h2>
                Spot hosted by {spot.Owner.firstName}&nbsp;{spot.Owner.lastName}
              </h2>
            </div>
            <div className="owner-profile-pic"></div>
          </div>

          <div className="airbnb-details">
            <div className="airbnb-detail-container">
              <div className="icon">
                <img
                  src={checkin}
                  style={{ height: 24, width: 24 }}
                  alt="check in"
                />
              </div>
              <div className="airbnb-text">
                <div className="top-text">Self check-in</div>
                <div className="bottom-text">
                  Check yourself in with the keypad.
                </div>
              </div>
            </div>

            <div className="airbnb-detail-container">
              <div className="icon">
                <img
                  src={location}
                  style={{ height: 24, width: 24 }}
                  alt="check in"
                />
              </div>
              <div className="airbnb-text">
                <div className="top-text">Great location</div>
                <div className="bottom-text">
                  100% of recent guests gave the location a 5-star rating.
                </div>
              </div>
            </div>

            <div className="airbnb-detail-container">
              <div className="icon">
                <img
                  src={calender}
                  style={{ height: 24, width: 24 }}
                  alt="check in"
                />
              </div>
              <div className="airbnb-text">
                <div className="top-text">
                  Free cancellation before 4:00 PM on Nov 16.
                </div>
              </div>
            </div>
          </div>

          <div className="aircover">
            <div className="aircover-title">
              <img
                src={
                  "https://a0.muscache.com/im/pictures/f4a1e0fb-bd06-4f11-91e3-8d3979d3431a.jpg"
                }
                style={{ height: 26, width: 123 }}
                alt
              />
            </div>
            <div className="aircover-details">
              Every booking includes free protection from Host cancellations,
              listing inaccuracies, and other issues like trouble checking in.
            </div>
            <div className="link">
              <Link to='' style={{ textDecoration: "none", color: "black" }}>
                Learn More
              </Link>
            </div>
          </div>

          <div className="spot-description">
            <div className="spot-description-text">{spot.description}</div>
            <div className="link">
              <Link to='' style={{ textDecoration: "none", color: "black" }}>
                Show More {">"}{" "}
              </Link>
            </div>
          </div>

          {/* <div className="place-offers">
            <div className="offers-img">
              <img
                src={offers}
                style={{ height: 266, width: 670 }}
                alt="place offers"
              />
            </div>
          </div> */}
        </div>

        {spot && <Reviews reviews={reviews} spot={spot} showWriteReviewsModal={showWriteReviewsModal} setShowWriteReviewsModal={setShowWriteReviewsModal} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}/>}

      </div>
    </div>
  );
}

export default SpotDetails;
