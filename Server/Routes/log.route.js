import express from "express";
import { saveLog, getLogs } from "../Controllers/log.controller.js";
import { isAuth } from "../Middleware/isAuth.js"; 

const router = express.Router();

router.post("/", saveLog); // This could be called by the embedded widget/agent, no user token required
router.get("/:agentId", isAuth, getLogs); // Dashboard owner views logs, requires auth

export default router;
