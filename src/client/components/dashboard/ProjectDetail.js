import React, { useEffect } from "react";

const ProjectDetail = ({ match }) => {
  useEffect(() => {
    const url = match.params.projectId;
    console.log(url);
  }, []);
  return (
    <div className="main">
      <h1>HI</h1>
    </div>
  );
};

export default ProjectDetail;
