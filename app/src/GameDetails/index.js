import * as React from "react";

import { useParams } from "react-router-dom";

import useApi from "../auth/useApi";

const GameDetails = () => {
  const [game, setGame] = React.useState(null);
  const { loading, apiClient } = useApi();
  const { id } = useParams();

  React.useEffect(() => {
    !loading && apiClient.getGame(id).then((game) => setGame(game));
  }, [loading, apiClient, id]);

  return game ? (
    <>
      <div>
        <img alt={game.name} src={game.image_url} />
        <div>
          <h1>{game.name}</h1>
          <em>{game.primary_designer.name}</em> <br />
          {game.min_players}-{game.max_players} Players
          <br />
          Playtime: {game.min_playtime}-{game.max_playtime} minutes
        </div>
      </div>
      <details>
        <summary>Get description</summary>
        {game.description_preview}
      </details>
      <p>{id}</p>
    </>
  ) : (
    <p>Loading...</p>
  );
};

export default GameDetails;
