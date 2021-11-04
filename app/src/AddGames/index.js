import * as React from "react";

import { Link, useParams } from "react-router-dom";

import useApi from "../auth/useApi";
import EventGameList from "../components/EventGameList";
import { useMyGames } from "../myCollection";

const AddGames = () => {
  const { id } = useParams();
  const { loading, apiClient } = useApi();
  const { myGames } = useMyGames();
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

  const removeGame = (gameId) => {
    apiClient.removeGameFromEvent(gameId, event.id).then(loadEvent(id));
  };

  const addGame = (gameId) => {
    apiClient.addGameToEvent(gameId, event.id).then(loadEvent(id));
  };

  const isAlreadyComing = (gameId) => {
    const gamesList = event.games.map(
      (game) => game.id === gameId && game.owner !== currentUser,
    );
    return gamesList.includes(true);
  };

  const imBringing = (gameId) => {
    return event.games.some(
      (game) => game.id === gameId && game.owner === currentUser,
    );
  };

  return (
    <>
      {" "}
      {event ? (
        <h1>Add games from your library that you'll bring to {event.name} </h1>
      ) : null}
      <EventGameList
        games={myGames}
        {...{ isAlreadyComing, addGame, removeGame, imBringing }}
      />
    </>
  );
};

export default AddGames;
