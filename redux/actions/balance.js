import { SET_BALANCE, SET_DISPLAY_BALANCE } from "./constants";
export const setDisplayBalance = (value) => (dispatch) => {
  dispatch({
    type: SET_DISPLAY_BALANCE,
    data: value,
  });
};
export const setBalance = (value) => (dispatch) => {
  dispatch({
    type: SET_BALANCE,
    data: value,
  });
};
