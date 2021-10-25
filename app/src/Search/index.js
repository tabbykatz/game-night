import * as React from "react";

import { toast } from "react-hot-toast";
import { FaPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

import useApi from "../auth/useApi";
import { useMyGames } from "../hooks";

import styles from "./styles.module.scss";

const Search = () => {
  const [results, setResults] = React.useState([]);
  const { myGames, loadGames } = useMyGames();
  const { apiClient } = useApi();

  const findGames = (name) => apiClient.findGames(name).then(setResults);

  const addGame = (game) =>
    apiClient.addGame(game).then(() => {
      loadGames();
      toast("Game added!");
    });

  return (
    <>
      <FindGames {...{ findGames }} />
      {results ? <SearchResults {...{ results, myGames, addGame }} /> : null}
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

const SearchResults = ({ results, myGames, addGame }) => {
  const myGameIds = myGames.map((game) => game.game_id);
  const gameIds = results
    .map((game) => game.id)
    .filter((id) => myGameIds.includes(id));

  return (
    <ul className={styles.grid}>
      {results.map((game) => (
        <li key={game.id} className={styles.card}>
          <GameCard
            {...{ game, addGame }}
            isInMyCollection={gameIds.includes(game.id)}
          />
        </li>
      ))}
    </ul>
  );
};

const GameCard = ({ game, addGame, isInMyCollection }) => {
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
        <div key={game.id} className={`${styles.box} ${styles.dropshadow}`}>
          <header>
            <Link to={`/games/${game.id}`}>{game.name}</Link>
          </header>
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

export default Search;
