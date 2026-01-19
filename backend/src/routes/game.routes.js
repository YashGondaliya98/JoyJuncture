import express from "express";
import { buyGame, playGame, attendEvent } from "../controllers/game.controller.js";

const router = express.Router();

router.post("/buy", buyGame);
router.post("/play", playGame);
router.post("/attend", attendEvent);

export default router;