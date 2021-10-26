import * as React from "react";

import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

const Card = ({ game, handleClick, isIn, action }) => {
  //game = object for game
  //onClick = function to call when card is clicked
  //isIn = boolean to determine if card is in the deck
  //action = what will onClick do
  const onClick = () => {
    handleClick(game);
  };

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
          {action === "add" && !isIn ? (
            <FaPlusSquare {...{ onClick }} />
          ) : action === "add" && isIn ? null : action === "remove" && isIn ? (
            <FaMinusSquare {...{ onClick }} />
          ) : null}
        </div>
      </div>
    </>
  );
};
export default Card;
