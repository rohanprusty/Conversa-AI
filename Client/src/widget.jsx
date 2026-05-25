import React from 'react';
import ReactDOM from 'react-dom/client';
import FloatingAssistant from './Components/FloatingAssistant';
import './index.css';

function extractAgentId() {
    const namedScript = document.querySelector('script[src*="assistant.js"]');
    if (namedScript && namedScript.getAttribute('data-agent-id')) return namedScript.getAttribute('data-agent-id');
    const anyScript = document.querySelector('script[data-agent-id]');
    if (anyScript) return anyScript.getAttribute('data-agent-id');
    return null;
}
let agentId = extractAgentId();

const rootElement = document.getElementById('conversa-widget-root');
if (!agentId && rootElement) {
    agentId = rootElement.dataset.agentId;
}

const container = rootElement || document.createElement('div');
if (!rootElement) {
  container.id = 'conversa-widget-root';
  if(agentId) container.dataset.agentId = agentId;
  document.body.appendChild(container);
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <FloatingAssistant agentId={agentId} />
  </React.StrictMode>
);
