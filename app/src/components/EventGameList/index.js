import * as React from "react";

import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

import useAuth0 from "../../auth/useAuth0";

import styles from "./styles.module.scss";

const GameList = ({ games, removeGame, addGame, currentUser }) => (
  <>
    <ul className={styles.grid}>
      {games.map((game) => (
        <li className={styles.card} key={game.id}>
          <Card {...{ game, removeGame, addGame, currentUser }} />
        </li>
      ))}
    </ul>
  </>
);

const Card = ({ game, removeGame, addGame, currentUser }) => {
  const isMine = (id) => currentUser.id === id;

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
          {isMine(game.owner) ? (
            <FaMinusSquare onClick={() => removeGame(game.id)} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default GameList;
