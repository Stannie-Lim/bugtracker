import { GET_PROJECTS, CREATE_PROJECT } from "../constants";

const projectsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PROJECTS:
      state = action.projects;
      break;
    case CREATE_PROJECT:
      state = [...state, action.project];
      break;
  }
  return state;
};

export default projectsReducer;
