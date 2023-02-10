import { csrfFetch } from "./csrf";

const ADD_BOOKING = "bookings/ADD_BOOKING";
const LOAD_BOOKINGS = "bookings/LOAD_BOOKINGS";
const UPDATE_BOOKING = "bookings/UPDATE_BOOKING";
const DELETE_BOOKING = "bookings/DELETE_BOOKING";


const addBooking = (booking) => {
  return {
    type: ADD_BOOKING,
    booking,
  };
};

const loadBookings = (bookings) => {
  return {
    type: LOAD_BOOKINGS,
    bookings,
  };
};
const updateBooking = (booking) => {
  return {
    type: UPDATE_BOOKING,
    booking,
  };
};
const deleteBooking = (bookingId) => {
  return {
    type: DELETE_BOOKING,
    bookingId,
  };
};



export const fetchAllBookings = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/current`, {
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(loadBookings(data));
  }
  return response;
};

export const fetchPostBooking = (spotId, booking) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: "POST",
    body: JSON.stringify(booking),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addBooking(data));
  }
  return response;
};

export const fetchUpdateBooking = (bookingId, booking) => async (dispatch) => {
  console.log("HEREEEEE")
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "PUT",
    body: JSON.stringify(booking),
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data, "REPONSEEEEEEEEEEEEEEEEEE")
    dispatch(updateBooking(data));
  }
  return response;
};
export const fetchDeleteBooking = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data, "REPONSEEEEEEEEEEEEEEEEEE")
    dispatch(deleteBooking(bookingId));
  }
  return response;
};

function normalizedObj(array) {
  let newObj = {};
  if (Array.isArray(array)) {
    array.forEach((ele) => {
      newObj[ele.id] = ele;
    });
    return newObj;
  }
  return array;
}

const initialState = { bookings: {}, booking: {} };
const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BOOKINGS: {
      let newObj = normalizedObj(action.bookings.Bookings);
      return {
        bookings: newObj,
      };
    }
    case ADD_BOOKING: {
      const booking = action.booking;
      return {
        bookings: { ...state.bookings, [booking.id]: booking },
        booking: booking,
      };
    }
    case DELETE_BOOKING: {
      const bookingId = action.bookingId;
      let newBookingsState = state.bookings
      delete newBookingsState[bookingId]
      return {
        ...state,
        bookings: newBookingsState,
      };
    }
    case UPDATE_BOOKING: {
      const newBooking = action.booking;
      console.log(typeof newBooking, "UPDATEDDDDDDDDDD")
      let updatedBooking = Object.assign(state.bookings[newBooking.id], newBooking);
      // let updatedBooking = state.bookings[`${newBooking.id}`]
      console.log(updatedBooking, "UPDATEDDDDDDDDDDBOOOKING")
      // updatedBooking["startDate"] = newBooking["startDate"]
      // updatedBooking.endDate = newBooking.endDate
      // updatedBooking.createdAt = newBooking.createdAt
      return {
        bookings: { ...state.bookings, [`${newBooking.id}`]: {...updatedBooking} },
        booking: updatedBooking,
      };
    }

    default:
      return state;
  }
};

export default bookingsReducer;
