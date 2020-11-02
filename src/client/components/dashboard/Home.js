import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import React, { useState } from "react";
import update from "immutability-helper";

// css
import "./home.css";

// cards
import TicketInfoCard from "./cards/TicketInfoCard";

const Home = () => {
  const [cards, setCards] = useState([
    { id: 1, text: "Tickets by priority", image: "" },
    { id: 2, text: "Tickets by type", image: "" },
    { id: 3, text: "Tickets by status", image: "" },
    { id: 4, text: "Your current tickets", image: "" },
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

  return (
    <main>
      <div ref={drop} className="main">
        {cards.map((card) => (
          <TicketInfoCard
            key={card.id}
            moveCard={moveCard}
            findCard={findCard}
            id={card.id}
            text={card.text}
            image={card.image}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
