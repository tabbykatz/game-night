import * as React from "react";

import Card from "../components/Card";
import { useMyGames } from "../hooks";

import styles from "./styles.module.scss";

const Games = ({ limit }) => {
  const { myGames, addGame, deleteGame, isInMyGames } = useMyGames();

  return myGames ? (
    <>
      {/* TODO: Add a button to go to addgame */}
      <section>
        <GameList
          games={myGames}
          {...{ deleteGame }}
          {...{ addGame }}
          {...{ isInMyGames }}
          {...{ limit }}
        />
      </section>
    </>
  ) : null;
};

const GameList = ({ games, addGame, deleteGame, isInMyGames, limit }) => {
  if (limit) {
    games = games.slice(0, limit);
  }
  return (
    <>
      <ul className={styles.grid}>
        {games.map((game) => (
          <li className={styles.card} key={game.id}>
            <Card
              {...{ game }}
              handleClick={deleteGame}
              isIn={isInMyGames(game.id)}
              action={"remove"}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Games;
