import * as React from "react";

import { Link } from "react-router-dom";

import { useMyEvents } from "../../mySchedule";

import styles from "./styles.module.scss";

const eventImages = [
  "./game_1.jpeg",
  "./game_2.jpeg",
  "./game_3.jpeg",
  "./game_4.jpeg",
  "./game_5.jpeg",
  "./game_6.jpeg",
  "./game_7.jpeg",
  "./game_8.jpeg",
];

const EventList = ({ events }) => {
  return events.length ? (
    <>
      <ul className={styles.grid}>
        {events.map((event) => (
          <li className={styles.card} key={event.id}>
            <Card {...{ event }} />
          </li>
        ))}
      </ul>
    </>
  ) : (
    <p>No events found.</p>
  );
};

const Card = ({ event }) => {
  const randomImage = () =>
    eventImages[Math.floor(Math.random() * eventImages.length)];

  return (
    <>
      <div className={styles.wrapper}>
        <div key={event.id} className={`${styles.box} ${styles.dropshadow}`}>
          <header>
            <Link to={`/events/${event.id}`}>{event.name}</Link>
          </header>
          <img src={randomImage()} alt="" />
        </div>
      </div>
    </>
  );
};

export default EventList;
