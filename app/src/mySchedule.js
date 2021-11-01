import * as React from "react";

import { toast } from "react-hot-toast";

import useApi from "./auth/useApi";

const MyEventsContext = React.createContext();

export const MyEventsProvider = (props) => {
  const { loading, apiClient } = useApi();
  const [myEvents, setMyEvents] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  const loadUsers = React.useCallback(
    async () => setUsers(await apiClient.getUsers()),
    [apiClient],
  );
  const loadEvents = React.useCallback(async () => {
    setMyEvents(await apiClient.getEvents());
  }, [apiClient]);

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
    };
  };

  const addUserToEvent = (userEmail, eventId) => {
    console.log(users);
    const user = Object.values(users).filter(
      (user) => user.email === userEmail,
    );
    apiClient.addUserToEvent(user[0].id, eventId).then(loadEvents);
  };

  return (
    <MyEventsContext.Provider
      value={{
        myEvents,
        addEvent,
        deleteEvent,
        eventById,
        getAttendee,
        addUserToEvent,
      }}
      {...props}
    />
  );
};

export const useMyEvents = () => React.useContext(MyEventsContext);
