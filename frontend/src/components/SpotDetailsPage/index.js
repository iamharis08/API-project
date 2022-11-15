import React, { useState, useEffect } from "react";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllSpots } from "../../store/spots";

import "./SpotDetails.css";

function SpotDetails() {
  const dispatch = useDispatch()
  const spots = useSelector((state) => state.spots.spots);
  

  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  return (
  <div className="spot-details">
    <h1></h1>
  </div>
  );
}

export default SpotDetails;
