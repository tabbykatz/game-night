import * as React from "react";

import { useParams } from "react-router-dom";

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
              <li key={id}>
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
        <button>Add Attendee</button>
      </form>
    </>
  ) : (
    <NotFound />
  );
};

export default EventDetails;