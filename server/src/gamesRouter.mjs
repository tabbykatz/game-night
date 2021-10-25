import express from "express";
import got from "got";

import { load_dotenv_if_exists } from "./utils.mjs";

load_dotenv_if_exists();

const router = express.Router();

router.get("/", async ({ query: { name } }, response) => {
  const { games } = await bga("search", { searchParams: { name } });
  response.json(games);
});

router.get("/:id", async (request, response) => {
  const { games } = await bga("search", {
    searchParams: { ids: request.params.id },
  });
  response.json(games[0]);
});

const bga = got.extend({
  prefixUrl: "https://api.boardgameatlas.com/api/",
  responseType: "json",
  resolveBodyOnly: true,
  searchParams: { client_id: process.env.GAME_API_KEY },
});

export default router;
