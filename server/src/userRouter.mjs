import express from "express";

import * as db from "./db.mjs";

const router = express.Router();

router.get("/games", async (request, response) => {
  const games = await db.getGames(request.user.sub);
  response.json(games);
});

router.get("/events", async (request, response) => {
  const events = await db.getEvents(request.user.sub);
  //  wow I have wasted a lot of time trying to
  //  add a list of user objects instead of user ids for events_users
  response.json(events);
});

router.use(express.json());
router.post("/games", async (request, response) => {
  const game = await db.addGame(request.body.game, request.user.sub);
  response.status(201).json(game);
});

router.post("/events", async (request, response) => {
  const event = await db.addEvent(request.body.event, request.user.sub);
  response.status(201).json(event);
});

router.delete("/games/:id", async (request, response) => {
  await db.deleteGame(request.params.id, request.user.sub);
  response.status(204).end();
});

// router.delete("/events/:id", async (request, response) => {
//   await db.deleteEvent(request.params.id, request.user.sub);
//   response.status(204).end();
// });

// router.put("/events/:id", async (request, response) => {
//   const event = await db.updateEvent(
//     request.params.id,
//     request.body.event,
//     request.user.sub,
//   );
//   response.json(event);
// });
router.get("/", async (request, response) => {
  const users = await db.getUsers();
  const betterUsers = users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, new Map());
  response.json(betterUsers);
});

router.use(express.json());
router.post("/", async (request, response) => {
  const user = await db.addOrUpdateUser(request.body.user);
  response.status(201).json(user);
});

export default router;
