import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// sort
import sortByType from "../sorts/sortByType";

const TypeTickets = () => {
  const tickets = useSelector(({ tickets }) => sortByType(tickets));
  return null;
};

export default TypeTickets;
