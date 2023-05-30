import { combineReducers } from "redux";
import balanceReducer from "./balance";

const reducers = combineReducers({
  balance: balanceReducer,
});

export default (state, action) => reducers(state, action);
