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
  const addition = await db.addUserToEvent(
    request.body.userEmail,
    request.params.eventId,
  );
  response.status(201).json(addition);
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

router.use(express.json());
router.post("/", async (request, response) => {
  const user = await db.addOrUpdateUser(request.body.user);
  response.status(201).json(user);
});

export default router;
