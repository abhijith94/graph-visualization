import GRID_TYPES from "./gridTypes";

export const createGrid = () => ({
  type: GRID_TYPES.CREATE_GRID,
});

export const createMaze = () => ({
  type: GRID_TYPES.CREATE_MAZE,
});
