import GRID_TYPES from "./gridTypes";
import {
  createGridUtil,
  createMazeUtil,
  makeCellVisitedUtil,
  makeCellSPUtil,
  resetVisitedAndSPUtil,
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
  enableVisualizeButton: true,
  mazeActive: false,
};

const gridReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GRID_TYPES.CREATE_GRID: {
      const { enableVisualizeButton, gridCells } = createGridUtil(state);
      return {
        ...state,
        gridCells,
        enableVisualizeButton,
      };
    }

    case GRID_TYPES.CREATE_MAZE: {
      const { enableVisualizeButton, gridCells } = createMazeUtil(state);
      return {
        ...state,
        gridCells,
        enableVisualizeButton,
      };
    }
    case GRID_TYPES.FIND_PATH:
      return {
        ...state,
        enableVisualizeButton: action.payload,
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

    case GRID_TYPES.RESET_VISITED_AND_SP:
      return {
        ...state,
        gridCells: resetVisitedAndSPUtil(state),
      };

    default:
      return state;
  }
};

export default gridReducer;
