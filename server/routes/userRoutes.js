import express from "express";
import { signup, login, getUser, collectUserTape } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/:id/collect", collectUserTape);
router.get("/:id", getUser);

export default router;
