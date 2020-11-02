import React from "react";

// css
import "./home.css";

// cards
import TicketInfoCard from "../cards/TicketInfoCard";

const Home = () => {
  return (
    <main className="main">
      <TicketInfoCard />
      <TicketInfoCard />
      <TicketInfoCard />
      <TicketInfoCard />
    </main>
  );
};

export default Home;
