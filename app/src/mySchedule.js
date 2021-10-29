import * as React from "react";

import { toast } from "react-hot-toast";

import useApi from "./auth/useApi";

const MyEventsContext = React.createContext();

export const MyEventsProvider = (props) => {
  const { loading, apiClient } = useApi();
  const [myEvents, setMyEvents] = React.useState([]);

  const loadEvents = React.useCallback(async () => {
    setMyEvents(await apiClient.getEvents());
  }, [apiClient]);

  React.useEffect(() => {
    !loading && loadEvents();
  }, [loading, loadEvents]);

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

  return (
    <MyEventsContext.Provider
      value={{ myEvents, addEvent, deleteEvent, eventById }}
      {...props}
    />
  );
};

export const useMyEvents = () => React.useContext(MyEventsContext);
