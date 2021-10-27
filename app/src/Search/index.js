import * as React from "react";

import useApi from "../auth/useApi";
import CardList from "../components/CardList";
import { useMyGames } from "../hooks";

import styles from "./styles.module.scss";

const Search = () => {
  const [results, setResults] = React.useState([]);
  const { myGames, addGame, deleteGame, isInMyGames } = useMyGames();
  const { apiClient } = useApi();

  const findGames = (name) => apiClient.findGames(name).then(setResults);

  return (
    <>
      <FindGames {...{ findGames }} />
      {results ? (
        <CardList games={results} {...{ addGame, deleteGame, isInMyGames }} />
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

export default Search;
