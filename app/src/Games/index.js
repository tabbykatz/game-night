import * as React from "react";

import useApi from "../auth/useApi";

import styles from "./styles.module.scss";

const Games = () => {
  const [games, setGames] = React.useState([]);
  const { loading, apiClient } = useApi();

  const loadGames = React.useCallback(
    async () => setGames(await apiClient.getGames()),
    [apiClient],
  );
  React.useEffect(() => {
    !loading && loadGames();
  }, [loading, loadGames]);

  return loading ? null : (
    <section>
      <GameList {...{ games }} />
    </section>
  );
};

const GameList = ({ games }) => (
  <ul className={styles.list}>
    {games.map(({ id, name, thumbnail_url }) => (
      <li key={id}>
        <img src={thumbnail_url} alt={name} width="300" />
        {name}
      </li>
    ))}
  </ul>
);

export default Games;
