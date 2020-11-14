import { _setError } from "./actions";

export const setError = (error) => {
  return (dispatch) => {
    dispatch(_setError(error));
  };
};
