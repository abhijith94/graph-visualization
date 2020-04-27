import { combineReducers } from "redux";
import gridReducer from "./grid/gridReducer";
import filterReducer from "./filter/filterReducer";

const rootReducer = combineReducers({
  grid: gridReducer,
  filter: filterReducer,
});

export default rootReducer;
