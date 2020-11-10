import { _login, _register } from "./actions";
import { AxiosHttpRequest, setJWT, getMe } from "../../utils/axios";

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
      console.log(err);
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
  return async () => {
    try {
      await AxiosHttpRequest("POST", `/api/auth/cardorder`, { order });
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
      // dispatch(_inviteUserToProject(project));
    } catch (err) {
      console.log(err);
    }
  };
};
