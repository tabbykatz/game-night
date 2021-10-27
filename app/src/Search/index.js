import * as React from "react";

import useApi from "../auth/useApi";
import GameList from "../components/GameList";
import { useMyGames } from "../hooks";

import styles from "./styles.module.scss";

const Search = () => {
  const [results, setResults] = React.useState([]);
  const { apiClient } = useApi();

  const findGames = (name) => apiClient.findGames(name).then(setResults);

  return (
    <>
      <FindGames {...{ findGames }} />
      {results ? <GameList games={results} /> : null}
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

export default Search;
