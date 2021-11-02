import * as React from "react";

import { Link, useParams } from "react-router-dom";

import GameList from "../components/GameList";
import NotFound from "../components/NotFound";
import { useMyEvents } from "../mySchedule";

import styles from "./styles.module.scss";

const EventDetails = () => {
  const { id } = useParams();
  const { eventById, getAttendee, addUserToEvent } = useMyEvents();
  const event = { ...eventById(id)[0] };

  const onSubmit = (e) => {
    e.preventDefault();
    addUserToEvent(e.currentTarget.elements.email.value, id);
  };
  return event.id ? (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>{event.title}</h1>
          <h1>{event.name}</h1>
          <p>{event.description}</p>
          <address>{event.address}</address>
          <p>attending:</p>
          <ul>
            {event.events_users.map((id) => {
              const user = getAttendee(id);
              return (
                <>
                  <div className={styles.hex}>
                    <img src={user.picture} alt="" />
                  </div>
                  <li key={user.id}>
                    {user.name}, {user.email}
                  </li>
                </>
              );
            })}
          </ul>
          <form {...{ onSubmit }}>
            <label htmlFor="attendee">
              <input type="text" name="email" placeholder="email" />
            </label>
            <button>Add attendee</button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>Games</h1>
          <p>
            Here are the games you can expect at the event! Add or edit your
            own.
          </p>
          {/* <GameList games={eventGames} /> */}
        </div>
      </div>
    </>
  ) : (
    <NotFound />
  );
};

export default EventDetails;
