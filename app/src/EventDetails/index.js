import * as React from "react";

import { enGB } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import { Link, useParams } from "react-router-dom";

import useApi from "../auth/useApi";
import EventGameList from "../components/EventGameList";
import NotFound from "../components/NotFound";

import styles from "./styles.module.scss";

const EventDetails = () => {
  const { id } = useParams();
  const { loading, apiClient } = useApi();
  const [event, setEvent] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());

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
  const editEvent = (e) => {
    const objectFromFormData = (form) =>
      Object.fromEntries(new FormData(form).entries());

    const form = e.currentTarget;
    const newEvent = {
      ...objectFromFormData(form),
      start_time: startTime.toUTCString(),
      end_time: endTime.toUTCString(),
    };
    console.log(newEvent);
    e.preventDefault();
    apiClient.editEvent(newEvent, id);
    setIsEditing(false);
    loadEvent(id);
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
              <button onClick={() => setIsEditing(true)}>Edit Event</button>
              <button>Delete Event</button>
            </>
          ) : null}
          {isEditing ? (
            <form onSubmit={(e) => editEvent(e)} className={styles.form}>
              <label>
                Name Your Event
                <textarea name="name" required defaultValue={event.name} />
              </label>
              <label>
                Description
                <textarea
                  name="description"
                  required
                  defaultValue={event.description}
                />
              </label>
              <label>
                Address
                <input
                  name="address"
                  required
                  placeholder="123 Any Street"
                  autoComplete="street-address"
                  defaultValue={event.address}
                />
                <input
                  name="city"
                  required
                  placeholder="New York"
                  autoComplete="address-level2"
                  defaultValue={event.city}
                />
                <input
                  name="state"
                  required
                  placeholder="NY"
                  autoComplete="address-level1"
                  defaultValue={event.state}
                />
                <input
                  name="zip"
                  required
                  placeholder="10011"
                  autoComplete="postal-code"
                  defaultValue={event.zip}
                />
                <input
                  name="country"
                  required
                  placeholder="USA"
                  autoComplete="country"
                  defaultValue={event.country}
                />
              </label>

              {/* I dont know how to include a label or similar for the date picker */}
              <DatePicker
                date={startTime}
                onDateChange={setStartTime}
                locale={enGB}
                format="dd/MM/yyyy HH:mm"
              >
                {({ inputProps, focused }) => (
                  <input
                    className={"input" + (focused ? " -focused" : "")}
                    {...inputProps}
                  />
                )}
              </DatePicker>
              <DatePicker
                date={endTime}
                onDateChange={setEndTime}
                locale={enGB}
                format="dd/MM/yyyy HH:mm"
              >
                {({ inputProps, focused }) => (
                  <input
                    className={"input" + (focused ? " -focused" : "")}
                    {...inputProps}
                  />
                )}
              </DatePicker>
              <button>Update event</button>
            </form>
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
