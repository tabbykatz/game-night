import pgp from "pg-promise";

import { load_dotenv_if_exists } from "./utils.mjs";

const db = initDb();

export const getGames = (sub) =>
  db.any(
    "SELECT games.* FROM games LEFT JOIN users on owner_id=users.id WHERE sub=$<sub> ORDER BY date_added DESC",
    { sub },
  );

export const getEvents = (sub) =>
  db.any(
    "SELECT events.* FROM events LEFT JOIN users on owner_id=users.id WHERE sub=$<sub>",
    { sub },
  );

export const addGame = (game, sub) =>
  db.one(
    `INSERT INTO games(id, name, image_url, owner_id)
      VALUES($<id>, $<name>, $<image_url>, (SELECT id FROM users WHERE sub=$<sub>))
      RETURNING *`,
    { ...game, sub },
  );

export const deleteGame = (id, sub) => {
  db.none(
    "DELETE FROM games WHERE id = $<id> AND owner_id = (SELECT id FROM users WHERE sub = $<sub>)",
    { id, sub },
  );
};

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
