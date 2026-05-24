import React from 'react';
import ReactDOM from 'react-dom/client';
import FloatingAssistant from './Components/FloatingAssistant';
import './index.css';

const script = document.currentScript || document.querySelector('script[data-agent-id]');
const agentId = script?.dataset?.agentId;

const container = document.createElement('div');
container.id = 'conversa-widget-root';
if(agentId) container.dataset.agentId = agentId;
document.body.appendChild(container);

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <FloatingAssistant agentId={agentId} />
  </React.StrictMode>
);
