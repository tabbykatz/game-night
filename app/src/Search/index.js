import * as React from "react";

import useApi from "../auth/useApi";

import styles from "./styles.module.scss";

const Search = () => {
  const [games, setGames] = React.useState([]);
  const { loading, apiClient } = useApi();

  const findGames = (name) => apiClient.findGames(name).then(setGames);
  console.log(games);

  return (
    <>
      <FindGames {...{ findGames }} />
      <SearchResults {...{ games }} />
    </>
  );
};

const GameCard = ({ game, addGame }) => {
  const onClick = (game) => {
    addGame(game);
  };
  return (
    <>
      <section key={game.id} className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.name}>{game.name}</h1>
        </header>
        <img
          src={game.thumb_url}
          alt={game.name}
          className={styles.cardthumb}
        />
        {/* 'Add" || "in Collection", etc' */}
        <button {...{ onClick }}>Add</button>
      </section>
    </>
  );
};

const SearchResults = ({ games }) => {
  const { loading, apiClient } = useApi();
  const addGame = (game) => apiClient.addGame(game).then(console.log("added"));
  return (
    <ul className={styles.grid}>
      {games.map((game) => (
        <li key={game.id} className={styles.card}>
          <GameCard {...{ game, addGame }} />
        </li>
      ))}
    </ul>
  );
};

const FindGames = () => {
  const { apiClient } = useApi();
  const [name, setName] = React.useState("");
  const [games, setGames] = React.useState([]);
  const canAdd = name !== "";

  const onSubmit = (e) => {
    e.preventDefault();
    if (canAdd) {
      apiClient.findGames(name).then((games) => setGames(games));
      setName("");
    }
  };

  return (
    <>
      <form {...{ onSubmit }}>
        <label>
          New game:{" "}
          <input
            onChange={(e) => setName(e.currentTarget.value)}
            value={name}
          />
        </label>
        <button disabled={!canAdd} className={styles.button}>
          Search
        </button>
      </form>
      {games ? <SearchResults {...{ games }} /> : null}
    </>
  );
};

export default Search;
