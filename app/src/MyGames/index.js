import * as React from "react";

import GameList from "../components/GameList";
import { useMyGames } from "../myCollection";

const MyGames = () => {
  const { myGames } = useMyGames();
  return <GameList games={myGames} />;
};

export default MyGames;
