import * as React from "react";

import toast, { Toaster } from "react-hot-toast";

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
    <>
      <h1>list of all games with remove buttons plus +add a game</h1>
      <section>
        <GameList {...{ games }} />
      </section>
    </>
  );
};
const GameCard = ({ game }) => {
  const onClick = () => {
    // TODO: make this real
    toast("Game Removed!");
  };
  return (
    <>
      <section key={game.id} className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.name}>{game.name}</h1>
        </header>
        <img
          src={game.thumbnail_url}
          alt={game.name}
          className={styles.cardthumb}
        />

        <button {...{ onClick }}>Remove</button>
      </section>
    </>
  );
};
const GameList = ({ games }) => (
  <ul className={styles.grid}>
    {games.map((game) => (
      <li className={styles.card}>
        <GameCard {...{ game }} />
      </li>
    ))}
  </ul>
);

export default Games;
