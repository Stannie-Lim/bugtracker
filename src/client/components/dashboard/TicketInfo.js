import React from "react";
import { Link } from "react-router-dom";

const TicketInfo = ({ match }) => {
  const type = match.params.filter;

  return (
    <div className="main">
      <Link to="/home">Back</Link>
      <h1>{type}</h1>
    </div>
  );
};

export default TicketInfo;
