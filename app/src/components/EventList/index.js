import * as React from "react";

import { Link } from "react-router-dom";

import { useMyEvents } from "../../mySchedule";

import styles from "./styles.module.scss";

const EventList = ({ events }) => (
  <>
    <ul className={styles.grid}>
      {events.map((event) => (
        <li className={styles.card} key={event.id}>
          <Card {...{ event }} />
        </li>
      ))}
    </ul>
  </>
);

const Card = ({ event }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <div key={event.id} className={`${styles.box} ${styles.dropshadow}`}>
          <header>
            <Link to={`/events/${event.id}`}>{event.name}</Link>
          </header>
        </div>
      </div>
    </>
  );
};

export default EventList;
