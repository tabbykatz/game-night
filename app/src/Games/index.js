import * as React from "react";

import { toast } from "react-hot-toast";

import useApi from "../auth/useApi";
import { useMyGames } from "../hooks";

import styles from "./styles.module.scss";

const Games = () => {
  const { myGames, loadGames } = useMyGames();
  const { apiClient } = useApi();

  const deleteGame = (id) => {
    apiClient.deleteGame(id).then(loadGames());
    toast("Game removed!");
  };

  const showDetails = (id) => {
    // make a new call to get game obj
    toast("I'll work someday!");
  };

  return myGames ? (
    <>
      <h1>list of all games with remove buttons plus +add a game</h1>
      <section>
        <GameList games={myGames} {...{ deleteGame, showDetails }} />
      </section>
    </>
  ) : null;
};

const GameList = ({ games, deleteGame, showDetails }) => (
  <ul className={styles.grid}>
    {games.map((game) => (
      <li className={styles.card}>
        <GameCard {...{ game, deleteGame, showDetails }} />
      </li>
    ))}
  </ul>
);

const GameCard = ({ game, deleteGame, showDetails }) => {
  const onClick = () => {
    deleteGame(game.id);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div
          key={game.id}
          className={`${styles.box} ${styles.dropshadow}`}
          onClick={() => showDetails(game.id)}
          onKeyDown={() => showDetails(game.id)}
          role="button"
          tabIndex={0}
        >
          <header>{game.name}</header>
          <img
            src={game.thumbnail_url}
            alt={game.name}
            className={styles.cardthumb}
          />

          <button {...{ onClick }}>Remove</button>
        </div>
      </div>
    </>
  );
};

export default Games;
