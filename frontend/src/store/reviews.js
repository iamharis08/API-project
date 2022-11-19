import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "reviews/loadReviews";
const CREATE_REVIEW = "reviews/createReview"

const loadReviews = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    reviews,
  };
};

const addReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review,
    }
}

export const fetchAllReviews = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);

    const data = await response.json()
    if (data.status === "404"){
        dispatch(loadReviews({}))
    }else {dispatch(loadReviews(data));}
    return response;
};

export const fetchCreateReview = (Review, spotId) => async (dispatch) => {
   const {review, stars} = Review
    console.log(Review)
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify({
            review,
            stars
        }),
    });
    if(response.ok){
        const data = await response.json()
         dispatch(fetchAllReviews(spotId))
         .then(() => response);
    } else if (response.statusCode){
         return new Error(response.message);
    }

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
