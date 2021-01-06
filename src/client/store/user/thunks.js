import { _login, _register } from "./actions";
import { AxiosHttpRequest, setJWT, getMe } from "../../utils/axios";

// error handling
import { _setError } from "../error/actions";

export const login = (email, password, signinToken = null) => {
  return async (dispatch) => {
    try {
      if (signinToken) {
        const user = (await AxiosHttpRequest("GET", "/api/auth/me")).data;
        dispatch(_login(user));
      } else if (email && password) {
        const token = (
          await AxiosHttpRequest("POST", "/api/auth/login", { email, password })
        ).data;
        setJWT(token);
        const user = await getMe();
        dispatch(_login(user));
      }
    } catch (err) {
      dispatch(_setError("Incorrect email or password"));
      setTimeout(() => dispatch(_setError("")), 6000);
    }
  };
};

export const register = (firstName, lastName, email, password) => {
  return async (dispatch) => {
    try {
      const token = (
        await AxiosHttpRequest("POST", "/api/auth/register", {
          firstName,
          lastName,
          email,
          password,
        })
      ).data;
      setJWT(token);
      const user = await getMe();
      dispatch(_login(user));
    } catch (err) {
      console.log(err);
    }
  };
};

export const setTicketCardOrder = (order) => {
  return async (dispatch) => {
    try {
      const user = (
        await AxiosHttpRequest("POST", `/api/auth/cardorder`, { order })
      ).data;
      dispatch(_login(user));
    } catch (err) {
      console.log(err);
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    try {
      await AxiosHttpRequest("POST", "/api/auth/logout");
      dispatch(_login({}));
    } catch (err) {
      console.log(err);
    }
  };
};

export const inviteUserToProject = (userToInvite, projectId) => {
  return async (dispatch) => {
    try {
      const user = (
        await AxiosHttpRequest("POST", `/api/user/invite/${projectId}`, {
          userToInvite,
        })
      ).data;
      dispatch(_login(user));
    } catch (err) {
      console.log(err);
    }
  };
};

export const declineProjectInvite = (id) => {
  return async (dispatch) => {
    try {
      const user = (
        await AxiosHttpRequest("POST", `/api/projects/invitation/${id}/decline`)
      ).data;
      dispatch(_login(user));
    } catch (err) {
      console.log(err);
    }
  };
};

export const changeName = (firstName, lastName) => {
  return async (dispatch) => {
    try {
      const user = (
        await AxiosHttpRequest("PUT", `/api/user/edit/name`, {
          firstName,
          lastName,
        })
      ).data;
      dispatch(_login(user));
    } catch (err) {
      console.log(err);
    }
  };
};

export const changeEmail = (email) => {
  return async (dispatch) => {
    try {
      const user = (
        await AxiosHttpRequest("PUT", `/api/user/edit/email`, { email })
      ).data;
      dispatch(_login(user));
    } catch (err) {
      console.log(err);
    }
  };
};

export const changePassword = (oldPassword, newPassword) => {
  return async (dispatch) => {
    try {
      const user = (
        await AxiosHttpRequest("PUT", `/api/user/edit/password`, {
          oldPassword,
          newPassword,
        })
      ).data;
      dispatch(_login(user));
    } catch (err) {
      dispatch(_setError("Incorrect password"));
    }
  };
};
