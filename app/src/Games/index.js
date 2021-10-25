import * as React from "react";

import { toast } from "react-hot-toast";

import useApi from "../auth/useApi";
import Card from "../components/Card";
import { useMyGames } from "../hooks";

import styles from "./styles.module.scss";

const Games = ({ limit }) => {
  const { myGames, loadGames } = useMyGames();
  const { apiClient } = useApi();

  const deleteGame = (game) => {
    apiClient
      .deleteGame(game.id)
      .then(loadGames())
      .then(toast("Game removed!"));
  };

  return myGames ? (
    <>
      {/* TODO: Add a button to go to addgame */}
      <section>
        <GameList games={myGames} {...{ deleteGame }} {...{ limit }} />
      </section>
    </>
  ) : null;
};

const GameList = ({ games, deleteGame, limit }) => {
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
              isIn={true}
              action={"remove"}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Games;
