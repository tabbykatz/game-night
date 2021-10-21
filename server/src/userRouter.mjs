import express from "express";

import * as db from "./db.mjs";

const router = express.Router();

router.get("/games", async (request, response) => {
  const games = await db.getGames(request.user.sub);
  response.json(games);
});

router.use(express.json());
router.post("/games", async (request, response) => {
  const game = await db.addGame(request.body.game, request.user.sub);
  response.status(201).json(game);
});

router.delete("/games/:id", async (request, response) => {
  await db.deleteGame(request.params.id, request.user.sub);
  response.status(204).end();
});

router.use(express.json());
router.post("/", async (request, response) => {
  const user = await db.addOrUpdateUser(request.body.user);
  response.status(201).json(user);
});

export default router;
