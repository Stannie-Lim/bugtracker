import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import React, { useState } from "react";
import update from "immutability-helper";

// css
import "./home.css";

// cards
import TicketInfoCard from "./cards/TicketInfoCard";

const Home = () => {
  const [cards, setCards] = useState([1, 2, 3, 4]);
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
    const card = cards.find((card) => card === id);
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
            key={card}
            moveCard={moveCard}
            findCard={findCard}
            id={card}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
