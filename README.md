<div align="center">
  
  <h1>🤖 Conversa AI</h1>
  
  <p><b>The Next-Generation Embeddable Voice AI Platform</b></p>
  
  <p><i>A full-stack SaaS platform that allows businesses to instantly deploy and manage an entire fleet of intelligent, voice-activated AI assistants.</i></p>

  <p>
    <a href="https://conversa-ai-frontend.onrender.com"><b>View Live Demo</b></a> •
    <a href="#-installation"><b>Quick Start</b></a> •
    <a href="#-architecture-overview"><b>Read Architecture</b></a>
  </p>

</div>

---

## 📋 Table of Contents

* [✨ Features](#-features)
* [🛠️ Technology Stack](#️-technology-stack)
* [🏛️ Architecture Overview](#-architecture-overview)
* [🚀 Installation](#-installation)
* [⚙️ Configuration](#️-configuration)
* [🌍 Production Deployment](#-production-deployment)

---

## ✨ Features

### 🤖 Multi-Agent Fleet Management
* **Infinite Scaling:** Create, edit, and manage multiple distinct AI assistants simultaneously from a single dashboard account.
* **Dynamic State Isolation:** Each bot retains its own unique configuration in the database (Name, Persona, Theme, Token Count). Changes made in the dashboard update the live widget instantly.

### 🔌 One-Line Integration
* **Frictionless Onboarding:** Users simply paste a `<script>` tag into their HTML. The AI widget bootstraps itself securely onto any host website without disrupting existing CSS or DOM layouts.

### 🎙️ Voice & Navigation Engine
* **Real-time Interaction:** Integrated Web Speech API for seamless voice-to-text recognition and natural language audio responses.
* **Autonomous Navigation:** The AI can intelligently navigate users to different pages on the host website based purely on conversational context.

### 🎨 Elite Theming & UI/UX
* **Dynamic CSS Variable Theming:** A highly scalable structural color system. Widgets seamlessly transition between curated themes (Light, Dark, Glass, Neon) based on database state.
* **Framer Motion Physics:** Designed to feel "alive" with 60fps spring-physics animations, glowing orbs, and draggable panels that remember their coordinates via `localStorage`.

### 🛡️ Isolated Widget Architecture
* **Cross-Origin Resiliency:** Custom Vite/Rollup configurations compile the React widget into a single, predictable ES module (`widget-bundle.js`). This eliminates cross-domain chunking 404 errors.

---

## 🛠️ Technology Stack

| Frontend (Widget & Dashboard) | Backend (API Server) |
| :--- | :--- |
| **Framework:** React 19 + Vite | **Runtime:** Node.js + Express |
| **Styling:** Tailwind CSS v4 | **Database:** MongoDB (Mongoose) |
| **Animations:** Framer Motion | **Auth:** JWT + HTTP-Only Cookies |
| **State Management:** React Hooks | **Payments:** Razorpay Integration |

---

## 🏛️ Architecture Overview

Conversa AI uses a multi-stage injection pipeline to ensure absolute stability on external websites:

> **1. The Loader (`assistant.js`):** A lightweight vanilla JS file loaded onto the client's website. It extracts the `data-agent-id`, creates a shadow DOM/container, and injects the React bundles.
> 
> **2. The Bundler (Vite):** A custom `vite.config.js` outputs a clean `widget-bundle.js` without random chunk hashes, ensuring the loader never encounters 404 errors.
> 
> **3. The Component (`FloatingAssistant.jsx`):** A React application bootstrapped inside the host website. It uses the ID to fetch its specific configuration from the Express API and mounts dynamically.

---

## 🚀 Installation

### 1. Backend Setup
```bash
cd Server
npm install
npm run dev

```

### 2. Frontend Setup

```bash
cd ../Client
npm install
npm run dev

```

---

## 🎯 Quick Start

Get your first AI assistant live in three simple steps:

1. **Create an Agent:** Register on the dashboard and click **"+ Create New Assistant"**. Give it a distinct name and define its personality.
2. **Customize UI:** Select from the premium structural themes (Glass, Neon, Dark, Light).
3. **Embed & Speak:** Copy the generated snippet and paste it right before the closing `</body>` tag of your website:

```html
<script src="[https://conversa-ai-frontend.onrender.com/assistant.js](https://conversa-ai-frontend.onrender.com/assistant.js)" data-agent-id="YOUR_UNIQUE_AGENT_ID"></script>

```

---

## ⚙️ Configuration

Create `.env` files in both directories before running the application.

**Server `.env`:**

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

```

**Client `.env`:**

```env
VITE_API_URL=http://localhost:5000/api

```

---

## 🌍 Production Deployment

* **Frontend:** Deploy to Vercel/Render.
* ⚠️ *Critical:* Configure your hosting to return an `Access-Control-Allow-Origin: *` header for all static assets.


* **Backend:** Deploy to Render/AWS.
* ⚠️ *Critical:* Ensure Express `cors` middleware accepts cross-origin requests (`origin: '*'`).


* **HTTPS Protocol:** The Web Speech API requires a secure context. The widget will automatically disable the microphone on non-HTTPS domains.

---
