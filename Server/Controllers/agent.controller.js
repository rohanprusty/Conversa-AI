import Agent from "../Models/agent.model.js";
import User from "../Models/user.model.js";
import ConversationLog from "../Models/conversationLog.model.js";

// POST /api/agents
export const createAgent = async (req, res) => {
    try {
        const agent = await Agent.create({ userId: req.userId });
        await User.findByIdAndUpdate(req.userId, { $push: { agents: agent._id } });
        res.status(201).json(agent);
    } catch (error) { 
        res.status(500).json({ error: error.message }); 
    }
};

// GET /api/agents
export const getAgents = async (req, res) => {
    try {
        const agents = await Agent.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.status(200).json(agents);
    } catch (error) { 
        res.status(500).json({ error: error.message }); 
    }
};

// GET /api/agents/:id
export const getAgentById = async (req, res) => {
    try {
        const agent = await Agent.findOne({ _id: req.params.id, userId: req.userId });
        if (!agent) return res.status(404).json({ error: "Agent not found" });
        res.status(200).json(agent);
    } catch (error) { 
        res.status(500).json({ error: error.message }); 
    }
};

// PUT /api/agents/:id
export const updateAgent = async (req, res) => {
    try {
        const agent = await Agent.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            req.body,
            { new: true }
        );
        if (!agent) return res.status(404).json({ error: "Agent not found" });
        res.status(200).json(agent);
    } catch (error) { 
        res.status(500).json({ error: error.message }); 
    }
};

// DELETE /api/agents/:id
export const deleteAgent = async (req, res) => {
    try {
        const agent = await Agent.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        if (!agent) return res.status(404).json({ error: "Agent not found" });
        
        // Cascade delete logs
        await ConversationLog.deleteMany({ agentId: req.params.id });
        
        // Remove from user's agents array
        await User.findByIdAndUpdate(req.userId, { $pull: { agents: req.params.id } });
        
        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) { 
        res.status(500).json({ error: error.message }); 
    }
};
