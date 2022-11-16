const LOAD_SPOTS = "spots/getSpots";
const GET_SPOT = "spots/getSpot"
const CREATE_SPOT = "spot/createSpot"

const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots,
  };
};

const getSpot = (spot) => {
    return {
        type: GET_SPOT,
        spot
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

function normalizedObj(array) {
    let newObj = {}
    array.forEach(ele => {
        newObj[ele.id] = ele
    });
    return newObj
}
const initialState = { spots: {}, spot:{}, page: 0, size: 0 };
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
        let newObj = normalizedObj(action.spots.Spots)
      return {
        ...state,
        spots: newObj,
        page: action.spots.page,
        size: action.spots.size,
      };
    }
    case GET_SPOT: {
      return {
        ...state,
        spot: action.spot
      };
    }
    default:
      return state;
  }
};

export default spotsReducer;
