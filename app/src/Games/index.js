import * as React from "react";

import { toast } from "react-hot-toast";
import { FaMinusSquare } from "react-icons/fa";

import useApi from "../auth/useApi";
import { useMyGames } from "../hooks";

import styles from "./styles.module.scss";

const Games = () => {
  const [detailsView, setDetailsView] = React.useState(false);
  const [selectedGame, setSelectedGame] = React.useState([]);
  const { myGames, loadGames } = useMyGames();
  const { apiClient } = useApi();

  const deleteGame = (id) => {
    apiClient.deleteGame(id).then(loadGames());
    toast("Game removed!");
  };

  const showDetails = (id) => {
    apiClient.getGame(id).then((game) => {
      setSelectedGame(game.games[0]);
      setDetailsView(true);
    });
  };

  return myGames && !detailsView ? (
    <>
      <h1>list of all games with remove buttons plus +add a game</h1>
      <section>
        <GameList games={myGames} {...{ deleteGame, showDetails }} />
      </section>
    </>
  ) : detailsView ? (
    <GameDetails {...{ selectedGame }} />
  ) : null;
};

const GameList = ({ games, deleteGame, showDetails }) => (
  <ul className={styles.grid}>
    {games.map((game) => (
      <li className={styles.card} key={game.id}>
        <GameCard {...{ game, deleteGame, showDetails }} />
      </li>
    ))}
  </ul>
);

const GameCard = ({ game, deleteGame, showDetails }) => {
  const onClick = () => {
    deleteGame(game.id);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div
          key={game.id}
          className={`${styles.box} ${styles.dropshadow}`}
          onClick={() => showDetails(game.game_id)}
          onKeyDown={() => showDetails(game.game_id)}
          role="button"
          tabIndex={0}
        >
          {/* currently entering details when tabbed , not skipping */}
          <header>{game.name}</header>
          <img
            src={game.thumbnail_url}
            alt={game.name}
            className={styles.cardthumb}
          />
        </div>
      </div>
      <FaMinusSquare {...{ onClick }} />
    </>
  );
};

const GameDetails = ({ selectedGame }) => {
  return (
    <>
      <div className={styles.container}>
        <img
          alt={selectedGame.name}
          className={`${styles.detailsimage} ${styles.left}`}
          src={selectedGame.image_url}
        />
        <div className={styles.right}>
          <h1>{selectedGame.name}</h1>
          <em>{selectedGame.primary_designer.name}</em> <br />
          {selectedGame.min_players}-{selectedGame.max_players} Players
          <br />
          Playtime: {selectedGame.min_playtime}-{selectedGame.max_playtime}{" "}
          minutes
        </div>
      </div>
      <details className={styles.description}>
        <summary>Get description</summary>
        {selectedGame.description_preview}
      </details>
    </>
  );
};

export default Games;
