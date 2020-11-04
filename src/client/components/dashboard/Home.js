import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import update from "immutability-helper";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// css
import "./home.css";

// cards
import TicketInfoCard from "./cards/TicketInfoCard";

// store
import { getTickets, setTicketCardOrder } from "../../store/store";

const DEFAULT_ORDER = [
  { id: 1, text: "Tickets by priority", type: "PRIORITY" },
  { id: 2, text: "Tickets by type", type: "TYPE" },
  { id: 3, text: "Tickets by status", type: "STATUS" },
  { id: 4, text: "Your assigned tickets", type: "YOURS" },
];

const Home = () => {
  const [cards, setCards] = useState(DEFAULT_ORDER);

  const dispatch = useDispatch();
  const moveCard = (id, atIndex) => {
    const { card, index } = findCard(id);
    const newCardOrder = update(cards, {
      $splice: [
        [index, 1],
        [atIndex, 0, card],
      ],
    });
    setCards(newCardOrder);
    const newOrder = newCardOrder.map((card) => card.id);
    dispatch(setTicketCardOrder(newOrder));
  };

  const findCard = (id) => {
    const card = cards.find((card) => card.id === id);
    return {
      card,
      index: cards.indexOf(card),
    };
  };

  const [, drop] = useDrop({ accept: ItemTypes.CARD });

  const findTickets = async () => {
    dispatch(getTickets());
  };

  const cardOrder = useSelector(({ user }) => user.cardOrder);
  const getCardOrder = () => {
    const copyOfCardOrder = cards.slice();
    for (let i = 0; i < copyOfCardOrder.length; i++) {
      const currentCard = cardOrder[i];
      if (copyOfCardOrder[i].id !== currentCard) {
        copyOfCardOrder[i] = DEFAULT_ORDER.find(
          (order) => order.id === currentCard
        );
      }
    }
    setCards(copyOfCardOrder);
  };

  useEffect(() => {
    getCardOrder();
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
            status={card.status}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
