import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";
import "../Navigation.css"
import "./SearchBar.css"
import magnify from "./NavImages/magnifying-glass.svg"

function SearchBar() {
    const history = useHistory()
    const [anywhere, setAnyWhere] = useState('')
    const [anyweek, setAnyWeek] = useState('')
    const [guests, setgeusts] = useState('')
  return (
    <div className="search-bar-wrapper">
        <div className="search-bar">
            <div className="anywhere">

            <input
              type="text"
              name="anywhere"
              placeholder="Anywhere"
              value={anywhere}
              onChange={(e) => setAnyWhere(e.target.value)}
              required
            />

            </div>
            <div className="any-week">

            <input
              type="text"
              name="anyweek"
              placeholder="Anywhere"
              value={anywhere}
              onChange={(e) => setAnyWeek(e.target.value)}
              required
            />

            </div>
            <div className="add-guests">

            <input
              type="text"
              name="addguests"
              placeholder="Add guests"
              value={anywhere}
              onChange={(e) => setAnyWhere(e.target.value)}
              required
            />

            </div>



            <div className="search-button" onClick={() => history.push('/comingsoon')}>
                <img src={magnify} alt="search" />
            </div>

        </div>
    </div>
  );
}

export default SearchBar
