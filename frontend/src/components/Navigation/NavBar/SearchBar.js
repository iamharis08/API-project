import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";
import "../Navigation.css";
import "./SearchBar.css";
import magnify from "./NavImages/magnifying-glass.svg";
import { fetchSearchedSpots } from "../../../store/spots";

function SearchBar() {
  const history = useHistory();
  const dispatch = useDispatch()
  const { pathname } = useLocation();
  const [anywhere, setAnyWhere] = useState("");
  const [anyweek, setAnyWeek] = useState("");
  const [guests, setGuests] = useState("");

  const spotId = (pathname) => pathname.split("/")[2];

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchSearchedSpots(anywhere))

  }

  return (
    <div
      className={
        pathname === `/spots/${spotId(pathname)}`
          ? "search-bar-spot-details"
          : "search-bar-wrapper"
      }
    >
      <form onSubmit={handleSubmit}>
      <div className="search">
        <input
          type="text"
          name="anywhere"
          placeholder="Anywhere"
          value={anywhere}
          onChange={(e) => setAnyWhere(e.target.value)}
          required
        />

        <button
          className="search-button"
          type="submit"
        >
          <img src={magnify} alt="search" />
        </button>
      </div>
      </form>
    </div>
  );
}

export default SearchBar;
