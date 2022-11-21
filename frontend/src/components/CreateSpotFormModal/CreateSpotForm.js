import React, { useEffect, useState } from "react";
// import * as sessionActions from '../../store/session';
import * as spotsActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./CreateSpotForm.css";
import "../LoginFormModal/LoginForm.css";
import facebook from "../LoginFormModal/icons/facebook.svg";
import apple from "../LoginFormModal/icons/apple.svg";
import emailIcon from "../LoginFormModal/icons/email.png";
import google from "../LoginFormModal/icons/google.png";
import close from "../LoginFormModal/icons/close.svg";

function CreateSpotForm({ setShowHostModal, ShowHostModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState();
  const [errors, setErrors] = useState([]);

  const closeModal = () => {
    setShowHostModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const spot = {
      ownerId: sessionUser.id,
      address,
      city,
      state,
      country,
      lat: 10,
      lng: 10,
      name,
      description,
      price: parseInt(price),
      url,
    };
    return dispatch(spotsActions.fetchPostSpot(spot))
      .then(() => {
        setShowHostModal(false);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };
  useEffect(() => {}, [ShowHostModal]);

  return (
    <div className="form-wrapper">
      <div className="heading-wrapper">
        <div className="login-heading">
          <div className="close-button" onClick={closeModal}>
            <img src={close} alt="close" />{" "}
          </div>
          Create your spot
        </div>
      </div>
      <div className="form-inputs">
        <div className="welcome-text">Create your spot</div>

        <form onSubmit={handleSubmit}  action="page_submission_URL" method="POST">
          <ul className="errors-list">
            {Object.values(errors).map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            <input
              type="text"
              value={name}
              placeholder="Spot name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="text"
              value={address}
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="text"
              value={city}
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="text"
              value={state}
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="text"
              value={country}
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>

          <label for="price">
            <input
              type="number"
              name="price"
              min="0"
              placeholder="Price per night"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          <label for="url">
            <input
              type="url"
              name="url"
              value={url}
              placeholder="Image url"
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </label>
          <label>
            <textarea
              type="text"
              name="description"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <div className="button-container">
            <button className="login-button" type="submit" >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSpotForm;
