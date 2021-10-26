import * as React from "react";

import { toast } from "react-hot-toast";

import useApi from "../auth/useApi";
import Card from "../components/Card";
import { useMyEvents } from "../hooks";

import styles from "./styles.module.scss";

const Events = ({ limit }) => {
  const { myEvents, loadEvents } = useMyEvents();
  const { apiClient } = useApi();

  const deleteEvent = (event) => {
    apiClient
      // TODO: make this real
      .deleteEvent(event.id)
      .then(loadEvents())
      .then(toast("Event removed!"));
  };

  const createEvent = (event) => {
    apiClient
      // TODO: make this real
      .createEvent(event)
      .then(loadEvents())
      .then(toast("Event created!"));
  };

  return myEvents ? (
    <>
      {/* TODO: Add a button to go to addevent */}
      <section>
        <EventsList events={myEvents} {...{ deleteEvent }} {...{ limit }} />
      </section>
    </>
  ) : null;
};

const EventsList = ({ events, deleteEvent, limit }) => {
  if (limit) {
    events = events.slice(0, limit);
  }
  return (
    <>
      <ul className={styles.grid}>
        {events.map((event) => (
          <li className={styles.card} key={event.id}>
            <Card
              game={event}
              handleClick={deleteEvent}
              isIn={true}
              action={"remove"}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Events;
