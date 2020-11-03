import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// store
import { getProjects } from "../../store/store";

// components
import ProjectCard from "./cards/ProjectCard";

// css
import "./projects.css";

const Projects = ({ history }) => {
  const dispatch = useDispatch();
  const findProjects = async () => {
    dispatch(getProjects());
  };

  useEffect(() => {
    findProjects();
  }, []);

  const addProject = () => {};

  const projects = useSelector(({ projects }) => projects);
  return (
    <div className="main">
      <Link to="/add/projects">Add Project</Link>
      <table className="projects">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Project Description</th>
          </tr>
        </thead>
        <tbody>
          {projects &&
            projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                history={history}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
