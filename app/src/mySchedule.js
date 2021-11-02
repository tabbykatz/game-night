import * as React from "react";

import { toast } from "react-hot-toast";

import useApi from "./auth/useApi";
import useAuth0 from "./auth/useAuth0";

const MyEventsContext = React.createContext();

export const MyEventsProvider = (props) => {
  const { loading, apiClient } = useApi();
  const { user } = useAuth0();
  const [myEvents, setMyEvents] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  //const [eventGames, setEventGames] = React.useState([]);

  const loadUsers = React.useCallback(
    async () => setUsers(await apiClient.getUsers()),
    [apiClient],
  );

  const loadEvents = React.useCallback(async () => {
    setMyEvents(await apiClient.getEvents());
  }, [apiClient]);

  const isOwner = (event) => {
    return event.owner_id === user.id;
  };

  //TODO: really lost track of what i need when and how to organize it all
  // what if events_games was just part of the event object?
  // when and how can i call this function?
  // const listGames = async (id) => {
  // setEventGames(await apiClient.getGamesByEvent(id));
  //};
  // list of games for an event that knows who owns each game

  React.useEffect(() => {
    !loading && loadEvents() && loadUsers();
  }, [loading, loadEvents, loadUsers]);

  const addEvent = (event) => {
    apiClient.addEvent(event).then(loadEvents);
  };

  const deleteEvent = (event) => {
    apiClient.deleteEvent(event.id).then(loadEvents);
    toast("Event deleted!");
  };

  const eventById = (id) => {
    return myEvents.filter((event) => event.id === +id);
  };

  const getAttendee = (id) => {
    const user = users[id];
    return {
      name: `${user.given_name} ${user.family_name}`,
      email: user.email,
      picture: user.picture,
      id: user.id,
    };
  };

  const addUserToEvent = (userEmail, eventId) => {
    const user = Object.values(users).filter(
      (user) => user.email === userEmail,
    );
    // TODO: wow. this is a mess. fix it.
    if (!user.length) {
      toast("User not found!");
      return;
    }
    if (eventById(eventId)[0].events_users.includes(user[0].id)) {
      toast("User already added!");
      return;
    }
    if (user.length > 1) {
      toast("Multiple users found!");
      return;
    }
    apiClient.addUserToEvent(user[0].id, eventId).then(loadEvents);
  };

  return (
    <MyEventsContext.Provider
      value={{
        myEvents,
        addEvent,
        //eventGames,
        deleteEvent,
        eventById,
        getAttendee,
        addUserToEvent,
        isOwner,
      }}
      {...props}
    />
  );
};

export const useMyEvents = () => React.useContext(MyEventsContext);
