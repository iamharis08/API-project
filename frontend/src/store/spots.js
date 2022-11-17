import { csrfFetch } from './csrf';

const LOAD_SPOTS = "spots/getSpots";
const GET_SPOT = "spots/getSpot";
const ADD_SPOT = "spot/createSpot";
const ADD_IMAGE = "spot/addImage";

const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots,
  };
};

const getSpot = (spot) => {
  return {
    type: GET_SPOT,
    spot,
  };
};

const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot,
  };
};

const addImage = (image) => {
  return {
    type: ADD_IMAGE,
    image,
  }
}

export const fetchAllSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");
  const data = await response.json();

  dispatch(loadSpots(data));
  return response;
};

export const fetchSpot = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`);
  const data = await response.json();

  dispatch(getSpot(data));
  return response;
};

export const fetchPostSpot = (spot) => async (dispatch) => {
  const {
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  } = spot;

  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify({
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    }),
  });
  if (response.ok) {
    const data = await response.json();

    dispatch(addSpot(data));
    return response;
  }
  return;
};

export const fetchPostImage = (spot) => async (dispatch) => {
  const {
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  } = spot;

  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify({
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    }),
  });
  if (response.ok) {
    const data = await response.json();

    dispatch(addSpot(data));
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
const initialState = { spots: {}, spot: {} };
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      let newObj = normalizedObj(action.spots.Spots);
      return {
        spots: newObj,
        spot: {},
      };
    }
    case GET_SPOT: {
      return {
        spot: action.spot,
      };
    }
    case ADD_SPOT: {
      let normalizedSpot = {[action.spot.id]: action.spot.id}
      return {
        spots: {...state.spots, normalizedSpot},
      };
    }
    default:
      return state;
  }
};

export default spotsReducer;
