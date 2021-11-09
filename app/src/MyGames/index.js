import * as React from "react";

import { Link } from "react-router-dom";

import GameList from "../components/GameList";
import { useMyGames } from "../myCollection";

const MyGames = () => {
  const { myGames } = useMyGames();
  return (
    <>
      <h1>
        Games Collection. <Link to={"/search"}>Add more.</Link>
      </h1>
      <GameList games={myGames} />
    </>
  );
};

export default MyGames;
