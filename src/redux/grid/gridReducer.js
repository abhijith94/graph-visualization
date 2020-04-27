import GRID_TYPES from "./gridTypes";
import { createGridUtil, createMazeUtil } from "./gridUtils";

const INITIAL_STATE = {
  rows: 22,
  columns: 40,
  gridCells: [],
  playerPos: {
    i: 11,
    j: 3,
  },
  targetPos: {
    i: 11,
    j: 35,
  },
};

const gridReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GRID_TYPES.CREATE_GRID:
      return {
        ...state,
        gridCells: createGridUtil(state),
      };

    case GRID_TYPES.CREATE_MAZE:
      return {
        ...state,
        gridCells: createMazeUtil(state),
      };

    default:
      return state;
  }
};

export default gridReducer;
