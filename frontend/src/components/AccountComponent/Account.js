import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchAllBookings, fetchDeleteBooking } from "../../store/bookings";
import userIcon from "../Navigation/NavBarImages/user-icon.svg";
import "./Account.css";
import { Modal } from "../../context/Modal";
import EditBookingModal from "./EditBookingModal";

function Account() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const bookings = useSelector((state) => state.bookings.bookings);
  const [expandedBooking, setExpandedBooking] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editBooking, setEditBooking] = useState("");
  const [deleteBooking, setDeleteBooking] = useState(false);
  const [errors, setErrors] = useState({});

  const handleClick = (e, index) => {
    e.preventDefault();
    // e.stopPropogation()
    setIsExpanded(!isExpanded);
    setExpandedBooking(index);
    setShowOptions(!showOptions);
  };
  const handleDelete = (e, bookingId) => {
    e.preventDefault();
    // e.stopPropogation()
    dispatch(fetchDeleteBooking(bookingId))
    .then(() => {
      setDeleteBooking(!deleteBooking);
    })
    .catch(async (response) => {
      const data = await response.json()
      if (data && data.errors) setErrors(data.errors);
    });
  };

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, []);

  useEffect(() => {
    console.log(isExpanded, showOptions);
  }, [isExpanded, showOptions, showEditModal]);

  const bookingsComponents = Object.values(bookings)?.map((booking, index) => {
    const bookingStartDate = new Date(booking.startDate)
    const bookingEndDate = new Date(booking.endDate)
    const dateNow = Date.now()
    if (bookingStartDate < dateNow) return null
    else return (
      <div key={index}>
        <NavLink
          to={`/spots/${booking?.spotId}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="booking-container">
            <div className="booking-picture">
              <img src={booking.Spot?.previewImage} />
            </div>
            <div className="booking-info">
              <div className="booking-spot-name">{booking.Spot?.name}</div>
              <div className="booking-spot-address">
                {booking.Spot?.address}
              </div>
              <div className="booking-startDate">
                Start Date: {`${new Date(booking?.startDate).toDateString()}`}
                <p>
                  End Date: {`${new Date(booking?.endDate).toDateString()}`}
                </p>
              </div>
            </div>
            <div className="bookings-options-container">
              <div
                className={
                  isExpanded && expandedBooking === index
                    ? "expanded-booking-options-button"
                    : "booking-options-button"
                }
                onClick={(e) => handleClick(e, index)}
              >
                {isExpanded && expandedBooking === index ? (
                  <div
                    className={showOptions ? "show-options" : "hide-options"}
                  >
                    <div className="close-options" onClick={() => {
                        setEditBooking(booking.id);
                      }}>
                        {">"}
                      </div>
                    <div
                      className="edit-booking"
                      onClick={() => {
                        setEditBooking(booking.id);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </div>
                    <div className="delete-booking" onClick={(e) => handleDelete(e, booking.id)}>Delete</div>
                  </div>
                ) : (
                  "<"
                )}
              </div>
            </div>
          </div>
        </NavLink>
      </div>
    );
  });

  return (
    <div className="account-container">
      <div className="account-profile">
        <div className="account-picture">
          <img src={userIcon} alt="user picture" />
        </div>

        <div className="user-account-info">
          <div className="account-title">Account</div>
          <div className="user-name">
            {user.firstName} {user.lastName}
          </div>
          <div className="user-email">{user.email}</div>
        </div>
      </div>
      <div className="account-assets">
        <div className="account-welcome-header">
          Hi, {user.firstName}
          <p>Joined 2023</p>
        </div>
        <div className="account-bookings-container">
          <div className="account-bookings-title">Your Bookings</div>
          {bookingsComponents ? (
            bookingsComponents
          ) : (
            <div className="no-bookings">You have no bookings</div>
          )}
        </div>
      </div>
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <EditBookingModal
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            editBooking={editBooking}
          />
        </Modal>
      )}
    </div>
  );
}

export default Account;
