<div align="center">
  
# 🤖 Conversa AI
**The Next-Generation Embeddable Voice AI Platform**

[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

A full-stack SaaS platform that allows businesses to instantly deploy intelligent, voice-activated AI assistants to their websites using a single line of code. Built with modern web technologies, prioritizing buttery-smooth micro-interactions, robust cross-origin architecture, and a dynamic theming engine.

</div>

---

## ✨ Elite Engineering Highlights

Building an embeddable widget SaaS presents unique engineering challenges compared to standard web apps. Conversa AI tackles these head-on:

- **Isolated Widget Architecture:** Custom Vite/Rollup configuration to compile the React widget into a single, predictable ES module (`widget-bundle.js`) alongside a unified CSS payload. This eliminates cross-domain chunking errors (404s) and CORB issues when injected into third-party host sites.
- **Cross-Origin Resource Sharing (CORS) Mastery:** Securely engineered backend endpoints to allow dynamic script injection and API communication from any host domain while protecting the core dashboard API.
- **Dynamic CSS Variable Theming:** A highly scalable structural color system utilizing HSL variables. The widget seamlessly transitions between beautifully curated themes (*Light, Dark, Glass, Neon*) without needing to swap hardcoded utility classes.
- **Fluid UI/UX:** Leveraging **Framer Motion** for 60fps spring-physics animations, draggable elements, and expanding panels. The UI is designed to feel "alive" with glowing orbs, pulsating microphone indicators, and smooth layout transitions.
- **Monetization Ready:** Fully integrated with **Razorpay** for subscription management and billing.

## 🚀 Core Features

* **One-Line Integration:** Users just paste `<script src="conversa/assistant.js" data-agent-id="..."></script>` into their HTML.
* **Voice-to-Text & Text-to-Speech:** Integrated Web Speech API for real-time voice recognition and natural language audio responses.
* **Intelligent Website Navigation:** The AI can autonomously navigate users to different pages on the host website or smoothly scroll to specific elements based on conversation context.
* **Custom SaaS Dashboard:** A beautiful client portal featuring smooth scrolling (Lenis), protected routes, authentication (JWT/Firebase), and agent customization tools.
* **Persistent State:** The floating widget remembers its dragged coordinates and expanded state across page reloads using `localStorage`.

---

## 🛠️ Technology Stack

### Frontend (Dashboard & Widget)
* **Framework:** React 19 + Vite
* **Styling:** Tailwind CSS v4
* **Animations:** Framer Motion
* **Scroll Engine:** Lenis (Smooth scrolling for the dashboard)
* **Icons:** Lucide React
* **State Management:** React Hooks + Context

### Backend (API Server)
* **Runtime:** Node.js + Express
* **Database:** MongoDB (Mongoose)
* **Authentication:** JSON Web Tokens (JWT) + HTTP-Only Cookies
* **Payment Gateway:** Razorpay integration

---

## 🏗️ Architecture Overview: The Embed Pipeline

1. **The Loader (`assistant.js`):** A lightweight vanilla JavaScript file loaded onto the client's website. It detects the host environment, extracts the `data-agent-id`, creates a shadow container, and dynamically injects the React ES Module bundles via absolute URLs.
2. **The Bundler (Vite):** A custom `vite.config.js` strips away random chunk hashes for the widget entry point, ensuring the loader always requests the exact `widget-bundle.js` and `widget-bundle.css`.
3. **The Component (`FloatingAssistant.jsx`):** A React application bootstrapped inside the host website. It immediately fetches its specific configuration (Theme, AI Persona) from the Express API and mounts the interactive UI.

---

## 💻 Local Development Setup

Clone the repository and install dependencies for both the Client and Server:

```bash
git clone https://github.com/rohanprusty/Conversa-AI.git
cd Conversa-AI

# 1. Setup Backend
cd Server
npm install
# Create a .env file with your MongoDB URI, JWT Secret, and Razorpay Keys
npm run dev

# 2. Setup Frontend
cd ../Client
npm install
# Create a .env file with your API URL
npm run dev
```

---

<div align="center">
  <i>Designed and engineered with passion by <a href="https://github.com/rohanprusty">Rohan Prusty</a></i>
</div>
