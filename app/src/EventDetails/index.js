import * as React from "react";

import { enGB } from "date-fns/locale";
import { toast } from "react-hot-toast";
import { FaMinusSquare } from "react-icons/fa";
import { DatePicker } from "react-nice-dates";
import { Link, useParams, useNavigate } from "react-router-dom";

import useApi from "../auth/useApi";
import GameList from "../components/GameList";
import NotFound from "../components/NotFound";
import { useMyEvents } from "../mySchedule";

import styles from "./styles.module.scss";

const EventDetails = () => {
  const { id } = useParams();
  const { loading, apiClient } = useApi();
  const navigate = useNavigate();
  const [event, setEvent] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());
  const { validateUser } = useMyEvents();

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
    const newUserEmail = e.currentTarget.elements.email.value;
    if (event.attendees.some((a) => a.email === newUserEmail)) {
      toast("User already attending event.");
      return;
    }
    if (validateUser(newUserEmail)) {
      apiClient.addUserToEvent(newUserEmail, +event.id).then(loadEvent(id));
    } else {
      toast("User doesn't exist.");
    }
    e.currentTarget.reset();
  };

  const deleteEvent = async (id) => {
    await apiClient.deleteEvent(event.id);
    navigate("/events");
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
    e.preventDefault();
    apiClient.editEvent(newEvent, id);
    setIsEditing(false);
    loadEvent(id);
  };

  const isEventOwner = () => {
    return currentUser === event.owner_id;
  };

  const removeAttendee = (userId) =>
    apiClient.removeUserFromEvent(id, userId).then(loadEvent(id));

  return !event ? (
    <p>Loading...</p>
  ) : event.error ? (
    <NotFound />
  ) : !isEditing ? (
    <>
      <h1>{event.name}</h1>
      {isEventOwner() ? (
        <>
          <button onClick={() => setIsEditing(true)}>Edit Event</button>
          <button onClick={() => deleteEvent(event.id)}>Delete Event</button>
        </>
      ) : null}
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
              <div key={attendee.id} className={styles.hex}>
                <img src={attendee.picture} alt="" />
              </div>
              <li>
                {attendee.id === event.owner_id ? "Host: " : null}
                {attendee.given_name},{" "}
                <a href={`mailto: ${attendee.email}`}>{attendee.email}</a>
                {isEventOwner() && attendee.id !== event.owner_id ? (
                  <FaMinusSquare
                    onClick={() => {
                      removeAttendee(attendee.id);
                    }}
                  />
                ) : null}
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

      <h1>Games</h1>
      <p>
        Here are the games you can expect at the event!{" "}
        <Link to={`/events/${event.id}/games`}>Add or edit your own.</Link>
      </p>
      <GameList games={event.games} event={true} />
    </>
  ) : (
    <form onSubmit={(e) => editEvent(e)} className={styles.form}>
      <label>
        Event Name
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
  );
};

export default EventDetails;
