import * as React from "react";

import CardList from "../components/CardList";
import { useMyGames } from "../hooks";

const Games = () => {
  const { myGames } = useMyGames();
  return <CardList games={myGames} />;
};

export default Games;
