import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";
import "./Navigation.css"

function ComingSoon() {
  return (
    <div className="coming-soon">
      <div className="coming-soon-title">
        <h1> Coming Soon !</h1>
      </div>

      <NavLink id="home-page-link" to="/">Go to Homepage</NavLink>
    </div>
  );
}

export default ComingSoon
