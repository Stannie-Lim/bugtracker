import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ItemTypes } from "../ItemTypes";
import { useDrag, useDrop } from "react-dnd";

// css
import "./ticketInfoCard.css";

const TicketInfoCard = ({ id, moveCard, findCard, text, image }) => {
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

  return (
    <Link
      to={`/home/${text.toLowerCase().split(" ").join("-")}`}
      className={classes}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      ref={(node) => drag(drop(node))}
    >
      <div className="tag">
        <h1>{text}</h1>
      </div>
    </Link>
  );
};

export default TicketInfoCard;
