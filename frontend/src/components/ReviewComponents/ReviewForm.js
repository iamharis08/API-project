import React, { useState, useEffect } from "react";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {fetchCreateReview} from '../../store/reviews'

function ReviewForm({spot, user, setShowWriteReviewsModal}) {
    const dispatch = useDispatch();
    console.log(spot.id)
//   const sessionUser = useSelector(state => state.session.user);
  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});


  const handleSubmit = (e) => {

    e.preventDefault();
    setErrors({});

    const newReview = {
        review,
        stars
    }
    return dispatch(fetchCreateReview(newReview, spot.id))
    .then(() => setShowWriteReviewsModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Write a Review for {spot.name}
        <input
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
      </label>
      <label>
        Stars
        <input
          type="number"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}

export default ReviewForm
