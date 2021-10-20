import pgp from "pg-promise";

import { load_dotenv_if_exists } from "./utils.mjs";

const db = initDb();

// export const getTasks = (sub) =>
//   db.any(
//     "SELECT tasks.* FROM tasks LEFT JOIN users on user_id=users.id WHERE sub=$<sub>",
//     { sub },
//   );

export const getGames = (sub) =>
  db.any(
    "SELECT games.* FROM games LEFT JOIN users on owner_id=users.id WHERE sub=$<sub>",
    { sub },
  );

// export const addTask = (sub, name) =>
//   db.one(
//     `INSERT INTO tasks(user_id, name)
//       VALUES((SELECT id FROM users WHERE sub=$<sub>), $<name>)
//       RETURNING *`,
//     { sub, name },
//   );

export const addGame = (sub, game) =>
  db.one(
    `INSERT INTO games(game_id, title, thumbnail_url, owner_id)
      VALUES(($<game_id>, $<title>, $<thumbnail_url>, SELECT id FROM users WHERE sub=$<sub>))
      RETURNING *`,
    { sub, game_id, title, thumbnail_url },
  );

export const addOrUpdateUser = (user) =>
  db.one(
    `INSERT INTO users(given_name, family_name, picture, email, sub)
      VALUES($<given_name>, $<family_name>, $<picture>, $<email>, $<sub>)
      ON CONFLICT (sub) DO
        UPDATE SET given_name = $<given_name>, family_name = $<family_name>,
          picture = $<picture>, email=$<email>
      RETURNING *`,
    user,
  );

function initDb() {
  let connection;

  if (process.env.DATABASE_URL === undefined) {
    load_dotenv_if_exists();
    connection = {
      user: "postgres",
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: 5442,
    };
  } else {
    connection = {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };
  }

  return pgp()(connection);
}
