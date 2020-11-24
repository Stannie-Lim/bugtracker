import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ResponsiveNetwork } from "@nivo/network";

// sort
import sortByType from "../sorts/sortByType";

const TYPE_BUBBLE_SIZE = 20;
const MAIN_BUBBLE_SIZE = 30;
const TICKET_BUBBLE_SIZE = 12;

const ORIGIN_CONNECTION_DISTANCE = 30;
const TICKETS_CONNECTION_DISTANCE = 30;

const TICKET_BUBBLE_DEPTH = 10;

const TypeTickets = () => {
  const tickets = useSelector(({ tickets }) => sortByType(tickets));

  const data = {
    nodes: [
      {
        id: "Tickets By Type",
        radius: MAIN_BUBBLE_SIZE,
        depth: 0,
        color: "rgb(244, 117, 96)",
      },
      {
        id: "Feature Request",
        radius: TYPE_BUBBLE_SIZE,
        depth: 1,
        color: "rgb(97, 205, 187)",
      },
      {
        id: "To Do",
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
      {
        id: "1.0",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "1.1",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "1.2",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "1.3",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "1.4",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "1.5",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "1.6",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "1.7",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "2.0",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "2.1",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "2.2",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "2.3",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "2.4",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "2.5",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "2.6",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "2.7",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "3.0",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "3.1",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "3.2",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "3.3",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "3.4",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "3.5",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "3.6",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "3.7",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "5.0",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "5.1",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "5.2",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "5.3",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "5.4",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
      {
        id: "5.5",
        radius: TICKET_BUBBLE_SIZE,
        depth: TICKET_BUBBLE_DEPTH,
        color: "rgb(232, 193, 160)",
      },
    ],
    links: [
      {
        source: "Tickets By Type",
        target: "Feature Request",
        distance: ORIGIN_CONNECTION_DISTANCE,
      },
      {
        source: "Feature Request",
        target: "1.0",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "Feature Request",
        target: "1.1",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "Feature Request",
        target: "1.2",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "Feature Request",
        target: "1.3",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "Feature Request",
        target: "1.4",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "Feature Request",
        target: "1.5",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "Feature Request",
        target: "1.6",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "Feature Request",
        target: "1.7",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "Tickets By Type",
        target: "To Do",
        distance: ORIGIN_CONNECTION_DISTANCE,
      },
      {
        source: "To Do",
        target: "2.0",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "To Do",
        target: "2.1",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "To Do",
        target: "2.2",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "To Do",
        target: "2.3",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "To Do",
        target: "2.4",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "To Do",
        target: "2.5",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "To Do",
        target: "2.6",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "To Do",
        target: "2.7",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "Tickets By Type",
        target: "Error",
        distance: ORIGIN_CONNECTION_DISTANCE,
      },
      {
        source: "Error",
        target: "3.0",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "Error",
        target: "3.1",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "Error",
        target: "3.2",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "Error",
        target: "3.3",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "Error",
        target: "3.4",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "Error",
        target: "3.5",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "Error",
        target: "3.6",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "Error",
        target: "3.7",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "Tickets By Type",
        target: "Bug",
        distance: ORIGIN_CONNECTION_DISTANCE,
      },
      {
        source: "Bug",
        target: "5.0",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "Bug",
        target: "5.1",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "Bug",
        target: "5.2",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "Bug",
        target: "5.3",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "Bug",
        target: "5.4",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
      {
        source: "Bug",
        target: "5.5",
        distance: TICKETS_CONNECTION_DISTANCE,
      },
    ],
  };

  console.log(data);

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
