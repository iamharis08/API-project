import { csrfFetch } from "./csrf";

const ADD_BOOKING = "bookings/ADD_BOOKING";
const LOAD_BOOKINGS = "bookings/LOAD_BOOKINGS";

const addBooking = (booking) => {
  return {
    type: ADD_BOOKING,
    booking,
  };
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

    default:
      return state;
  }
};

export default bookingsReducer;
