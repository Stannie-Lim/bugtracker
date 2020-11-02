import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../ItemTypes";

// css
import "./ticketInfoCard.css";

const TicketInfoCard = ({ id, moveCard, findCard, text, image }) => {
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

  return (
    <div className="ticket-info-card" ref={(node) => drag(drop(node))}>
      <div className="tag">
        <h1>{text}</h1>
      </div>
    </div>
  );
};

export default TicketInfoCard;
