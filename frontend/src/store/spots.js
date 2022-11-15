const LOAD_SPOTS = "spots/getSpots";
const CREATE_SPOT = "spot/createSpot"

const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots,
  };
};

const createSpot = (spot) => {
    return {

    }
}

export const fetchAllSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");
  const data = await response.json();

  dispatch(loadSpots(data));
  return response;
};

function normalizedObj(array) {
    let newObj = {}
    array.forEach(ele => {
        newObj[ele.id] = ele
    });
}
const initialState = { spots: [], page: 0, size: 0 };
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      return {
        ...state,
        spots: [...action.spots.Spots],
        page: action.spots.page,
        size: action.spots.size,
      };
    }
    default:
      return state;
  }
};

export default spotsReducer;
