import mongoose from "mongoose";

const smartNavigationSchema = new mongoose.Schema({
    name: String,
    path: String,
    keywords: [String]
}, { _id: false });

const agentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assistantName: { type: String, default: "New Assistant" },
    businessName: { type: String, default: "" },
    businessType: { type: String, default: "" },
    systemPrompt: { type: String, default: "" },
    theme: { type: String, enum: ["light", "dark", "glass", "neon"], default: "dark" },
    tone: { type: String, enum: ["friendly", "professional", "sales"], default: "friendly" },
    geminiApiKey: { type: String, default: "" },
    smartNavigations: { type: [smartNavigationSchema], default: [] }
}, { timestamps: true });

const Agent = mongoose.model("Agent", agentSchema);
export default Agent;
