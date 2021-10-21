import * as React from "react";

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

  return { myGames, loadGames };
};