import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ItemTypes } from "../ItemTypes";
import { useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

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

  const displayedData = () => {
    switch (type) {
      case "PRIORITY":
        const categorizedByPriority = {
          NONE: 0,
          LOW: 0,
          MEDIUM: 0,
          HIGH: 0,
        };

        for (const ticket of tickets) {
          categorizedByPriority[ticket.priority]++;
        }

        return (
          <div>
            {Object.entries(categorizedByPriority).map(([category, count]) => (
              <div key={category}>{`${category}: ${count}`}</div>
            ))}
          </div>
        );
      case "TYPE":
        //     values: ["BUG", "ERROR", "FEATURE_REQUEST", "TO-DO"],

        const categorizedByType = {
          BUG: 0,
          ERROR: 0,
          FEATURE_REQUEST: 0,
          "TO-DO": 0,
        };

        for (const ticket of tickets) {
          categorizedByType[ticket.type]++;
        }

        return (
          <div>
            {Object.entries(categorizedByType).map(([category, count]) => (
              <div key={category}>{`${category}: ${count}`}</div>
            ))}
          </div>
        );
      case "STATUS":
        return <h1>status</h1>;
      case "YOURS":
        return <h1>yours</h1>;
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
