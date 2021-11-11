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
    <p>Loading...</p>
  ) : game.error ? (
    <NotFound />
  ) : (
    <>
      <header className={styles.gametitle}>
        <h1>{game.name}</h1>
      </header>
      <div className={styles.container}>
        <div className={styles.left}>
          <img
            className={styles.detailsimage}
            alt={game.name}
            src={game.image_url}
          />
        </div>
        <div className={styles.right}>
          <em>{game.primary_designer?.name}</em> <br />
          <GiAges /> Ages {game.min_age}+ <br />
          <GiMeeple />
          {game.min_players}-{game.max_players} Players
          <br />
          <GiHourglass />
          Playtime: {game.min_playtime}-{game.max_playtime} minutes
          <p>{game.description_preview}</p>
        </div>
      </div>
    </>
  );
};

export default GameDetails;
