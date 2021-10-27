import * as React from "react";

import GameList from "../components/GameList";
import { useMyGames } from "../hooks";

const MyGames = () => {
  const { myGames } = useMyGames();
  return <GameList games={myGames} />;
};

export default MyGames;
