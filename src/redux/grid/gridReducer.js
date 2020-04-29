import GRID_TYPES from "./gridTypes";
import {
  createGridUtil,
  createMazeUtil,
  makeCellVisitedUtil,
  makeCellSPUtil,
  resetVisitedAndSPUtil,
  addWeightsUtil,
  onCellClickUtil,
  onDragDropUtil,
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
  wKeyPressed: false,
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

    case GRID_TYPES.ADD_WEIGHTS:
      return {
        ...state,
        gridCells: addWeightsUtil(state),
      };

    case GRID_TYPES.W_KEY_PRESS:
      return {
        ...state,
        wKeyPressed: action.payload,
      };

    case GRID_TYPES.CELL_CLICKED:
      return {
        ...state,
        gridCells: onCellClickUtil(state, action.payload),
      };

    case GRID_TYPES.DRAG_DROP: {
      const { playerPos, targetPos, gridCells } = onDragDropUtil(
        state,
        action.payload
      );
      return {
        ...state,
        gridCells,
        playerPos,
        targetPos,
      };
    }
    default:
      return state;
  }
};

export default gridReducer;
