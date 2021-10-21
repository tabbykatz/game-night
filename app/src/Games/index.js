import * as React from "react";

import toast, { Toaster } from "react-hot-toast";

import useApi from "../auth/useApi";
import { useMyGames } from "../hooks";

import styles from "./styles.module.scss";

const Games = () => {
  const { myGames, loadGames } = useMyGames();
  const { apiClient } = useApi();

  const deleteGame = (id) => {
    apiClient.deleteGame(id);
    loadGames();
    toast("Game removed!");
  };

  return myGames ? (
    <>
      <h1>list of all games with remove buttons plus +add a game</h1>
      <section>
        <GameList games={myGames} {...{ deleteGame }} />
      </section>
    </>
  ) : null;
};

const GameList = ({ games, deleteGame }) => (
  <ul className={styles.grid}>
    {games.map((game) => (
      <li className={styles.card}>
        <GameCard {...{ game, deleteGame }} />
      </li>
    ))}
  </ul>
);

const GameCard = ({ game, deleteGame }) => {
  const onClick = () => {
    deleteGame(game.id);
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

export default Games;
