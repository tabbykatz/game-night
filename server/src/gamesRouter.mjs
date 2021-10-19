import express from "express";
import got from "got";

const router = express.Router();
const api = {
  url: "https://api.boardgameatlas.com/api/search?name=",
  key: process.env.GAME_API_KEY,
};
router.get("/", async (request, response) => {
  const { games } = await got(
    `https://api.boardgameatlas.com/api/search?name=${request.title}&client_id=${api.key}`,
  );
  response.json(games);
});

export default router;
