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
    (id) => apiClient.getEventById(id).then(setEvent),
    [apiClient],
  );

  const loadUser = React.useCallback(
    () => apiClient.getUser().then(setCurrentUser),
    [apiClient],
  );

  React.useEffect(() => {
    !loading && loadEvent(id) && loadUser();
  }, [id, loadEvent, loading, loadUser]);

  const removeGame = (gameId) => {
    apiClient.removeGameFromEvent(event.id, gameId).then(loadEvent(id));
  };

  const isAlreadyComing = (gameId) => {
    const gamesList = event.games.map(
      (game) => game.id === gameId && game.owner !== currentUser,
    );
    return gamesList.includes(true);
  };

  const addGame = (gameId) => {
    apiClient.addGameToEvent(gameId, event.id).then(loadEvent(id));
  };

  const imBringing = (gameId) => {
    return event.games.some(
      (game) => game.id === gameId && game.owner === currentUser,
    );
  };

  return event ? (
    <>
      <h1>
        Add games from your library that you'll bring to{" "}
        <Link to={`/events/${event.id}`}>{event.name}</Link>
      </h1>
      <EventGameList
        games={myGames}
        {...{ isAlreadyComing, addGame, removeGame, imBringing }}
      />
    </>
  ) : null;
};

export default AddGames;
