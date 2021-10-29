import express from "express";

import * as db from "./db.mjs";

const router = express.Router();

router.get("/games", async (request, response) => {
  const games = await db.getGames(request.user.sub);
  response.json(games);
});

router.get("/events", async (request, response) => {
  const events = await db.getEvents(request.user.sub);
  response.json(events);
});

router.get("/events/:id", async (request, response) => {
  const event = await db.getEvent(request.params.id);
  response.json(event);
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

router.use(express.json());
router.post("/", async (request, response) => {
  const user = await db.addOrUpdateUser(request.body.user);
  response.status(201).json(user);
});

export default router;
