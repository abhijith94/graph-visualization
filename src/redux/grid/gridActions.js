import GRID_TYPES from "./gridTypes";

export const createGrid = () => ({
  type: GRID_TYPES.CREATE_GRID,
});

export const createMaze = () => ({
  type: GRID_TYPES.CREATE_MAZE,
});

export const findPath = (find) => ({
  type: GRID_TYPES.FIND_PATH,
  payload: find,
});

export const markCellVisited = (i, j) => ({
  type: GRID_TYPES.MARK_CELL_VISITED,
  payload: {
    i,
    j,
  },
});

export const markShortestPath = (i, j) => ({
  type: GRID_TYPES.MARK_SHORTEST_PATH,
  payload: {
    i,
    j,
  },
});
