(function() {
    console.log("[Conversa] Script initialized");
    console.log("[Conversa] WIDGET LOADED: Looking for Agent ID...");
    
    function extractAgentId() {
        if (document.currentScript && document.currentScript.getAttribute('data-agent-id')) {
            return document.currentScript.getAttribute('data-agent-id');
        }
        const namedScript = document.querySelector('script[src*="assistant.js"]');
        if (namedScript && namedScript.getAttribute('data-agent-id')) {
            return namedScript.getAttribute('data-agent-id');
        }
        const anyScript = document.querySelector('script[data-agent-id]');
        if (anyScript) return anyScript.getAttribute('data-agent-id');
        return null;
    }
    
    const agentId = extractAgentId();
    console.log("[Conversa] Found Agent ID:", agentId);
    
    if (!agentId) {
        console.error("[Conversa] FATAL ERROR: No data-agent-id found in script tag!");
        return;
    }
    
    const script = document.currentScript || document.querySelector('script[src*="assistant.js"]');
    
    let isDev = false;
    let baseUrl = '';
    
    if (script && script.src) {
        try {
            const url = new URL(script.src);
            baseUrl = url.origin;
            if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
                isDev = true;
            }
        } catch(e) {}
    }
    
    if (!baseUrl) {
        baseUrl = 'https://conversa-app.onrender.com';
        isDev = true;
    }

    try {
        // Ensure container exists
        if (!document.getElementById('conversa-widget-root')) {
            const container = document.createElement('div');
            container.id = 'conversa-widget-root';
            if(agentId) container.dataset.agentId = agentId;
            document.body.appendChild(container);
            console.log("[Conversa] Created container element");
        }

        if (isDev) {
            console.log("[Conversa] Running in development mode");
            // Required for Vite React Refresh
            const reactRefresh = document.createElement('script');
            reactRefresh.type = 'module';
            reactRefresh.innerHTML = `
import RefreshRuntime from "${baseUrl}/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true
`;
            document.head.appendChild(reactRefresh);

            // Load Vite Client
            const viteClient = document.createElement('script');
            viteClient.type = 'module';
            viteClient.src = `${baseUrl}/@vite/client`;
            document.head.appendChild(viteClient);

            // Load Widget JSX
            const widgetScript = document.createElement('script');
            widgetScript.type = 'module';
            widgetScript.src = `${baseUrl}/src/widget.jsx`;
            document.head.appendChild(widgetScript);
        } else {
            console.log("[Conversa] Running in production mode, loading bundles from:", baseUrl);
            // Production Bundle Loading
            const prodScript = document.createElement('script');
            prodScript.type = 'module';
            prodScript.crossOrigin = 'anonymous';
            prodScript.src = `${baseUrl}/widget-bundle.js`; 
            document.head.appendChild(prodScript);
            
            const prodStyle = document.createElement('link');
            prodStyle.rel = 'stylesheet';
            prodStyle.href = `${baseUrl}/widget-bundle.css`;
            document.head.appendChild(prodStyle);
        }
    } catch (error) {
        console.error("[Conversa] Injection failed:", error);
    }
})();