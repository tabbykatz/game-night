import * as React from "react";

import { useParams } from "react-router-dom";

import useApi from "../auth/useApi";
import NotFound from "../components/NotFound";

import styles from "./styles.module.scss";

const GameDetails = () => {
  const [game, setGame] = React.useState();
  const { loading, apiClient } = useApi();
  const { id } = useParams();

  React.useEffect(() => {
    !loading && apiClient.getGame(id).then((game) => setGame(game));
  }, [loading, apiClient, id]);

  return game === undefined ? (
    <p>loading...</p>
  ) : game.error ? (
    <NotFound />
  ) : (
    <>
      <div className={styles.container}>
        <img
          className={`${styles.detailsimage} ${styles.left}`}
          alt={game.name}
          src={game.image_url}
        />
        <div className={styles.right}>
          <h1>{game.name}</h1>
          <em>{game.primary_designer?.name}</em> <br />
          {game.min_players}-{game.max_players} Players
          <br />
          Playtime: {game.min_playtime}-{game.max_playtime} minutes
        </div>
      </div>
      <details className={styles.description}>
        <summary>Get description</summary>
        {game.description_preview}
      </details>
    </>
  );
};

export default GameDetails;
