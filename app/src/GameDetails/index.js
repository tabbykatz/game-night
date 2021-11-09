import * as React from "react";

import { GiHourglass, GiAges, GiMeeple } from "react-icons/gi";
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
          <GiAges /> Ages {game.min_age}+ <br />
          <GiMeeple />
          {game.min_players}-{game.max_players} Players
          <br />
          <GiHourglass />
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
