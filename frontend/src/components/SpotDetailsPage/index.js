import React, { useState, useEffect } from "react";
import { Redirect, useHistory, NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpot } from "../../store/spots";
import stars from "./SpotDetailsPageImages/stars.svg";
import "./SpotDetails.css";

function SpotDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const { spotId } = params;

  const spot = useSelector((state) => state.spots.spot);

  useEffect(() => {
    console.log(spotId);
    dispatch(fetchSpot(spotId));
  }, [dispatch]);

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
        </div>
      </div>
    </div>
  );
}

export default SpotDetails;
