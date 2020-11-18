import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ItemTypes } from "../ItemTypes";
import { useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

// components
import YourGraph from "./graphs/YourGraph";
import TypeGraph from "./graphs/TypeGraph";
import StatusGraph from "./graphs/StatusGraph";
import PriorityGraph from "./graphs/PriorityGraph";

// css
import "./ticketInfoCard.css";

// materialui
import Typography from "@material-ui/core/Typography";

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

  const displayedData =
    type === "PRIORITY" ? (
      <PriorityGraph />
    ) : type === "TYPE" ? (
      <TypeGraph />
    ) : type === "STATUS" ? (
      <StatusGraph />
    ) : type === "YOURS" ? (
      <YourGraph />
    ) : (
      <h1>Not a valid type</h1>
    );

  return (
    <Link
      to={`/home/${text.toLowerCase().split(" ").join("-")}`}
      className={classes}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      ref={(node) => drag(drop(node))}
    >
      {displayedData}
      <div className="tag">
        <Typography variant="h2">{text}</Typography>
      </div>
    </Link>
  );
};

export default TicketInfoCard;
