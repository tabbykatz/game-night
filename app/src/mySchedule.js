import * as React from "react";

import { toast } from "react-hot-toast";

import useApi from "./auth/useApi";

const MyEventsContext = React.createContext();

export const MyEventsProvider = (props) => {
  const { loading, apiClient } = useApi();
  const [myEvents, setMyEvents] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);

  const loadEvents = React.useCallback(async () => {
    setMyEvents(await apiClient.getEvents());
  }, [apiClient]);

  const loadUsers = React.useCallback(async () => {
    setAllUsers(await apiClient.getUsers());
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

  const validateUser = (userEmail) =>
    allUsers.some((user) => user.email === userEmail);

  return (
    <MyEventsContext.Provider
      value={{
        myEvents,
        addEvent,
        validateUser,
        deleteEvent,
      }}
      {...props}
    />
  );
};

export const useMyEvents = () => React.useContext(MyEventsContext);
