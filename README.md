<div align="center">
  
  <h1>🤖 Conversa AI</h1>
  
  <p><b>The Next-Generation Embeddable Voice AI Platform</b></p>
  
  <p><i>An enterprise-grade SaaS platform enabling businesses to instantly deploy, manage, and scale fleets of intelligent, voice-activated AI assistants.</i></p>

  <p>
    <a href="https://conversa-app.onrender.com/"><b>View Live Demo</b></a> •
    <a href="#-quick-start"><b>Quick Start</b></a> •
    <a href="#-architecture-overview"><b>Architecture</b></a> •
    <a href="#-enterprise-deployment-docker--cicd"><b>Deployment</b></a>
  </p>

  <p>
    <i>Video Demonstration:</i><br>
    https://github.com/user-attachments/assets/9845f139-0304-4164-9762-9629a45fe0ec
  </p>

</div>

---

## 📋 Table of Contents
* [✨ Features](#-features)
* [🛠️ Technology Stack](#️-technology-stack)
* [🏛️ Architecture Overview](#-architecture-overview)
* [🚀 Local Development](#-local-development)
* [🎯 Quick Start](#-quick-start)
* [⚙️ Configuration](#️-configuration)
* [🌍 Enterprise Deployment (Docker & CI/CD)](#-enterprise-deployment-docker--cicd)
* [🤝 Contributing](#-contributing)
* [📄 License](#-license)
* [🔮 Roadmap](#-roadmap)

---

## ✨ Features

### 🤖 Multi-Agent Fleet Management
* **Scalable Architecture:** Provision, configure, and manage multiple distinct AI assistants simultaneously from a centralized administrative dashboard.
* **Dynamic State Isolation:** Each agent retains a unique configuration profile (Identity, Persona, Thematic UI, Token Limits). Dashboard updates propagate to live widgets instantaneously without requiring host-site code changes.

### 🔌 Zero-Friction Integration
* **Single-Line Implementation:** Seamlessly bootstrap the AI widget onto any host application via a lightweight `<script>` tag, ensuring zero CSS conflicts or DOM mutation interference.

### 🎙️ Voice & Navigation Engine
* **Real-Time Processing:** Integrated Web Speech API for low-latency voice-to-text recognition and natural language audio synthesis.
* **Autonomous Routing:** Intelligent contextual routing capabilities allow the AI to navigate users across the host domain based on conversational intent.

### 🎨 Elite Theming & UI/UX
* **Dynamic CSS Architecture:** A highly scalable structural color system allowing widgets to seamlessly transition between curated aesthetic profiles (Light, Dark, Glass, Neon).
* **Kinetic UI:** Engineered for fluid user experiences utilizing 60fps Framer Motion spring-physics, ambient lighting effects, and persistent spatial coordinates via `localStorage`.

### 🛡️ Isolated Component Architecture
* **Cross-Origin Resiliency:** Custom Vite and Rollup build processes compile the React widget into a singular, predictable ES module (`widget-bundle.js`), mitigating cross-domain chunking (404) and CORB security policies.

---

## 🛠️ Technology Stack

**Frontend (Dashboard & Widget)**
* **Framework:** React 19 + Vite
* **Styling:** Tailwind CSS v4
* **Animations:** Framer Motion
* **State Management:** React Hooks + Context API

**Backend (API Server)**
* **Runtime:** Node.js + Express
* **Database:** MongoDB (Mongoose ODM)
* **Security:** JSON Web Tokens (JWT) + HTTP-Only Cookies
* **Billing:** Razorpay Payment Gateway API

**DevOps & Infrastructure**
* **Containerization:** Docker + Docker Compose
* **Web Server (Reverse Proxy):** Nginx (Alpine)
* **CI/CD Pipeline:** GitHub Actions
* **Hosting:** Render (Web Services)

---

## 🏛️ Architecture Overview

Conversa AI employs a secure, multi-stage injection pipeline to guarantee absolute stability across unpredictable external DOM environments:

1. **The Bootstrapper (`assistant.js`):** A lightweight vanilla JavaScript entry point loaded by the client. It securely extracts the `data-agent-id`, generates an isolated container, and injects the compiled React assets.
2. **The Bundler (Vite):** A specialized `vite.config.js` configuration outputs a monolithic `widget-bundle.js`, preventing the dynamic import failures common in cross-origin script injection.
3. **The Component (`FloatingAssistant.jsx`):** A React application mounted inside the host environment. It authenticates the `data-agent-id`, fetches its specific operational parameters from the Express backend, and initializes the interactive UI.

---

## 🚀 Local Development

**1. Clone the repository:**
```bash
git clone [https://github.com/yourusername/conversa-ai.git](https://github.com/yourusername/conversa-ai.git)
cd conversa-ai

```

**2. Initialize Backend:**

```bash
cd Server
npm install
npm run dev

```

**3. Initialize Frontend:**

```bash
cd ../Client
npm install
npm run dev

```

---

## 🎯 Quick Start

Deploy your first AI assistant in three steps:

1. **Provision an Agent:** Register on the platform and select **"+ Create New Assistant"**. Define the agent's identity, conversational boundaries, and persona.
2. **Customize UI:** Apply one of the premium structural themes (Glass, Neon, Dark, Light) tailored to match your brand identity.
3. **Embed:** Copy the generated integration script and place it immediately preceding the closing `</body>` tag of your application:

```html
<script src="[https://conversa-app.onrender.com/assistant.js](https://conversa-app.onrender.com/assistant.js)" data-agent-id="YOUR_UNIQUE_AGENT_ID"></script>

```

---

## ⚙️ Configuration

Ensure `.env` files are configured in both respective directories prior to initialization.

**Server Environment (`Server/.env`):**

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_cryptographic_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

```

**Client Environment (`Client/.env`):**

```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id

```

---

## 🌍 Enterprise Deployment (Docker & CI/CD)

Conversa AI utilizes a fully automated CI/CD pipeline. Pushing to the `main` branch triggers a GitHub Action that builds isolated Docker images, pushes them to Docker Hub, and executes deployment hooks to update live containers on Render.

To fork and deploy this architecture:

### 1. Infrastructure Provisioning

1. **Docker Hub:** Generate a Personal Access Token.
2. **Render:** Provision two **Web Services** (Backend and Frontend) utilizing the *"Deploy an existing image from a registry"* configuration.
* *Note:* Ensure the Frontend service exposes Port `80` (Nginx default).


3. Extract the unique **Deploy Hook URLs** from the Settings panel of both Render services.

### 2. GitHub Secrets Configuration

Navigate to **Settings > Secrets and variables > Actions** in your repository and inject the following:

**DevOps Secrets:**

* `DOCKER_PASSWORD` (Docker Hub Access Token)
* `RENDER_BACKEND_HOOK` (Render Backend Deploy Hook)
* `RENDER_FRONTEND_HOOK` (Render Frontend Deploy Hook)

**Build-Time Variables (Injected via Docker ARG):**

* `VITE_FIREBASE_API_KEY`
* `VITE_RAZORPAY_KEY_ID`

### 3. Server Configuration (Render)

Inject your backend `.env` variables directly into the Render Backend Web Service **Environment** tab (MongoDB URI, JWT Secret, Razorpay Credentials). Ensure CORS is configured to accept preflight requests from your specific frontend domain.

### 4. Pipeline Execution

1. Open `.github/workflows/ci.yml`.
2. Update the Docker image tags to match your registry (`yourusername/conversa-frontend:latest`).
3. Update the `VITE_API_URL` build argument to point to your deployed backend.
4. Commit and push to `main`. The pipeline will automatically compile the React application, containerize the services, and execute the zero-downtime deployment.

---

## 🤝 Contributing

We welcome contributions to expand Conversa's capabilities.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/EnterpriseFeature`)
3. Commit your Changes (`git commit -m 'feat: Implement EnterpriseFeature'`)
4. Push to the Branch (`git push origin feature/EnterpriseFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🔮 Roadmap

* [ ] **Retrieval-Augmented Generation (RAG):** Custom knowledge base integration enabling document parsing (PDF/TXT) and domain-specific AI training.
* [ ] **Telemetry & Analytics:** Administrative dashboard for tracking widget interactions, intent recognition rates, and session drop-offs.
* [ ] **Localization Engine:** Automatic browser language detection with dynamic text-to-speech localization.
* [ ] **Event-Driven Triggers:** Programmatic widget initialization based on user behavior (scroll depth, exit-intent, time-on-page).
