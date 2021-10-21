import * as React from "react";

import toast, { Toaster } from "react-hot-toast";

import useApi from "../auth/useApi";

import styles from "./styles.module.scss";

const Search = () => {
  const [games, setGames] = React.useState([]);
  const [myGames, setMyGames] = React.useState([]);
  const { loading, apiClient } = useApi();

  const loadGames = React.useCallback(async () => {
    setMyGames(await apiClient.getGames());
  }, [apiClient]);
  React.useEffect(() => {
    !loading && loadGames();
  }, [loading, loadGames]);

  const findGames = (name) => apiClient.findGames(name).then(setGames);
  return (
    <>
      <FindGames {...{ findGames }} />
      {games ? <SearchResults {...{ games, myGames, loadGames }} /> : null}
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
      setName("");
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

const SearchResults = ({ games, myGames, loadGames }) => {
  const { loading, apiClient } = useApi();
  const myGameIds = myGames.map((game) => game.game_id);
  const gameIds = games
    .map((game) => game.id)
    .filter((id) => myGameIds.includes(id));
  const addGame = (game) =>
    apiClient.addGame(game).then(() => {
      loadGames();
      toast("Game added!");
    });
  return (
    <ul className={styles.grid}>
      {games.map((game) => (
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
      <section key={game.id} className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.name}>{game.name}</h1>
        </header>
        <img
          src={game.thumb_url}
          alt={game.name}
          className={styles.cardthumb}
        />
        {isInMyCollection ? (
          "is in already"
        ) : (
          <button {...{ onClick }}>Add</button>
        )}
      </section>
    </>
  );
};

export default Search;
