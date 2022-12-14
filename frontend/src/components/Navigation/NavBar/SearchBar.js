import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";
import "../Navigation.css";
import "./SearchBar.css";
import magnify from "./NavImages/magnifying-glass.svg";

function SearchBar() {
  const history = useHistory();
  const { pathname } = useLocation();
  const [anywhere, setAnyWhere] = useState("");
  const [anyweek, setAnyWeek] = useState("");
  const [guests, setGuests] = useState("");

  const spotId = (pathname) => pathname.split("/")[2];
  return (
    <div
      className={
        pathname === `/spots/${spotId(pathname)}`
          ? "search-bar-spot-details"
          : "search-bar-wrapper"
      }
    >
      <div className="search">
        <input
          type="text"
          name="anywhere"
          placeholder="Anywhere"
          value={anywhere}
          onChange={(e) => setAnyWhere(e.target.value)}
          required
        />

        <div
          className="search-button"
          onClick={() => {
            history.push("/comingsoon");
            setAnyWeek("");
            setAnyWhere("");
            setGuests("");
          }}
        >
          <img src={magnify} alt="search" />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
