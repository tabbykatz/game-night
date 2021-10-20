import * as React from "react";

import useApi from "../auth/useApi";

import styles from "./styles.module.scss";

const Search = () => {
  const [games, setGames] = React.useState([]);
  const { loading, apiClient } = useApi();

  // const addGame = (game) => apiClient.addGame(game).then(loadGames);
  const findGames = (name) => apiClient.findGames(name).then(setGames);
  console.log(games);

  return (
    <>
      <FindGames {...{ findGames }} />
      {loading ? null : <SearchResults {...{ games }} />}
    </>
  );
};

const SearchResults = ({ games }) => (
  <ul className={styles.list}>
    {games.map(({ id, name, thumbnail_url }) => (
      <li key={id}>
        <img src={thumbnail_url} alt={name} width="300" />
        {name}
      </li>
    ))}
  </ul>
);

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
          Add
        </button>
      </form>
      <pre>{JSON.stringify(games, null, 2)}</pre>
    </>
  );
};

export default Search;
