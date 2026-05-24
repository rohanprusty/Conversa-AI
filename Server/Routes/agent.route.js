import express from "express";
import { createAgent, getAgents, getAgentById, updateAgent, deleteAgent } from "../Controllers/agent.controller.js";
import { isAuth } from "../Middleware/isAuth.js"; 

const router = express.Router();

// All agent routes should be protected by the user token
router.use(isAuth);

router.post("/", createAgent);
router.get("/", getAgents);
router.get("/:id", getAgentById);
router.put("/:id", updateAgent);
router.delete("/:id", deleteAgent);

export default router;
