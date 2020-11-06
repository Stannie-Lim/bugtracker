import React from "react";

const ProjectDetailUsersList = ({ project }) => {
  const { users } = project;
  return (
    <div>
      <h1>Users assigned to {project.title}</h1>
      {users && users.map((user) => <div key={user.id}>{user.fullName}</div>)}
    </div>
  );
};

export default ProjectDetailUsersList;
