import * as React from "react";

import { Link } from "react-router-dom";

import useAuth0 from "../auth/useAuth0";
import EventList from "../components/EventList";
import GameList from "../components/GameList";
import { useMyGames } from "../myCollection";
import { useMyEvents } from "../mySchedule";

import styles from "./styles.module.scss";

const Dashboard = () => {
  const { isAuthenticated } = useAuth0();
  const { myGames } = useMyGames();
  const { myEvents } = useMyEvents();

  return isAuthenticated ? (
    <>
      <h1> Dashboard</h1>
      <h2> Recently Added Games</h2>
      <Link to="/search">Add a Game.</Link>
      <br />
      <Link to="/games">See your entire game collection.</Link>

      <GameList games={myGames.slice(0, 6)} />

      <h2>Upcoming Events</h2>
      <Link to="/events/create">Create an Event.</Link>
      <br />
      <Link to="/events">View all your events.</Link>

      <EventList events={myEvents.slice(0, 6)} />
    </>
  ) : (
    <>
      <div className={styles.home}>
        <ul>
          <li className={styles.tagline}>
            <img src="./logo.png" className={styles.logo} alt="" />
            <h1>Build your collection.</h1>
          </li>
          <li className={styles.tagline}>
            <h1>Create events and invite your friends.</h1>
            <img src="./logo.png" className={styles.logo} alt="" />
          </li>
          <li className={styles.tagline}>
            <img src="./logo.png" className={styles.logo} alt="" />
            <h1>See all the games coming to the event and add your own!</h1>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Dashboard;
