import React, { useState, useEffect } from "react";
import "./Spots.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllSpots } from "../../store/spots";

function Spots() {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.spots);

  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  return (
    <div className="spots">
      {spots.map((spot) => {
        return (
          <div className="spots-container">
            <img src={spot.previewImage} alt="spots" />
            <div className="spots-info">
                <div id="spots-address">
                    {`${spot.city}, ${spot.state}`}
                </div>
                <div id="spots-stars">
                    {`Stars: ${spot.avgRating}`}
                </div>
                <div id="spots-price">
                    <span>{`$${spot.price} `}</span>night
                </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Spots;
