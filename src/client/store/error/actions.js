import { SET_ERROR } from "../constants";

export const _setError = (error) => {
  return {
    type: SET_ERROR,
    error,
  };
};
