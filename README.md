🤖 Conversa AI
The Next-Generation Embeddable Voice AI Platform

A full-stack SaaS platform that allows businesses to instantly deploy and manage an entire fleet of intelligent, voice-activated AI assistants. Built with modern web technologies, prioritizing buttery-smooth micro-interactions, robust cross-origin architecture, and dynamic state management.

🔗 Live Demo:
Conversa AI Live Demo

📋 Table of Contents
✨ Features
🛠️ Technology Stack
🏛️ Architecture Overview
🚀 Installation
🎯 Quick Start
⚙️ Configuration
🌍 Production Deployment
🤝 Contributing
📄 License
🔮 Roadmap
✨ Features
🤖 Multi-Agent Fleet Management
Infinite Scaling: Create, edit, and manage multiple AI assistants simultaneously from a single dashboard.
Dynamic State Isolation: Every assistant maintains its own unique configuration including:
Name
Persona
Theme
Token Limits

Changes made from the dashboard instantly reflect in the live widget without replacing the embed code.

🔌 One-Line Integration
Frictionless Setup: Users only need to paste a single <script> tag into their website.
The AI widget securely bootstraps itself without interfering with the host site's CSS or DOM structure.
🎙️ Voice & Navigation Engine
Real-Time Voice Interaction: Powered by the Web Speech API for smooth voice-to-text communication.
Smart Navigation: The assistant can intelligently redirect users to relevant pages on the host website through conversational context.
🎨 Elite Theming & UI/UX
Dynamic CSS Variable Theming: Supports premium themes including:
Glass
Neon
Dark
Light
Framer Motion Animations: Smooth 60fps spring animations, glowing effects, and draggable assistant panels with persistent positions using localStorage.
🛡️ Isolated Widget Architecture
Cross-Origin Resiliency: Custom Vite/Rollup bundling generates a single stable widget-bundle.js file, eliminating:
Chunk-loading failures
CORB issues
Cross-domain asset problems
🛠️ Technology Stack
Frontend (Dashboard & Widget)
Framework: React 19 + Vite
Styling: Tailwind CSS v4
Animations: Framer Motion
State Management: React Hooks + Context API
Backend (API Server)
Runtime: Node.js + Express.js
Database: MongoDB with Mongoose
Authentication: JWT + HTTP-Only Cookies
Payments: Razorpay Integration
🏛️ Architecture Overview

Conversa AI follows a multi-stage injection architecture for maximum stability on external websites.

1️⃣ Loader (assistant.js)

A lightweight JavaScript loader that:

Reads the data-agent-id
Creates a container/shadow root
Injects the React widget dynamically
2️⃣ Bundler (Vite)

Custom vite.config.js ensures:

Stable build outputs
No random chunk hashes
Reliable widget loading without 404 issues
3️⃣ Widget Component (FloatingAssistant.jsx)

The React widget:

Fetches assistant-specific configurations
Loads theme/persona dynamically
Mounts the interactive floating assistant UI
🚀 Installation
1️⃣ Backend Setup
cd Server
npm install
npm run dev
2️⃣ Frontend Setup
cd Client
npm install
npm run dev
🎯 Quick Start

Get your AI assistant live in 3 simple steps:

1️⃣ Create an Assistant
Register on the dashboard
Click "+ Create New Assistant"
Configure:
Name
Personality
Theme
2️⃣ Customize the UI

Choose from premium themes:

Glass
Neon
Dark
Light
3️⃣ Embed the Widget

Paste this snippet before the closing </body> tag of your website:

<script 
  src="https://conversa-ai-frontend.onrender.com/assistant.js"
  data-agent-id="YOUR_UNIQUE_AGENT_ID">
</script>
⚙️ Configuration

Create .env files in both the Server and Client directories.

Server .env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
Client .env
VITE_API_URL=http://localhost:5000/api
🌍 Production Deployment
Frontend Deployment

Deploy using:

Vercel
Render

⚠️ Important:
Configure your hosting provider to return:

Access-Control-Allow-Origin: *

for all static assets.

Backend Deployment

Deploy using:

Render
AWS
Railway

⚠️ Important:
Ensure Express CORS middleware allows cross-origin requests:

origin: "*"
HTTPS Requirement

The Web Speech API requires a secure HTTPS environment.

On non-HTTPS domains:

Microphone functionality will automatically be disabled.
🤝 Contributing

Contributions are welcome!

Steps
# Fork the repository

# Create a feature branch
git checkout -b feature/AmazingFeature

# Commit your changes
git commit -m "Add AmazingFeature"

# Push to GitHub
git push origin feature/AmazingFeature

Then open a Pull Request 🚀

📄 License

Distributed under the MIT License.
See the LICENSE file for more information.

🔮 Roadmap
 Custom Knowledge Base (RAG Integration)
 PDF & Website Training Support
 Analytics Dashboard
 Multi-Language Support
 Trigger-Based Widget Opening
 AI Conversation History
 Team Collaboration Features
 Advanced SaaS Billing Plans
