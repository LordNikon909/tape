import express from "express";
import { getAllTapes } from "../controllers/tapeController.js";

const router = express.Router();

router.get("/", getAllTapes);

export default router;