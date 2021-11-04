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

router.use(express.json());
router.post("/games", async (request, response) => {
  const game = await db.addGame(request.body.game, request.user.sub);
  response.status(201).json(game);
});

router.post("/events", async (request, response) => {
  const event = await db.addEvent(request.body.event, request.user.sub);
  response.status(201).json(event);
});

router.post("/events/:eventId", async (request, response) => {
  try {
    const addition = await db.addUserToEvent(
      request.body.userEmail,
      request.params.eventId,
    );
    response.status(201).json(addition);
  } catch ({ response: { statusCode, statusMessage } }) {
    response.status(statusCode).json({ error: statusMessage });
  }
});

router.delete("/events/:eventId", async (request, response) => {
  const deletion = await db.deleteEvent(request.params.eventId);
  response.status(200).json(deletion);
});

router.put("/events/:eventId", async (request, response) => {
  const event = await db.editEvent(request.body.event, request.params.eventId);
  response.status(200).json(event);
});

router.post("/events/:eventId/games", async (request, response) => {
  const addition = await db.addGameToEvent(
    request.params.eventId,
    request.body.gameId,
    request.user.sub,
  );
  response.status(201).json(addition);
});

router.delete("/events/:eventId/:gameId", async (request, response) => {
  const deletion = await db.removeGameFromEvent(
    request.params.eventId,
    request.params.gameId,
  );
  response.status(200).json(deletion);
});

router.get("/events/:eventId", async (request, response) => {
  const event = await db.getEventById(request.params.eventId);
  response.json(event);
});

router.delete("/games/:id", async (request, response) => {
  await db.deleteGame(request.params.id, request.user.sub);
  response.status(204).end();
});

router.get("/", async (request, response) => {
  const user = await db.getUser(request.user.sub);
  response.json(user.id);
});

router.get("/all", async (request, response) => {
  const users = await db.getUsers();
  response.json(users);
});

router.use(express.json());
router.post("/", async (request, response) => {
  const user = await db.addOrUpdateUser(request.body.user);
  response.status(201).json(user);
});

export default router;
