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

    const data = await response.json()
    if (data.status === "404"){
        dispatch(loadReviews({}))
    }else {dispatch(loadReviews(data));}
    return response;
};

function normalizedObj(array) {
  let newObj = {};
    if (Array.isArray(array)){array.forEach((ele) => {
        newObj[ele.id] = ele;
      });
      return newObj;}
      return array
}

const initialState = { reviews: {}, review: {} };
const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS: {

      let newObj = normalizedObj(action.reviews.Reviews);
      return {
        reviews: newObj,
      };
    }
    default:
      return state;
  }
};

export default reviewsReducer;
