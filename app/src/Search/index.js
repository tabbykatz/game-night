import * as React from "react";

import { toast } from "react-hot-toast";
import { FaPlusSquare } from "react-icons/fa";

import useApi from "../auth/useApi";
import { useMyGames } from "../hooks";

import styles from "./styles.module.scss";

const Search = () => {
  const [detailsView, setDetailsView] = React.useState(false);
  const [selectedGame, setSelectedGame] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const { myGames, loadGames } = useMyGames();
  const { apiClient } = useApi();

  const findGames = (name) => apiClient.findGames(name).then(setResults);

  const addGame = (game) =>
    apiClient.addGame(game).then(() => {
      loadGames();
      toast("Game added!");
    });

  const showDetails = (id) => {
    apiClient.getGame(id).then((game) => {
      setSelectedGame(game.games[0]);
      setDetailsView(true);
    });
  };

  return (
    <>
      <FindGames {...{ findGames }} />
      {results && !detailsView ? (
        <SearchResults {...{ results, myGames, addGame, showDetails }} />
      ) : detailsView ? (
        <GameDetails {...{ selectedGame }} />
      ) : null}
    </>
  );
};

const FindGames = ({ findGames }) => {
  const [name, setName] = React.useState("");
  const canAdd = name !== "";

  const onSubmit = (e) => {
    e.preventDefault();
    if (canAdd) {
      findGames(name);
    }
  };

  return (
    <form {...{ onSubmit }}>
      <label>
        New game:{" "}
        <input onChange={(e) => setName(e.currentTarget.value)} value={name} />
      </label>
      <button disabled={!canAdd} className={styles.button}>
        Search
      </button>
    </form>
  );
};

const SearchResults = ({ results, myGames, addGame, showDetails }) => {
  const myGameIds = myGames.map((game) => game.game_id);
  const gameIds = results
    .map((game) => game.id)
    .filter((id) => myGameIds.includes(id));

  return (
    <ul className={styles.grid}>
      {results.map((game) => (
        <li key={game.id} className={styles.card}>
          <GameCard
            {...{ game, addGame, showDetails }}
            isInMyCollection={gameIds.includes(game.id)}
          />
        </li>
      ))}
    </ul>
  );
};

const GameCard = ({ game, addGame, isInMyCollection, showDetails }) => {
  const onClick = () => {
    const newGame = {
      game_id: game.id,
      name: game.name,
      thumbnail_url: game.thumb_url,
    };
    addGame(newGame);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div
          key={game.id}
          className={`${styles.box} ${styles.dropshadow}`}
          onClick={() => showDetails(game.id)}
          onKeyDown={() => showDetails(game.id)}
          role="button"
          tabIndex={0}
        >
          {/* currently entering details when tabbed , not skipping */}
          <header>{game.name}</header>
          <img
            src={game.image_url}
            alt={game.name}
            className={styles.cardthumb}
          />
        </div>
      </div>
      {isInMyCollection ? null : <FaPlusSquare {...{ onClick }} />}
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

export default Search;
