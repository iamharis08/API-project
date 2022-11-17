import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "reviews/loadReviews";

const loadReviews = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    reviews,
  };
};

export const fetchAllReviews = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const data = await response.json();

    dispatch(loadReviews(data));
    return response;
  }
  return;
};

function normalizedObj(array) {
  let newObj = {};
  array.forEach((ele) => {
    newObj[ele.id] = ele;
  });
  return newObj;
}

const initialState = { reviews: {}, review: {} };
const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {

      let newObj = normalizedObj(action.reviews.Reviews);
      return {
        reviews: newObj,
        review: {},
      };
    }
    default:
      return state;
  }
};

export default reviewsReducer;
