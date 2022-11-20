import React, { useState, useEffect } from "react";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import "./Spots.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllSpots } from "../../store/spots";
import stars from "../SpotDetailsPage/SpotDetailsPageImages/stars.svg"
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

  if (!spots) return null;
  return (
    <div className="spots-wrapper">
    <div className="spots">
      {Object.values(spots).map((spot) => (
        <div key={spot.id}>
          <NavLink
            style={{ textDecoration: "none", color: "black" }}
            to={`/spots/${spot.id}`}
          >
            <div className="spots-container" onClick={handleClick(spot.id)}>
              <div className="spot-img">
                <img
                  src={
                    spot.previewImage
                      ? spot.previewImage
                      : "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                  }
                  alt="spots"
                />
              </div>

              <div className="spots-info">
                <div className="spots-address">
                  {`${spot.city}, ${spot.state}`}
                  <span className="spots-stars"><span className="star"><img src={stars} alt="stars" /></span>{spot.avgRating}</span>
                </div>

                <div className="spots-price">
                  <span>{`$${spot.price} `}</span>night
                </div>
              </div>
            </div>
          </NavLink>
        </div>
      ))}

    </div>
    </div>
  );
}

export default Spots;
