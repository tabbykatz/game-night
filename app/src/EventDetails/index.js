import * as React from "react";

import { Link, useParams } from "react-router-dom";

import useApi from "../auth/useApi";
import useAuth0 from "../auth/useAuth0";
import EventGameList from "../components/EventGameList";
import NotFound from "../components/NotFound";

import styles from "./styles.module.scss";

const EventDetails = () => {
  const { id } = useParams();
  const { loading, apiClient } = useApi();
  const [event, setEvent] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);

  const loadEvent = React.useCallback(
    async (id) => {
      setEvent(await apiClient.getEventById(id));
    },
    [apiClient],
  );

  const loadUser = React.useCallback(async () => {
    apiClient.getUser().then(setCurrentUser);
  }, [apiClient]);

  React.useEffect(() => {
    !loading && loadEvent(id) && loadUser();
  }, [id, loadEvent, loading, loadUser]);

  const onSubmit = (e) => {
    e.preventDefault();
    apiClient
      .addUserToEvent(e.currentTarget.elements.email.value, +event.id)
      .then(loadEvent(id));
  };

  const isEventOwner = () => {
    console.log({ currentUser, event });
    return currentUser === event.owner_id;
  };

  const removeGame = (gameId) => {
    apiClient.removeGameFromEvent(gameId, event.id).then(loadEvent(id));
  };

  const addGame = (gameId) => {
    apiClient.addGameToEvent(gameId, event.id).then(loadEvent(id));
  };

  return event ? (
    <>
      <pre>{JSON.stringify(event, null, 2)}</pre>

      <div className={styles.container}>
        <div className={styles.left}>
          <h1>{event.name}</h1>
          <p>Starts at: {new Date(event.start_time).toLocaleString()}</p>
          <p>{event.description}</p>
          <address>
            {event.address}
            <br />
            {event.city}, {event.state}
            <br />
            {event.zip}
          </address>
          <p>attending:</p>
          <ul>
            {event.attendees.map((attendee) => {
              return (
                <>
                  <div className={styles.hex}>
                    <img src={attendee.picture} alt="" />
                  </div>
                  <li key={attendee.id}>
                    {attendee.id === event.owner_id ? "Host: " : null}
                    {attendee.given_name}, {attendee.email}
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
          {isEventOwner() ? (
            <>
              <button>Edit Event</button>
              <button>Delete Event</button>
            </>
          ) : null}
        </div>
        <div className={styles.right}>
          <h1>Games</h1>
          <p>
            Here are the games you can expect at the event! Add or edit your
            own.
          </p>
          <EventGameList
            games={event.games}
            {...{ removeGame, addGame, currentUser }}
          />
        </div>
      </div>
    </>
  ) : (
    <NotFound />
  );
};

export default EventDetails;
