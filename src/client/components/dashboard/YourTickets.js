import React from "react";
import { Link } from "react-router-dom";

const YourTickets = () => {
  return (
    <div className="main">
      <Link to="/home">Back</Link>
      <h1>your tickets</h1>
    </div>
  );
};

export default YourTickets;
