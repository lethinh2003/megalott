import { SET_BALANCE, SET_DISPLAY_BALANCE } from "../actions/constants";
const initialState = {
  display: false,
  balance: 0,
};
const balanceReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case SET_DISPLAY_BALANCE:
      return {
        ...state,
        display: payload.data,
      };
    case SET_BALANCE:
      return {
        ...state,
        balance: payload.data,
      };
    default:
      return state;
  }
};
export default balanceReducer;
