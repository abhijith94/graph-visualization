import FILTER_TYPES from "./filterTypes";

const INITIAL_STATE = {
  algorithms: ["Breadth First Search", "Depth First Search", "Dijkstra"],
  currentAlg: "Breadth First Search",
};

const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FILTER_TYPES.CHOOSE_ALGO:
      return {
        ...state,
        currentAlg: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
