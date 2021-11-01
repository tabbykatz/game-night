import * as React from "react";

import { Link } from "react-router-dom";

import EventList from "../components/EventList";
import GameList from "../components/GameList";
import { useMyGames } from "../myCollection";
import { useMyEvents } from "../mySchedule";

const Dashboard = () => {
  const { myGames } = useMyGames();
  const { myEvents } = useMyEvents();

  return (
    <>
      <h1>Your Recently Added Games</h1>
      <Link to="/search">Add a Game</Link>
      <br />
      <Link to="/games">View All</Link>

      <GameList games={myGames.slice(0, 6)} />

      <h1>Upcoming Events</h1>
      <Link to="/events/create">Create an Event</Link>
      <br />
      <Link to="/events">View All</Link>

      <EventList events={myEvents.slice(0, 6)} />
    </>
  );
};
export default Dashboard;
