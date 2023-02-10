import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { fetchUpdateBooking } from "../../store/bookings";
import Bookings from "../BookingsComponents/Bookings";
import './EditBookingModal.css'
import close from "../LoginFormModal/icons/close.svg";

function EditBookingModal({ setShowEditModal, showEditModal, editBooking }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const booking = useSelector((state) => state.bookings.bookings[editBooking]);
  const [checkin, setCheckIn] = useState('');
  const [checkout, setCheckOut] = useState('');
  const [startDate, setStartDate] = useState(booking.startDate);
  const [endDate, setEndDate] = useState(booking.endDate);
  const [bookedNights, setBookedNights] = useState(0);
  const [bookedNightsPrice, setBookedNightsPrice] = useState(0);
  const [cleaningFee, setCleaningFee] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [guests, setGuests] = useState(1);
  const [errors, setErrors] = useState({});

  const closeModal = () => {
    setShowEditModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const booking = {
      startDate: startDate,
      endDate: endDate
    };
    return dispatch(fetchUpdateBooking(editBooking, booking))
      .then(() => {
        setShowEditModal(false);
      })
      .catch(async (response) => {
        const data = await response.json()
        console.log(data)
        if (data && data.errors) setErrors(data.errors);
      });
  };

  useEffect(() => {

  }, [showEditModal, startDate, endDate]);

  useEffect(() => {
    setErrors({});
    const totalBookedPrice =
      (booking.Spot?.price * (checkout - checkin) / (1000 * 60 * 60 * 24));
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
        <div className="bookings-price">${booking.Spot?.price} night</div>
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
                value={startDate}
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
                value={endDate}
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
          <ul className="bookings-errors-list">
          {Object.values(errors).map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
          <button className="reserve-button" type="submit">Reserve</button>
        </form>
      </div>
      <div className="bookings-info">
        <div className="price-totals-container">
          <div className="total-nights">
            ${booking.Spot?.price} X {bookedNights ? bookedNights : 0}{" "}
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

export default EditBookingModal;
