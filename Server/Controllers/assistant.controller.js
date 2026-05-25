import { generateGeminiResponse } from "../Configs/gemini.js"
import User from "../Models/user.model.js"
import Agent from "../Models/agent.model.js"


export const getAssistantConfig = async (req, res) => {
    try {
        const { agentId } = req.params

        if (!agentId) return res.status(400).json({ message: "Agent ID is required" });

        const agent = await Agent.findById(agentId).populate('userId', 'plan geminiStatus').lean()
        if (!agent) {
            return res.status(404).json({ message: "failed to get assistant" })
        }

        return res.status(200).json({ message: "Assistant Config data ", user: agent })

    } catch (error) {
        return res.status(500).json({ message: `Assistant Config failed ${error}` })
    }
}


export const askAssistant = async (req, res) => {
    try {
        console.log("\n--- NEW REQUEST RECEIVED ---");
        const { message, agentId } = req.body
        console.log("4. BACKEND RECEIVED AGENT ID:", agentId);

        if (!message || !agentId) {
            return res.status(400).json({ message: "Message and AgentId are required" })
        }

        const agent = await Agent.findById(agentId).populate('userId', 'plan totalMessages requestLimit proExpiresAt enableNavigation pages').lean()

        console.log("5. MONGODB RESULT:", agent ? "Agent Found" : "AGENT NOT FOUND IN DB!");
        if (!agent) {
            return res.status(404).json({ message: "Agent is not found" })
        }
        
        const user = agent.userId;
        if (!user) {
            return res.status(404).json({ message: "Agent Owner is not found" })
        }

        if (!agent.geminiApiKey) {
            return res.status(400).json({ message: "gemini apikey is not added" })
        }

        if (user.plan === "free" && user.totalMessages >= user.requestLimit) {
            return res.status(400).json({ message: "Free limit reached" })
        }

        if (user.plan === "pro" && new Date(user.proExpiresAt) < new Date()) {
            await User.findByIdAndUpdate(user._id, { plan: "free" });
            return res.status(400).json({ message: "Pro plan expired" })
        }

        const cleanMessage = message.toLowerCase()

        let navigationRulesPrompt = "";
        if (agent.smartNavigations && agent.smartNavigations.length > 0) {
            const rulesList = agent.smartNavigations.map(nav => `- ${nav.name} (${nav.path}): trigger keywords: ${nav.keywords.join(", ")}`).join("\n");
            navigationRulesPrompt = `
Here are the user's navigation rules:
${rulesList}
CRITICAL INSTRUCTION: Look at the path for the requested action. 
- If the path starts with a slash (e.g., '/dashboard'), reply with: 'Taking you there. [NAVIGATE:/dashboard]'
- If the path starts with a hashtag (e.g., '#pricing'), reply with: 'Scrolling to that section. [SCROLL:#pricing]'
`;
        }

        const prompt = `
You are the official AI assistant for ${agent.businessName}. 
About us: ${agent.systemPrompt} 

You must answer user questions fully and accurately based ONLY on this information. 
Speak conversationally. 
Tone: ${agent.tone}

CRITICAL: Do NOT use any Markdown formatting (*, #, etc.) in your response. 
Keep replies under 15 words. Give fast direct responses. Avoid long explanations.

${navigationRulesPrompt}

User Question:
${message}
`;

     console.log("6. SENDING TO GEMINI. System Prompt Length:", agent.systemPrompt ? agent.systemPrompt.length : 0);
     const aiResponse = await generateGeminiResponse({prompt ,apikey: agent.geminiApiKey, userId: user._id })

    if(user.plan === "free"){
        await User.findByIdAndUpdate(user._id, { $inc: { totalMessages: 1 } });
    }
    return  res.json({
                success: true,
                aiResponse
            });

    } catch (error) {
        console.error("CRITICAL BACKEND ERROR:", error);

        if (error.message.includes("429") || error.message.toLowerCase().includes("quota")) {
            return res.status(429).json({ message: "Google API Quota Exceeded. You need a new key." });
        }
        if (error.message.includes("API key not valid")) {
            return res.status(401).json({ message: "Invalid Gemini API Key." });
        }

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
}


