import * as React from "react";

import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useMyGames } from "../../myCollection";

import styles from "./styles.module.scss";

const GameList = ({ games, event = false }) => {
  console.log(games);
  return games.length ? (
    <>
      <ul className={styles.grid}>
        {games.map((game) => (
          <li className={styles.card} key={game.id}>
            <Card {...{ game, event }} />
          </li>
        ))}
      </ul>
    </>
  ) : (
    <p>No games found.</p>
  );
};

const Card = ({ game, event }) => {
  const { addGame, deleteGame, isInMyGames } = useMyGames();

  return (
    <>
      <div className={styles.wrapper}>
        <div key={game.id} className={`${styles.box} ${styles.dropshadow}`}>
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
            <FaMinusSquare onClick={() => deleteGame(game)} />
          ) : !event ? (
            <FaPlusSquare onClick={() => addGame(game)} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default GameList;
