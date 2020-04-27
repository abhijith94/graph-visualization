import { combineReducers } from "redux";
import gridReducer from "./grid/gridReducer";

const rootReducer = combineReducers({
  grid: gridReducer,
});

export default rootReducer;
