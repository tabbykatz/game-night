import * as React from "react";

import { toast } from "react-hot-toast";

import useApi from "./auth/useApi";
import useAuth0 from "./auth/useAuth0";

const MyEventsContext = React.createContext();

export const MyEventsProvider = (props) => {
  const { loading, apiClient } = useApi();
  const { user } = useAuth0();
  const [myEvents, setMyEvents] = React.useState([]);

  const loadEvents = React.useCallback(async () => {
    setMyEvents(await apiClient.getEvents());
  }, [apiClient]);

  // const isOwner = (event) => {
  //   return event.owner_id === user.id;
  // };

  //TODO: really lost track of what i need when and how to organize it all
  // what if events_games was just part of the event object?
  // when and how can i call this function?
  // const listGames = async (id) => {
  // setEventGames(await apiClient.getGamesByEvent(id));
  //};
  // list of games for an event that knows who owns each game

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

  // const getAttendee = (id) => {
  //   const user = users[id];
  //   return {
  //     name: `${user.given_name} ${user.family_name}`,
  //     email: user.email,
  //     picture: user.picture,
  //     id: user.id,
  //   };
  // };

  return (
    <MyEventsContext.Provider
      value={{
        myEvents,
        addEvent,
        //eventGames,
        deleteEvent,
      }}
      {...props}
    />
  );
};

export const useMyEvents = () => React.useContext(MyEventsContext);
