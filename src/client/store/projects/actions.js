import { GET_PROJECTS } from "../constants";

export const _getProjects = (tickets) => {
  return {
    type: GET_PROJECTS,
    tickets,
  };
};
