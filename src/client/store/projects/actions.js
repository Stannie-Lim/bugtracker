import { GET_PROJECTS } from "../constants";

export const _getProjects = (projects) => {
  return {
    type: GET_PROJECTS,
    projects,
  };
};
