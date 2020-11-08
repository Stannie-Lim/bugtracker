import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ItemTypes } from "../ItemTypes";
import { useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

// components
import PriorityGraph from "./graphs/PriorityGraph";
import TypeGraph from "./graphs/TypeGraph";

// css
import "./ticketInfoCard.css";

const TicketInfoCard = ({ id, moveCard, findCard, text, type }) => {
  const [hover, setHover] = useState(false);

  const originalIndex = findCard(id).index;

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveCard(droppedId, originalIndex);
      }
    },
  });
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findCard(id);
        moveCard(draggedId, overIndex);
      }
    },
  });

  const classes = hover
    ? "ticket-info-card scale-up-center"
    : "ticket-info-card scale-down-center";

  const tickets = useSelector(({ tickets }) => tickets);
  const userId = useSelector(({ user }) => user.id);
  const displayedData = () => {
    switch (type) {
      case "PRIORITY":
        return <PriorityGraph />;
      case "TYPE":
        const categorizedByType = {
          BUG: 0,
          ERROR: 0,
          FEATURE_REQUEST: 0,
          "TO-DO": 0,
        };

        for (const ticket of tickets) {
          categorizedByType[ticket.type]++;
        }

        return <TypeGraph />;
      case "STATUS":
        const categorizedByStatus = {
          OPEN: 0,
          IN_PROGRESS: 0,
          RESOLVED: 0,
        };

        for (const ticket of tickets) {
          categorizedByStatus[ticket.status]++;
        }

        return (
          <div>
            {Object.entries(categorizedByStatus).map(([category, count]) => (
              <div key={category}>{`${category}: ${count}`}</div>
            ))}
          </div>
        );
      case "YOURS":
        const yourTickets = [];
        for (const ticket of tickets) {
          if (ticket.userId === userId) yourTickets.push(ticket);
        }

        return (
          <div>
            <h1>You have {yourTickets.length} tickets.</h1>
          </div>
        );
      default:
        return <h1>Not a valid type</h1>;
    }
  };

  return (
    <Link
      to={`/home/${text.toLowerCase().split(" ").join("-")}`}
      className={classes}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      ref={(node) => drag(drop(node))}
    >
      {displayedData()}
      <div className="tag">
        <h1>{text}</h1>
      </div>
    </Link>
  );
};

export default TicketInfoCard;
