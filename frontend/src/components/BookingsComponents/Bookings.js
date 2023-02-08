import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Bookings.css";

function Bookings() {
  const pricePerNight = useSelector((state) => state.spots.spot.price);
  const [checkin, setCheckIn] = useState("");
  const [checkout, setCheckOut] = useState("");
  const [bookedNights, setBookedNights] = useState(0);
  const [bookedNightsPrice, setBookedNightsPrice] = useState(0);
  const [cleaningFee, setCleaningFee] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [guests, setGuests] = useState("");

  const handleSubmit = () => {
    
  }

  useEffect(() => {
    const totalBookedPrice =
      (pricePerNight * (checkout - checkin) / (1000 * 60 * 60 * 24));
    if (totalBookedPrice > 0) {
      setBookedNights((checkout - checkin) / (1000 * 60 * 60 * 24));
      setBookedNightsPrice(totalBookedPrice);
      setCleaningFee((totalBookedPrice * 0.05));
      setServiceFee((totalBookedPrice * 0.1));
    }
  }, [checkin, checkout]);

  return (
    <div className="bookings-section">
      <div className="bookings-container">
        <div className="bookings-header">
          <div className="bookings-price">$164 night</div>
          <div className="bookings-header-right-container">
            <div className="bookings-rating">* 4.97 *</div>
            <div className="bookings-reviews">567 reviews</div>
          </div>
        </div>

        <div className="bookings-inputs">
          <form>
            <div className="date-inputs">
              <div className="check-in-container">
                <div className="input-title">CHECK-IN</div>
                <input
                  type="date"
                  id="start"
                  name="start"
                  min="2023-01-01"
                  placeholder="mm/dd/yyyy"
                  onChange={(e) => setCheckIn(new Date(e.target.value))}
                />
              </div>
              <div className="check-out-container">
                <div className="input-title">CHECKOUT</div>
                <input
                  type="date"
                  id="end"
                  name="trip-start"
                  min="2023-01-01"
                  onChange={(e) => setCheckOut(new Date(e.target.value))}
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
            <div className="reserve-button">Reserve</div>
          </form>
        </div>
        <div className="bookings-info">
          <div className="price-totals-container">
            <div className="total-nights">
              ${pricePerNight} X {bookedNights ? bookedNights : 0}{" "}
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
