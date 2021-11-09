import * as React from "react";

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
            <button onClick={() => removeGame(game.id)}>
              Remove from Event
            </button>
          ) : (
            <button onClick={() => addGame(game.id)}>Add To Event</button>
          )}
        </div>
      </div>
    </>
  );
};

export default EventGameList;
