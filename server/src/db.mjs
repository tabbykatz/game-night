import pgp from "pg-promise";

import { load_dotenv_if_exists } from "./utils.mjs";

const db = initDb();

export const getGames = (sub) =>
  db.any(
    "SELECT games.* FROM games LEFT JOIN users_games ON games.id=users_games.game_id WHERE users_games.user_id = (SELECT id FROM users WHERE sub=$<sub>)",
    { sub },
  );

export const getEvents = (sub) =>
  db.any(
    "SELECT events.* FROM events LEFT JOIN events_users on event_id=events.id where (SELECT id from users where sub=$<sub>)=user_id",
    { sub },
  );

export const addGame = async (game, sub) => {
  await db.none(
    `
    INSERT INTO games(id, name, image_url)
    VALUES($<id>, $<name>, $<image_url>)
    ON CONFLICT (id) DO UPDATE
      SET name=$<name>, image_url=$<image_url>
    `,
    { ...game, sub },
  );
  return db.one(
    `
    INSERT INTO users_games(user_id, game_id)
    VALUES((SELECT id FROM users where sub=$<sub>), $<id>) RETURNING *
    `,
    { id: game.id, sub },
  );
};

export const addEvent = async (event, sub) => {
  const newEvent = await db.one(
    `
    INSERT INTO events(name, owner_id, address, city, state, zip, country, start_time, end_time, description)
    VALUES($<name>, (SELECT id from users where sub=$<sub>), $<address>, $<city>, $<state>, $<zip>, $<country>, $<start_time>, $<end_time>, $<description>) RETURNING *
    `,
    { ...event, sub },
  );
  return db.one(
    `
    INSERT INTO events_users(user_id, event_id, is_owner)
    VALUES((SELECT id FROM users where sub=$<sub>), $<id>, true) RETURNING *
    `,
    { id: newEvent.id, sub },
  );
};

export const deleteGame = (id, sub) => {
  db.none(
    "DELETE FROM users_games WHERE game_id = $<id> AND user_id = (SELECT id FROM users WHERE sub = $<sub>)",
    { id, sub },
  );
};

export const addOrUpdateUser = (user) => {
  return db.one(
    `INSERT INTO users(given_name, family_name, picture, email, sub)
      VALUES($<given_name>, $<family_name>, $<picture>, $<email>, $<sub>)
      ON CONFLICT (sub) DO
        UPDATE SET given_name = $<given_name>, family_name = $<family_name>,
          picture = $<picture>, email=$<email>
      RETURNING *`,
    user,
  );
};

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
