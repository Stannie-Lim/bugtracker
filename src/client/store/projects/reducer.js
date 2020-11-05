import { GET_PROJECTS, CREATE_PROJECT, INVITE_USER } from "../constants";

const projectsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PROJECTS:
      state = action.projects;
      break;
    case CREATE_PROJECT:
      state = [...state, action.project];
      break;
    case INVITE_USER:
      state = state.map((project) =>
        project.id === action.project.id ? action.project : project
      );
      break;
  }
  return state;
};

export default projectsReducer;
