import express from "express"
import { askAssistant, getAssistantConfig } from "../Controllers/assistant.controller.js"


const assistantRouter = express.Router()

assistantRouter.get("/config/:agentId" , getAssistantConfig)
assistantRouter.post("/ask",askAssistant)

export default assistantRouter