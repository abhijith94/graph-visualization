import FILTER_TYPES from "./filterTypes";

const INITIAL_STATE = {
  algorithms: [
    {
      id: 0,
      type: "unweighted",
      name: "Breadth First Search",
      abbreviation: "BFS",
      description: "BFS is unweighted & gives shortest path",
    },
    {
      id: 1,
      type: "unweighted",
      name: "Depth First Search",
      abbreviation: "DFS",
      description: "DFS is unweighted & doesn't guarantee shortest path",
    },
    {
      id: 2,
      type: "weighted",
      name: "Dijkstra",
      description: "Dijkstra is weighted & guarantees shortest path",
    },
  ],
  currentAlg: 0,
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
