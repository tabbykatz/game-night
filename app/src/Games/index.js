import * as React from "react";

import { toast } from "react-hot-toast";
import { FaMinusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

import useApi from "../auth/useApi";
import Card from "../components/Card";
import { useMyGames } from "../hooks";

import styles from "./styles.module.scss";

const Games = () => {
  const { myGames, loadGames } = useMyGames();
  const { apiClient } = useApi();

  const deleteGame = (id) => {
    apiClient.deleteGame(id).then(loadGames()).then(toast("Game removed!"));
  };

  return myGames ? (
    <>
      {/* TODO: Add a button to go to addgame */}
      <section>
        <GameList games={myGames} {...{ deleteGame }} />
      </section>
    </>
  ) : null;
};

const GameList = ({ games, deleteGame }) => (
  <ul className={styles.grid}>
    {games.map((game) => (
      <li className={styles.card} key={game.id}>
        <Card
          {...{ game }}
          handleClick={deleteGame}
          isIn={true}
          action={"remove"}
        />
      </li>
    ))}
  </ul>
);

// const GameCard = ({ game, deleteGame }) => {
//   const onClick = () => {
//     deleteGame(game.id);
//   };

//   return (
//     <>
//       <div className={styles.wrapper}>
//         <div key={game.id} className={`${styles.box} ${styles.dropshadow}`}>
//           <header>
//             <Link to={`/games/${game.id}`}>{game.name}</Link>
//           </header>
//           <img
//             src={game.thumbnail_url}
//             alt={game.name}
//             className={styles.cardthumb}
//           />
//         </div>
//       </div>
//       <FaMinusSquare {...{ onClick }} />
//     </>
//   );
// };

export default Games;
