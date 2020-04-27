import FILTER_TYPES from "./filterTypes";

export const chooseAlg = (alg) => ({
  type: FILTER_TYPES.CHOOSE_ALGO,
  payload: alg,
});
