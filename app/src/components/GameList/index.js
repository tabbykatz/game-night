import * as React from "react";

import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

import { useMyGames } from "../../hooks";

import styles from "./styles.module.scss";

const GameList = ({ games }) => {
  const { addGame, deleteGame, isInMyGames } = useMyGames();

  return (
    <>
      <ul className={styles.grid}>
        {games.map((game) => (
          <li className={styles.card} key={game.id}>
            <Card {...{ game, addGame, deleteGame, isInMyGames }} />
          </li>
        ))}
      </ul>
    </>
  );
};

const Card = ({ game, addGame, deleteGame, isInMyGames }) => (
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
        {isInMyGames(game.id) ? (
          <FaMinusSquare onClick={() => deleteGame(game)} />
        ) : (
          <FaPlusSquare onClick={() => addGame(game)} />
        )}
      </div>
    </div>
  </>
);

export default GameList;
