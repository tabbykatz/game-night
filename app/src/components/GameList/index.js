import * as React from "react";

import { Link } from "react-router-dom";

import { useMyGames } from "../../myCollection";

import styles from "./styles.module.scss";

const GameList = ({ games, event = false }) => {
  return games.length ? (
    <>
      <div className={styles.list}>
        <ul className={styles.grid}>
          {games.map((game) => (
            <li className={styles.card} key={game.id}>
              <Card {...{ game, event }} />
            </li>
          ))}
        </ul>
      </div>
    </>
  ) : (
    <p>No games found.</p>
  );
};

const Card = ({ game, event }) => {
  const { addGame, deleteGame, isInMyGames } = useMyGames();

  return (
    <>
      <div key={game.id} className={styles.wrapper}>
        <div className={`${styles.box} ${styles.dropshadow}`}>
          <header>
            <Link to={`/games/${game.id}`}>{game.name}</Link>
          </header>
          {game.image_url ? (
            <img
              src={game.image_url}
              alt={game.name}
              className={styles.cardthumb}
            />
          ) : null}

          {isInMyGames(game.id) && !event ? (
            <button onClick={() => deleteGame(game)}>
              Remove from your Collection
            </button>
          ) : !event ? (
            <button onClick={() => addGame(game)}>
              Add to your Collection
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default GameList;
