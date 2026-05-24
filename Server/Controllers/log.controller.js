import ConversationLog from "../Models/conversationLog.model.js";

// POST /api/logs
export const saveLog = async (req, res) => {
    try {
        const { agentId, userPrompt, aiResponse } = req.body;
        const log = await ConversationLog.create({ agentId, userPrompt, aiResponse });
        res.status(201).json(log);
    } catch (error) { 
        res.status(500).json({ error: error.message }); 
    }
};

// GET /api/logs/:agentId
export const getLogs = async (req, res) => {
    try {
        const { search = "", page = 1, limit = 50 } = req.query;
        const query = { agentId: req.params.agentId };
        
        if (search) {
            query.$or = [
                { userPrompt: { $regex: search, $options: "i" } },
                { aiResponse: { $regex: search, $options: "i" } }
            ];
        }

        const logs = await ConversationLog.find(query)
            .sort({ timestamp: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
            
        res.status(200).json(logs);
    } catch (error) { 
        res.status(500).json({ error: error.message }); 
    }
};
