import * as React from "react";

import { Link } from "react-router-dom";

import useApi from "../auth/useApi";
import GameList from "../components/GameList";

import styles from "./styles.module.scss";

const Search = () => {
  const [results, setResults] = React.useState([]);
  const { apiClient } = useApi();

  const findGames = (name) => apiClient.findGames(name).then(setResults);

  return (
    <>
      <h1>
        Add games to your <Link to={"/games"}>collection.</Link>
      </h1>
      <FindGames {...{ findGames }} />
      {results.length ? <GameList games={results} /> : null}
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
      <button disabled={!canAdd}>Search</button>
    </form>
  );
};

export default Search;
