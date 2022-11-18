import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "spots/getSpots";
const GET_SPOT = "spots/getSpot";
const ADD_SPOT = "spot/createSpot";
const ADD_IMAGE = "spot/addImage";
const EDIT_SPOT = "spot/editSpot";
const DELETE_SPOT = "spot/deleteSpot";

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

const addSpotImage = (image) => {
  return {
    type: ADD_IMAGE,
    image,
  };
};

const editSpot = (spot) => {
  return {
    type: EDIT_SPOT,
    spot,
  };
};

const deleteSpot = () => {
  return {
    type: DELETE_SPOT,
  };
};

export const fetchAllSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");
  const data = await response.json();
  if (response.ok) {
    dispatch(loadSpots(data));
    return response;
  }

  return response;
};

export const fetchSpot = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`);
  const data = await response.json();

  dispatch(getSpot(data));
  return response;
};

export const fetchDeleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  const data = await response.json();

  dispatch(deleteSpot());
  return data;
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
    url,
  } = spot;

  const spotResponse = await csrfFetch("/api/spots", {
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
  if (spotResponse.ok) {
    const data = await spotResponse.json();


    const imageResponse = await csrfFetch(`/api/spots/${data.id}/images`, {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({
        spotId: data.id,
        url,
        preview: true,
      }),
    });
    if (imageResponse.ok){
      dispatch(fetchAllSpots())
      return spotResponse && imageResponse;

    }
  }
  return spotResponse;
};

export const fetchPutSpot = (spot, spotId) => async (dispatch) => {
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    url,
  } = spot;

  const spotResponse = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    body: JSON.stringify({
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
  if (spotResponse.ok) {

    const data = await spotResponse.json();
    dispatch(fetchSpot(data.id));
    return spotResponse;
    }


  return spotResponse;
};

export const fetchPostImage = (spotImage) => async (dispatch) => {
  const { spotId, url, preview } = spotImage;

  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify({
      spotId,
      url,
      preview,
    }),
  });
  if (response.ok) {
    const data = await response.json();

    dispatch(addSpotImage(data));
    return response;
  }
  return response;
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
      };
    }
    case GET_SPOT: {
      return {
        spot: action.spot,
      };
    }
    case ADD_SPOT: {
      let normalizedSpot = { [action.spot.id]: action.spot };
      return {
        spots: { ...state.spots, ...normalizedSpot },
      };
    }
    case EDIT_SPOT: {
      return {
        spot: action.spot,
      };
    }
    case DELETE_SPOT: {
      return {
        spot: {},
      };
    }
    default:
      return state;
  }
};

export default spotsReducer;
