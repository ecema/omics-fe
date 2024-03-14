import omicSlice from "./omic/omicSlice";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  omicState: omicSlice,
});
