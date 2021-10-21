import * as React from "react";

import toast, { Toaster } from "react-hot-toast";

import useApi from "../auth/useApi";
import { useMyGames } from "../hooks";

import styles from "./styles.module.scss";

const Games = () => {
  const { myGames } = useMyGames();
  console.log({ myGames });
  return myGames ? (
    <>
      <h1>list of all games with remove buttons plus +add a game</h1>
      <section>
        <GameList games={myGames} />
      </section>
    </>
  ) : null;
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

export default Games;
