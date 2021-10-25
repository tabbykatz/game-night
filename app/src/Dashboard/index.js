import * as React from "react";

import Games from "../Games";

import styles from "./styles.module.scss";

const Dashboard = () => {
  return (
    <>
      <h1>Your Recently Added Games</h1>
      <button className={styles.button}>View All</button>
      <button className={styles.button}>Add Game</button>
      <Games limit={6} />

      <h1>Upcoming Events</h1>
      <button className={styles.button}>View All</button>
      <button className={styles.button}>Create Event</button>
    </>
  );
};
export default Dashboard;
