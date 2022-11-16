import React, { useState, useEffect } from "react";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import "./Spots.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllSpots } from "../../store/spots";

function Spots() {
  const dispatch = useDispatch();
  const history = useHistory();
  const spots = useSelector((state) => state.spots.spots);

  const handleClick = (spotId) => {
    // <Redirect to="/" />
    // history.push(`/spots/${spotId}`);
  };
  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  return (
    <div className="spots">
      {Object.values(spots).map((spot) => {
        return (
            <div  key={spot.id}>
        <NavLink style={{ textDecoration: "none", color: "black" }} to= {`/spots/${spot.id}`}>
        <div

            className="spots-container"
            onClick={handleClick(spot.id)}
          >
            <div className="spot-img">
              <img src={spot.previewImage} alt="spots" />
            </div>

            <div className="spots-info">
              <div id="spots-address">{`${spot.city}, ${spot.state}`}</div>
              <div id="spots-stars">{`Stars: ${spot.avgRating}`}</div>
              <div id="spots-price">
                <span>{`$${spot.price} `}</span>night
              </div>
            </div>
          </div>
        </NavLink>

          </div>
        );
      })}
    </div>
  );
}

export default Spots;
