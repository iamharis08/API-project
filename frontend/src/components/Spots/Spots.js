import React, { useState, useEffect } from "react";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import "./Spots.css";
import { useSelector, useDispatch } from "react-redux";
import { clearSearchSpots, fetchAllSpots } from "../../store/spots";
import stars from "../SpotDetailsPage/SpotDetailsPageImages/stars.svg"
function Spots() {
  const dispatch = useDispatch();
  const history = useHistory();
  const spots = useSelector((state) => state.spots.spots);
  const searchedSpots = useSelector((state) => state.spots.searchSpots);

  const handleClick = (spotId) => {
    // <Redirect to="/" />
    // history.push(`/spots/${spotId}`);
  };

  const convertToDate = (oldDate) => {
    if (oldDate) {
      const date = oldDate.split("T")[0];
      const newDate = new Date(date);
      const convertedDate = newDate.toDateString();
      return convertedDate;
    }

    return null;
  };

  useEffect(() => {
    dispatch(clearSearchSpots())
    dispatch(fetchAllSpots());
  }, [dispatch]);

  useEffect(() => {
  }, [searchedSpots]);
  // const currentDate = new Date(Date.now())

  const weekDifference = (addedDate) =>{
    // if((currentDate - addedDate) < 604800000) {
    //   return "0"
    // } else Math.round(Math.abs( currentDate - addedDate ) / 604800000)
    return Math.floor(Math.random() * 15)
  }

  if (!spots) return null;



  const spotsComponent = (spots) => {

    return Object.values(spots).map((spot) => (
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
              <div className="added-weeks-ago">
                Added {weekDifference(convertToDate(spot.createdAt))} weeks ago
              </div>
              <div className="date-created">
                {convertToDate(spot.createdAt)}
              </div>
            <div className="spots-price">
              <span>{`$${spot.price} `}</span>night
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  ))}





  return (
    <div className="spots-wrapper">
    <div className="spots">
      {(searchedSpots && Object.values(searchedSpots).length) ? spotsComponent(searchedSpots) : spotsComponent(spots)}

    </div>
    </div>
  );
}

export default Spots;
