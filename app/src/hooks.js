import * as React from "react";

import { toast } from "react-hot-toast";

import useApi from "./auth/useApi";

export const useMyGames = () => {
  const [myGames, setMyGames] = React.useState([]);
  const { loading, apiClient } = useApi();
  const loadGames = React.useCallback(async () => {
    setMyGames(await apiClient.getGames());
  }, [apiClient]);

  React.useEffect(() => {
    !loading && loadGames();
  }, [loading, loadGames]);

  const addGame = (game) => {
    apiClient.addGame(game).then(() => loadGames());
    toast("Game added!");
  };

  const deleteGame = (game) => {
    apiClient.deleteGame(game.id).then(() => loadGames());
    toast("Game deleted!");
  };

  const isInMyGames = (id) => {
    const myGameIds = myGames.map((game) => game.id);
    return myGameIds.includes(id);
  };

  return { myGames, loadGames, addGame, deleteGame, isInMyGames };
};

export const useMyEvents = () => {
  const [myEvents, setMyEvents] = React.useState([]);
  const { loading, apiClient } = useApi();
  const loadEvents = React.useCallback(async () => {
    setMyEvents(await apiClient.getEvents());
  }, [apiClient]);

  React.useEffect(() => {
    !loading && loadEvents();
  }, [loading, loadEvents]);
  return { myEvents, loadEvents };
};
