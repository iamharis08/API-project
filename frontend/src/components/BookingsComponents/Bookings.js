import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostBooking } from "../../store/bookings";
import "./Bookings.css";

function Bookings() {
  const dispatch = useDispatch()
  const spot = useSelector((state) => state.spots.spot);
  const [checkin, setCheckIn] = useState("");
  const [checkout, setCheckOut] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookedNights, setBookedNights] = useState(0);
  const [bookedNightsPrice, setBookedNightsPrice] = useState(0);
  const [cleaningFee, setCleaningFee] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [guests, setGuests] = useState(1);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    setSuccessMessage("")
    setErrors({});
    e.preventDefault()
    const booking = {
      startDate: startDate,
      endDate: endDate
    }
    console.log(booking, "NEW BOOKING")
    return dispatch(fetchPostBooking(spot.id, booking))
    .then(() => setSuccessMessage("Successfully Booked: Check Account Page"))
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  }

  useEffect(() => {
    setSuccessMessage("")
    setErrors({});
    const totalBookedPrice =
      (spot.price * (checkout - checkin) / (1000 * 60 * 60 * 24));
    if (totalBookedPrice > 0) {
      setBookedNights((checkout - checkin) / (1000 * 60 * 60 * 24));
      setBookedNightsPrice(totalBookedPrice);
      setCleaningFee((totalBookedPrice * 0.05));
      setServiceFee((totalBookedPrice * 0.1));
    }else {
      setBookedNights(0);
      setBookedNightsPrice(0);
      setCleaningFee(0);
      setServiceFee(0);
    }
  }, [checkin, checkout]);

  return (
    <div className="bookings-section">
      <div className="bookings-container">
        <div className="bookings-header">
          <div className="bookings-price">${spot.price} night</div>
          <div className="bookings-header-right-container">
            <div className="bookings-rating">* {spot.avgStarRating} *</div>
            <div className="bookings-reviews">{spot.numReviews} {spot.numReviews === 1 ? "review" : "reviews"}</div>
          </div>
        </div>

        <div className="bookings-inputs">
          <form onSubmit={handleSubmit}>
            <div className="date-inputs">
              <div className="check-in-container">
                <div className="input-title">CHECK-IN</div>
                <input
                  type="date"
                  id="start"
                  name="start"
                  min="2023-01-01"
                  placeholder="mm/dd/yyyy"
                  required
                  onChange={(e) => {
                    setCheckIn(new Date(e.target.value))
                    setStartDate(e.target.value)
                  }}
                />
              </div>
              <div className="check-out-container">
                <div className="input-title">CHECKOUT</div>
                <input
                  type="date"
                  id="end"
                  name="trip-start"
                  min="2023-01-01"
                  placeholder="mm/dd/yyyy"
                  required
                  onChange={(e) => {
                    setCheckOut(new Date(e.target.value))
                    setEndDate(e.target.value)
                  }}
                />
              </div>
            </div>
            <div className="guests-input">
              <div className="input-title">GUESTS</div>
              <input
                type="number"
                id="guest"
                name="trip-start"
                placeholder={1}
                min="1"
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>
            <ul className={successMessage ? "successfully-booked" : "bookings-errors-list"}>
            {successMessage ? successMessage : Object.values(errors).map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
            <button className="reserve-button" type="submit">Reserve</button>
          </form>
        </div>
        <div className="bookings-info">
          <div className="price-totals-container">
            <div className="total-nights">
              ${spot.price} X {bookedNights ? bookedNights : 0}{" "}
              {bookedNights === 1 ? "night" : "nights"}
            </div>
            <div className="total-nights-price">
              ${bookedNightsPrice ? bookedNightsPrice.toFixed(2) : 0}
            </div>
          </div>
          <div className="price-totals-container">
            <div className="cleaning-fee-title">Cleaning fee</div>
            <div className="cleaning-fee-price">
              ${cleaningFee ? cleaningFee.toFixed(2) : 0}
            </div>
          </div>
          <div className="price-totals-container">
            <div className="service-fee-title">Service fee</div>
            <div className="service-fee-price">
              ${serviceFee ? serviceFee.toFixed(2) : 0}
            </div>
          </div>
        </div>
        <div className="total-price">
          <div className="total-title">Total before taxes</div>
          <div className="total">
            $
            {bookedNightsPrice
              ? (bookedNightsPrice + cleaningFee + serviceFee).toFixed(2)
              : 0}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookings;
