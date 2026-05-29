import express from "express"
import dotenv from "dotenv"
import connectDB from "./Configs/ConnectDB.js"
import authRouter from "./Routes/auth.route.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import userRouter from "./Routes/user.route.js"
import assistantRouter from "./Routes/assistant.route.js"
import billingRouter from "./Routes/billing.route.js"
import agentRouter from "./Routes/agent.route.js"
import logRouter from "./Routes/log.route.js"


const app = express()

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://conversa-app.onrender.com"
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json())
app.use(cookieParser())



app.get("/" , (req,res)=>{
    res.json("Hello from Server")
})

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/billing", billingRouter)

app.use("/api/assistant", assistantRouter)
app.use("/api/agents", agentRouter)
app.use("/api/logs", logRouter)
const PORT = process.env.PORT
app.listen(PORT , ()=>{
    console.log(`Server Started on Port ${PORT}`)
    connectDB()
})
