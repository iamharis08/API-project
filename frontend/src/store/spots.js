const LOAD_SPOTS = "spots/getSpots";

const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots,
  };
};


export const fetchAllSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");
  const data = await response.json();
 
  dispatch(loadSpots(data));
  return response;
};

const initialState = { spots: [], page: 0, size: 0 };
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      return { ...state, spots: [...action.spots.Spots], page: action.spots.page, size: action.spots.size};
    }
    default:
      return state;
  }
};

export default spotsReducer
