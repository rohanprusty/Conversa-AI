import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
    userPrompt: { type: String, required: true },
    aiResponse: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

// For text search optimization
logSchema.index({ userPrompt: "text", aiResponse: "text" });

const ConversationLog = mongoose.model("ConversationLog", logSchema);
export default ConversationLog;
