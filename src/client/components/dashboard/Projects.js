import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// store
import { getProjects } from "../../store/store";

// components
import ProjectCard from "./cards/ProjectCard";

const Projects = () => {
  const dispatch = useDispatch();
  const findProjects = async () => {
    dispatch(getProjects());
  };

  useEffect(() => {
    findProjects();
  }, []);

  const projects = useSelector(({ projects }) => projects);
  return (
    <div className="main">
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
              <ProjectCard key={project.id} project={project} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
