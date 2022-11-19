import React, { useEffect, useState } from 'react';
// import * as sessionActions from '../../store/session';
import * as spotsActions from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './CreateSpotForm.css';


function CreateSpotForm({ setShowHostModal, ShowHostModal }) {
    const dispatch = useDispatch();
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [price, setPrice] = useState(0);
    const [errors, setErrors] = useState([]);


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
    }
    return dispatch(spotsActions.fetchPostSpot(spot))
    .then(() => {setShowHostModal(false)

    })
    .catch(async (res) => {

        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });

  }
  useEffect(()=> {

  },[ShowHostModal])

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        address
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        city
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        state
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <label>
        Country
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <label>
        Description
        <textarea
        type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Price
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <label>
        Add Image Url
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </label>
      <button type="submit">Create Spot</button>
    </form>
  );

}

export default CreateSpotForm;
