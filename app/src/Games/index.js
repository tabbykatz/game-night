import * as React from "react";

import Search from "../Search";
import useApi from "../auth/useApi";

import styles from "./styles.module.scss";

const initGames = [
  {
    id: 1,
    game_id: "OIXt3DmJU0",
    title: "Settlers of Catan",
    thumbnail_url:
      "https://cdn.shopify.com/s/files/1/0513/4077/1515/products/catan-board-game.jpg?v=1609629082",
    owner_id: 2,
  },
  {
    id: 2,
    game_id: "T8zWWdh0DR",
    title: "Above and Below",
    thumbnail_url:
      "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1605133478422",
    owner_id: 2,
  },
  {
    id: 3,
    game_id: "7xA6uN9iXn",
    title: "Game of Thrones: The Iron Throne",
    thumbnail_url:
      "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1559254206689-51Hyj0YRdzL.jpg",
    owner_id: 1,
  },
];

const Games = () => {
  const [games, setGames] = React.useState([]);
  const { loading, apiClient } = useApi();

  const loadGames = React.useCallback(
    async () => setGames(await apiClient.getGames()),
    [apiClient],
  );
  React.useEffect(() => {
    !loading && loadGames();
  }, [loading, loadGames]);

  return loading ? null : (
    <section>
      <GameList {...{ games }} />
      <Search />
    </section>
  );
};

const GameList = ({ games }) => (
  <ul className={styles.list}>
    {games.map(({ id, name, thumbnail_url }) => (
      <li key={id}>
        <img src={thumbnail_url} alt={name} width="300" />
        {name}
      </li>
    ))}
  </ul>
);

// const FindGames = () => {
//   const { apiClient } = useApi();
//   const [name, setName] = React.useState("");
//   const [games, setGames] = React.useState([]);
//   const canAdd = name !== "";

//   const onSubmit = (e) => {
//     e.preventDefault();
//     if (canAdd) {
//       apiClient.findGames(name).then((games) => setGames(games));
//       setName("");
//     }
//   };

//   return (
//     <>
//       <form {...{ onSubmit }}>
//         <label>
//           New game:{" "}
//           <input
//             onChange={(e) => setName(e.currentTarget.value)}
//             value={name}
//           />
//         </label>
//         <button disabled={!canAdd} className={styles.button}>
//           Add
//         </button>
//       </form>
//       <pre>{JSON.stringify(games, null, 2)}</pre>
//     </>
//   );
// };

export default Games;
