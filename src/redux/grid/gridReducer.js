import GRID_TYPES from "./gridTypes";
import {
  createGridUtil,
  createMazeUtil,
  makeCellVisitedUtil,
  makeCellSPUtil,
} from "./gridUtils";

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
  shouldFindPath: false,
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

    case GRID_TYPES.FIND_PATH:
      return {
        ...state,
        shouldFindPath: action.payload,
      };

    case GRID_TYPES.MARK_CELL_VISITED:
      return {
        ...state,
        gridCells: makeCellVisitedUtil(state, action.payload),
      };

    case GRID_TYPES.MARK_SHORTEST_PATH:
      return {
        ...state,
        gridCells: makeCellSPUtil(state, action.payload),
      };

    default:
      return state;
  }
};

export default gridReducer;
