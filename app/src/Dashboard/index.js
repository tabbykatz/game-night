import * as React from "react";

import { Link } from "react-router-dom";

import Events from "../Events";
import Games from "../Games";

import styles from "./styles.module.scss";

const Dashboard = () => {
  return (
    <>
      <h1>Your Recently Added Games</h1>
      <Link to="/search">Add a Game</Link>
      <br />
      <Link to="/games">View All</Link>
      <Games limit={6} />

      <h1>Upcoming Events</h1>
      <Link to="/events/create">Create an Event</Link>
      <br />
      <Link to="/events">View All</Link>

      <Events limit={6} />
    </>
  );
};
export default Dashboard;
