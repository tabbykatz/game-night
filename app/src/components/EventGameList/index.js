import * as React from "react";

import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

const EventGameList = ({
  games,
  isAlreadyComing,
  addGame,
  removeGame,
  imBringing,
}) => (
  <>
    <ul className={styles.grid}>
      {games.map((game) => (
        <li className={styles.card} key={game.id}>
          <Card
            {...{ game, isAlreadyComing, addGame, removeGame, imBringing }}
          />
        </li>
      ))}
    </ul>
  </>
);

const Card = ({ game, isAlreadyComing, addGame, removeGame, imBringing }) => {
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
          {isAlreadyComing(game.id) ? (
            <p>Someone else is bringing this one!</p>
          ) : imBringing(game.id) ? (
            <FaMinusSquare onClick={() => removeGame(game.id)} />
          ) : (
            <FaPlusSquare onClick={() => addGame(game.id)} />
          )}
        </div>
      </div>
    </>
  );
};

export default EventGameList;
