import express from "express";
import {
  getTrades,
  offerTrade,
  respondToTrade,
  confirmTrade,
} from "../controllers/tradeController.js";

const router = express.Router();

router.get("/", getTrades);
router.post("/", offerTrade);
router.post("/respond/:id", respondToTrade);
router.post("/confirm/:id", confirmTrade);

export default router;
