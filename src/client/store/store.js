import { createStore, applyMiddleware, combineReducers } from "redux";
import thunks from "redux-thunk";
import { createLogger } from "redux-logger";

// user auth
import user from "./user/reducer";
import { login, register } from "./user/thunks";

// projects
import projects from "./projects/reducer";
import { getProjects } from "./projects/thunks";

const reducer = combineReducers({
  user,
  projects,
});

const store = createStore(
  reducer,
  applyMiddleware(thunks, createLogger({ collapsed: true }))
);

export default store;

export { login, register, getProjects };
