import pgp from "pg-promise";

import { load_dotenv_if_exists } from "./utils.mjs";

const db = initDb();

export const getUser = (sub) =>
  db.one("SELECT * FROM users WHERE sub = $<sub>", { sub });

export const getUsers = () => db.any("SELECT * FROM users");

export const getGames = (sub) =>
  db.any(
    `SELECT games.* 
    FROM games LEFT JOIN users_games ON games.id = users_games.game_id
    WHERE users_games.user_id = (
      SELECT id FROM users
      WHERE sub = $<sub>
      )`,
    { sub },
  );

export const getEventById = async (id) => {
  const event = await db.one(`SELECT events.* FROM events WHERE id = $<id>`, {
    id,
  });

  event.attendees = await db.any(
    `SELECT users.*
    FROM events_users
    LEFT JOIN users ON users.id = events_users.user_id
    WHERE event_id = ${event.id}`,
  );

  event.games = await db.any(
    `SELECT games.*, user_id AS owner
    FROM events_games
    LEFT JOIN games ON games.id = events_games.game_id
    WHERE event_id = ${event.id}`,
  );

  return event;
};

export const getEvents = (sub) =>
  db.any(
    `
    SELECT events.*, ARRAY_AGG(user_id) events_users
    FROM events LEFT JOIN events_users ON event_id=events.id
    WHERE events.id IN (
      SELECT events.id
      FROM events LEFT JOIN events_users ON event_id=events.id
      WHERE (
        SELECT id FROM users
        WHERE sub=$<sub>)=user_id
      )
    GROUP BY events.id
    `,
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

export const addUserToEvent = (userEmail, eventId) => {
  db.one(
    `
    INSERT INTO events_users(user_id, event_id, is_owner) VALUES((SELECT id FROM users where email=$<userEmail>), $<eventId>, false) RETURNING *
    `,
    { userEmail, eventId },
  );
};

export const removeGameFromEvent = (eventId, gameId) =>
  db.none(
    `
    DELETE FROM events_games
    WHERE event_id=$<eventId> AND game_id=$<gameId>
    `,
    { eventId, gameId },
  );

export const addGameToEvent = (eventId, gameId, sub) =>
  db.none(
    `
      INSERT INTO events_games(event_id, game_id, user_id) VALUES($<eventId>, $<gameId>, (SELECT id from users where sub=$<sub>))
      `,
    { eventId, gameId, sub },
  );

export const editEvent = (event, id) =>
  db.one(
    `UPDATE events SET name=$<name>, address=$<address>, city=$<city>, state=$<state>, zip=$<zip>, country=$<country>, start_time=$<start_time>, end_time=$<end_time>, description=$<description> WHERE id=$<id> RETURNING *`,
    { ...event, id },
  );

export const deleteEvent = (id) =>
  db.none(
    `
    DELETE FROM events
    WHERE id=$<id>
    `,
    { id },
  );

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
