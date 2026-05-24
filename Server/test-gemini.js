import mongoose from 'mongoose';
import Agent from './Models/agent.model.js';
import { generateGeminiResponse } from './Configs/gemini.js';
import dotenv from 'dotenv';
dotenv.config();

const test = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/conversa');
        const agent = await Agent.findOne().populate('userId').lean();
        if (!agent) {
            console.log("No agent found");
            process.exit(1);
        }
        console.log("Found agent:", agent.assistantName);
        console.log("Testing Gemini API with key length:", agent.geminiApiKey?.length);
        
        const response = await generateGeminiResponse({
            prompt: "Hello",
            apikey: agent.geminiApiKey,
            userId: agent.userId._id
        });
        
        console.log("Success! Response:", response);
    } catch (e) {
        console.log("ERROR:", e.message);
    }
    process.exit(0);
}
test();
