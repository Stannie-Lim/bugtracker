import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import update from "immutability-helper";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";

// css
import "./home.css";

// cards
import TicketInfoCard from "./cards/TicketInfoCard";

// store
import { getTickets } from "../../store/store";

const Home = () => {
  const [cards, setCards] = useState([
    { id: 1, text: "Tickets by priority", type: "PRIORITY" },
    { id: 2, text: "Tickets by type", type: "TYPE" },
    { id: 3, text: "Tickets by status", type: "STATUS" },
    { id: 4, text: "Your current tickets", type: "YOURS" },
  ]);
  const moveCard = (id, atIndex) => {
    const { card, index } = findCard(id);
    setCards(
      update(cards, {
        $splice: [
          [index, 1],
          [atIndex, 0, card],
        ],
      })
    );
  };

  const findCard = (id) => {
    const card = cards.find((card) => card.id === id);
    return {
      card,
      index: cards.indexOf(card),
    };
  };

  const [, drop] = useDrop({ accept: ItemTypes.CARD });

  const dispatch = useDispatch();
  const findTickets = async () => {
    dispatch(getTickets());
  };

  useEffect(() => {
    findTickets();
  }, []);

  return (
    <main className="main">
      <div ref={drop} className="ticket-cards">
        {cards.map((card) => (
          <TicketInfoCard
            key={card.id}
            moveCard={moveCard}
            findCard={findCard}
            id={card.id}
            text={card.text}
            type={card.type}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
