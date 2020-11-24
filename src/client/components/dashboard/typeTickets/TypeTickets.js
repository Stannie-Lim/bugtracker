import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ResponsiveNetwork } from "@nivo/network";
import React, { useState, useEffect } from "react";
import { capitalize } from "../../../utils/common";

// sort
import sortByType from "../sorts/sortByType";

const TYPE_BUBBLE_SIZE = 20;
const MAIN_BUBBLE_SIZE = 30;
const TICKET_BUBBLE_SIZE = 12;

const ORIGIN_CONNECTION_DISTANCE = 30;
const TICKETS_CONNECTION_DISTANCE = 30;

const TICKET_BUBBLE_DEPTH = 10;

const data = {
  nodes: [
    {
      id: "Tickets by type",
      radius: MAIN_BUBBLE_SIZE,
      depth: 0,
      color: "rgb(244, 117, 96)",
    },
    {
      id: "Feature request",
      radius: TYPE_BUBBLE_SIZE,
      depth: 1,
      color: "rgb(97, 205, 187)",
    },
    {
      id: "To do",
      radius: TYPE_BUBBLE_SIZE,
      depth: 1,
      color: "rgb(97, 205, 187)",
    },
    {
      id: "Error",
      radius: TYPE_BUBBLE_SIZE,
      depth: 1,
      color: "rgb(97, 205, 187)",
    },
    {
      id: "Bug",
      radius: TYPE_BUBBLE_SIZE,
      depth: 1,
      color: "rgb(97, 205, 187)",
    },
  ],
  links: [
    {
      source: "Tickets by type",
      target: "Feature request",
      distance: ORIGIN_CONNECTION_DISTANCE,
    },
    {
      source: "Tickets by type",
      target: "To do",
      distance: ORIGIN_CONNECTION_DISTANCE,
    },
    {
      source: "Tickets by type",
      target: "Error",
      distance: ORIGIN_CONNECTION_DISTANCE,
    },
    {
      source: "Tickets by type",
      target: "Bug",
      distance: ORIGIN_CONNECTION_DISTANCE,
    },
  ],
};

const TypeTickets = () => {
  const tickets = useSelector(({ tickets }) => sortByType(tickets));

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const categorized = {
      BUG: [],
      ERROR: [],
      FEATURE_REQUEST: [],
      "TO-DO": [],
    };

    for (const ticket of tickets) {
      const { type } = ticket;
      categorized[type].push(ticket);
    }

    for (const category in categorized) {
      for (const ticket of categorized[category]) {
        data.nodes.push({
          id: ticket.id,
          radius: TICKET_BUBBLE_SIZE,
          depth: TICKET_BUBBLE_DEPTH,
          color: "rgb(232, 193, 160)",
        });

        data.links.push({
          source: capitalize(category),
          target: ticket.id,
          distance: TICKETS_CONNECTION_DISTANCE,
        });
      }
    }
  };

  console.log(tickets);

  return (
    <div>
      <div style={{ height: "100vh" }}>
        <ResponsiveNetwork
          nodes={data.nodes}
          links={data.links}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          repulsivity={200}
          iterations={60}
          nodeColor={function (e) {
            return e.color;
          }}
          nodeBorderWidth={1}
          nodeBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
          linkThickness={function (e) {
            return 2 * (2 - e.source.depth);
          }}
          motionStiffness={160}
          motionDamping={12}
        />
      </div>
    </div>
  );
};

export default TypeTickets;
