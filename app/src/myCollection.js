import * as React from "react";

import { toast } from "react-hot-toast";

import useApi from "./auth/useApi";

const MyGamesContext = React.createContext();

export const MyGamesProvider = (props) => {
  const { loading, apiClient } = useApi();
  const [myGames, setMyGames] = React.useState([]);

  const loadGames = React.useCallback(async () => {
    setMyGames(await apiClient.getGames());
  }, [apiClient]);

  React.useEffect(() => {
    !loading && loadGames();
  }, [loading, loadGames]);

  const addGame = (game) => {
    apiClient.addGame(game).then(loadGames);
    toast("Game added!");
  };

  const deleteGame = (game) => {
    apiClient.deleteGame(game.id).then(loadGames);
    toast("Game deleted!");
  };

  const isInMyGames = (id) => {
    const myGameIds = myGames.map((game) => game.id);
    return myGameIds.includes(id);
  };

  return (
    <MyGamesContext.Provider
      value={{ myGames, addGame, deleteGame, isInMyGames }}
      {...props}
    />
  );
};

export const useMyGames = () => React.useContext(MyGamesContext);
