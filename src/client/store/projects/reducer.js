import { GET_PROJECTS } from "../constants";

const projectsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PROJECTS:
      state = action.projects;
      break;
  }
  return state;
};

export default projectsReducer;
