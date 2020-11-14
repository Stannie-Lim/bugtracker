import { SET_ERROR } from "../constants";

const errorReducer = (state = "", action) => {
  switch (action.type) {
    case SET_ERROR:
      state = action.error;
      break;
  }
  return state;
};

export default errorReducer;
