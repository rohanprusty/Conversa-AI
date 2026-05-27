import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, animate, useMotionTemplate } from 'framer-motion';
import { Mic, X, MoreHorizontal, Sparkles } from 'lucide-react';
import axios from 'axios';

export default function FloatingAssistant({ agentId }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  
  useEffect(() => {
    if (window.__conversa_assistant_mounted__) {
      setIsDuplicate(true);
      return;
    }
    window.__conversa_assistant_mounted__ = true;
    return () => {
      window.__conversa_assistant_mounted__ = false;
    };
  }, []);

  useEffect(() => {
    console.log("[Conversa] React Component Mounted. Fetching data for:", agentId);
  }, [agentId]);
  
  // Voice AI States
  const [config, setConfig] = useState(null);
  const [status, setStatus] = useState("Tap button to Speak");
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const width = useMotionValue(80);
  const height = useMotionValue(80);
  const borderRadius = useMotionValue(40);
  
  const ctaLeft = useMotionTemplate`calc(${x}px - 180px)`;
  const ctaTop = useMotionTemplate`calc(${y}px + 16px)`;
  
  const expandedWidth = useRef(380);
  const expandedHeight = useRef(460);
  const isDragging = useRef(false);

  // Fetch Config
  useEffect(() => {
    if (agentId) {
      const fetchUrl = `https://conversa-ai-backend-joxu.onrender.com/api/assistant/config/${agentId}`;
      console.log("[Conversa] FETCHING FROM:", fetchUrl);
      
      const fetchConfig = async () => {
        try {
          const res = await axios.get(fetchUrl, {
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0'
            }
          });
          setConfig(res.data);
          console.log("[Conversa] Config fetched successfully");
        } catch (error) {
          console.error("[Conversa] Backend Fetch Error:", error);
        }
      };
      
      fetchConfig();
    }
  }, [agentId]);

  // Speech Setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setStatus("Listening...");
        setUserText("");
        setAiText("");
      };

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setUserText(text);
        setStatus("Thinking...");
        setIsListening(false);
        handleAskAI(text);
      };

      recognition.onerror = (event) => {
        console.error("Speech error", event.error);
        setStatus("Tap button to Speak");
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        setStatus(prev => prev === "Listening..." ? "Tap button to Speak" : prev);
      };

      recognitionRef.current = recognition;
    } else {
      setStatus("Speech not supported");
    }
  }, []);

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    // Split sentences roughly
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    setIsSpeaking(true);
    setStatus("AI Speaking...");

    let pending = sentences.length;
    sentences.forEach((sentence) => {
      const speech = new SpeechSynthesisUtterance(sentence.trim());
      speech.lang = "en-US"; // Standardize to en-US
      speech.rate = 1;
      speech.pitch = 1;
      speech.onend = () => {
        pending--;
        if (pending <= 0) {
          setIsSpeaking(false);
          setStatus("Tap button to Speak");
        }
      };
      window.speechSynthesis.speak(speech);
    });
  };

  const handleAskAI = async (message) => {
    if (!agentId) {
        setStatus("Deployment Error: Missing Agent ID.");
        return;
    }
    if (!message || message.trim() === "") {
        setStatus("Error: Did not hear a message.");
        return;
    }
    
    try {
      const res = await axios.post(`https://conversa-ai-backend-joxu.onrender.com/api/assistant/ask`, {
        message,
        agentId
      });
      const aiResponse = res.data.aiResponse;
      setAiText(aiResponse);

      // Handle navigation logic from original widget
      const navMatch = aiResponse.match(/\[NAVIGATE:(.*?)\]/);
      const scrollRegex = /\[SCROLL:([^\]]+)\]/;
      const scrollMatch = aiResponse.match(scrollRegex);
      
      let cleanedText = aiResponse;
      if (navMatch) {
        const path = navMatch[1].trim();
        cleanedText = cleanedText.replace(/\[NAVIGATE:.*?\]/g, "");
        if (window.location.pathname !== path) {
          setTimeout(() => {
            window.location.href = path;
          }, 2000);
        }
      }

      if (scrollMatch) {
        const extractedId = scrollMatch[1].trim();
        cleanedText = cleanedText.replace(scrollRegex, "");
        setTimeout(() => {
          const targetElement = document.querySelector(extractedId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetElement.style.transition = 'box-shadow 0.5s';
            targetElement.style.boxShadow = '0 0 20px #a855f7';
            setTimeout(() => {
              targetElement.style.boxShadow = 'none';
            }, 3000);
          }
        }, 100);
      }

      speak(cleanedText);
    } catch (error) {
      console.error("[Conversa] Backend Fetch Error:", error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || "NETWORK ERROR: Backend offline or CORS blocking.";
      setStatus("ERROR: " + errorMessage);
    }
  };

  const toggleMic = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      window.speechSynthesis.cancel(); // stop current speech
      recognitionRef.current?.start();
    }
  };

  // Layout Persistence
  useEffect(() => {
    const saved = localStorage.getItem('conversa-assistant-state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.width !== undefined) expandedWidth.current = parsed.width;
        if (parsed.height !== undefined) expandedHeight.current = parsed.height;
        if (parsed.x !== undefined) {
           x.set(parsed.x + (parsed.width - 80)); // Shift x to collapsed position
           y.set(parsed.y + (parsed.height - 80)); // Shift y to collapsed position
        } else {
           x.set(window.innerWidth - 80 - 24);
           y.set(window.innerHeight - 80 - 24);
        }
      } catch (e) {}
    } else {
      x.set(window.innerWidth - 80 - 24);
      y.set(window.innerHeight - 80 - 24);
    }
    setInitialized(true);
  }, [x, y]);

  const saveState = () => {
    const currentW = isExpanded ? width.get() : expandedWidth.current;
    const currentH = isExpanded ? height.get() : expandedHeight.current;
    const currentX = isExpanded ? x.get() : x.get() - (currentW - 80);
    const currentY = isExpanded ? y.get() : y.get() - (currentH - 80);

    localStorage.setItem('conversa-assistant-state', JSON.stringify({
      x: currentX,
      y: currentY,
      width: currentW,
      height: currentH,
    }));
  };

  // CTA logic
  useEffect(() => {
    if (isExpanded) {
      setCtaVisible(false);
      return;
    }
    const interval = setInterval(() => {
      setCtaVisible(true);
      setTimeout(() => setCtaVisible(false), 6000);
    }, 15000);
    const timeout = setTimeout(() => {
      setCtaVisible(true);
      setTimeout(() => setCtaVisible(false), 6000);
    }, 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isExpanded]);

  const toggleExpand = () => {
    if (!isExpanded) {
      const targetW = expandedWidth.current;
      const targetH = expandedHeight.current;
      const wDiff = targetW - 80;
      const hDiff = targetH - 80;
      
      const spring = { type: 'spring', damping: 25, stiffness: 300 };
      animate(width, targetW, spring);
      animate(height, targetH, spring);
      animate(x, x.get() - wDiff, spring);
      animate(y, y.get() - hDiff, spring);
      animate(borderRadius, 32, spring); // 2rem
      
      setIsExpanded(true);
    } else {
      expandedWidth.current = width.get();
      expandedHeight.current = height.get();
      saveState();
      
      const wDiff = width.get() - 80;
      const hDiff = height.get() - 80;
      
      const spring = { type: 'spring', damping: 25, stiffness: 300 };
      animate(width, 80, spring);
      animate(height, 80, spring);
      animate(x, x.get() + wDiff, spring);
      animate(y, y.get() + hDiff, spring);
      animate(borderRadius, 40, spring); // full circle
      
      setIsExpanded(false);
    }
  };

  if (isDuplicate || !initialized) return null;

  return (
    <div 
      className="fixed inset-0 z-[999999] pointer-events-none overflow-hidden conversa-widget-container"
      style={{ boxSizing: 'border-box', fontFamily: 'sans-serif', lineHeight: 1.5 }}
    >
      {/* CTA Bubble outside the orb */}
      <AnimatePresence>
        {!isExpanded && ctaVisible && !isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            style={{ 
              position: 'absolute',
              left: ctaLeft,
              top: ctaTop
            }}
            className="hidden sm:flex items-center gap-2 bg-[#0B1020]/90 backdrop-blur-md border border-cyan-500/30 text-white px-5 py-3 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.2)] pointer-events-auto whitespace-nowrap"
          >
            <span className="text-sm font-medium tracking-wide whitespace-nowrap">Let me assist you</span>
            <span className="animate-pulse">✨</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        drag
        dragMomentum={true}
        dragElastic={0.1}
        onDragStart={() => (isDragging.current = true)}
        onDragEnd={() => {
           setTimeout(() => (isDragging.current = false), 100);
           saveState();
        }}
        whileDrag={{ scale: 0.98, zIndex: 9999, boxShadow: "0 0 40px rgba(34,211,238,0.3)" }}
        style={{ x, y, width, height, borderRadius }}
        className={`absolute top-0 left-0 pointer-events-auto overflow-hidden flex flex-col conversa-theme-${config?.user?.theme || 'dark'}`}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <ExpandedPanel
              key="panel"
              onClose={toggleExpand}
              widthMotion={width}
              heightMotion={height}
              yMotion={y}
              saveState={saveState}
              config={config}
              status={status}
              userText={userText}
              aiText={aiText}
              isListening={isListening}
              isSpeaking={isSpeaking}
              onMicClick={toggleMic}
            />
          ) : (
            <OrbContent
              key="orb"
              onClick={() => {
                 if (!isDragging.current) toggleExpand();
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              isSpeaking={isSpeaking}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function OrbContent({ onClick, onMouseEnter, onMouseLeave, isSpeaking }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full relative cursor-pointer group flex items-center justify-center"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
       <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none ${isSpeaking ? 'animate-pulse scale-110' : 'animate-pulse'}`} />
       
       <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 pointer-events-none" />
       <motion.div
         animate={{ y: [-2, 2, -2] }}
         transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
       >
         {isSpeaking ? (
           <MoreHorizontal className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse" />
         ) : (
           <Sparkles className="w-10 h-10 p-2.5 text-cyan-300 bg-white/5 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)] group-hover:scale-110 group-hover:text-cyan-200 transition-all duration-300" />
         )}
       </motion.div>
    </motion.div>
  );
}

function ExpandedPanel({ onClose, widthMotion, heightMotion, yMotion, saveState, config, status, userText, aiText, isListening, isSpeaking, onMicClick }) {
  
  const handleResizePointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = widthMotion.get();
    const startHeight = heightMotion.get();
    const startYPos = yMotion.get();

    const onPointerMove = (eMove) => {
      const deltaX = eMove.clientX - startX;
      const deltaY = eMove.clientY - startY; // negative if moving up

      let newWidth = Math.max(280, Math.min(520, startWidth + deltaX)); // Min width 280 for expanded
      let newHeight = Math.max(360, Math.min(760, startHeight - deltaY)); // Min height 360 for expanded
      
      const heightDiff = newHeight - startHeight;
      const newY = startYPos - heightDiff;

      widthMotion.set(newWidth);
      heightMotion.set(newHeight);
      yMotion.set(newY);
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      saveState();
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-full flex flex-col pointer-events-none"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-2xl opacity-40 pointer-events-none" />
      
      {/* Top Right Resize Handle */}
      <div 
        onPointerDown={handleResizePointerDown}
        className="absolute top-0 right-0 w-8 h-8 z-50 cursor-nesw-resize pointer-events-auto flex items-start justify-end p-2 group"
      >
         <div className="w-3 h-3 rounded-full bg-cyan-400/30 group-hover:bg-cyan-400/80 transition-colors shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
      </div>
      
      <div className="relative z-10 p-6 flex flex-col items-center h-full justify-center pointer-events-none overflow-y-auto custom-scrollbar">
        
        {/* Header Draggable Area (Pointer events auto to catch drags) */}
        <div className="absolute top-6 left-6 right-12 flex justify-between items-start pointer-events-auto cursor-grab active:cursor-grabbing">
           <div className="flex gap-1.5 pt-1">
             <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
             <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
             <div className="w-2.5 h-2.5 rounded-full bg-cyan-400/80 shadow-[0_0_10px_rgba(34,211,238,0.5)] animate-pulse" />
           </div>
        </div>

        {/* Close button explicitly pointer-events-auto */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-10 text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full p-2 pointer-events-auto z-40"
        >
          <X size={16} />
        </button>

        {/* Dynamic Content */}
        <div className="w-full h-full flex flex-col items-center mt-6">
          <motion.div 
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`relative w-20 h-20 mb-6 shrink-0 ${isSpeaking ? 'scale-110 transition-transform' : ''}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full blur-md animate-pulse" />
            <div className="absolute inset-1.5 bg-gradient-to-br from-fuchsia-400 to-cyan-300 rounded-full shadow-[0_0_30px_rgba(192,38,211,0.6)]" />
          </motion.div>

          <h3 id="conversa-agent-name" className="text-xl font-bold text-white mb-2 tracking-tight text-center">
            Hello! I'm {config?.user?.assistantName || "Conversa AI"}
          </h3>
          <p className="text-sm text-gray-400 text-center mb-6 leading-relaxed max-w-[80%]">
            Welcome to {config?.user?.businessName || "Conversa"}.<br/>Ask anything about your website.
          </p>

          {/* Conversation Area */}
          <div className="flex-1 w-full flex flex-col justify-center items-center gap-4 text-center px-4 overflow-y-auto mb-4 custom-scrollbar">
            {userText && (
              <p className="text-sm text-cyan-200 font-medium bg-cyan-500/10 px-4 py-2 rounded-2xl">
                "{userText}"
              </p>
            )}
            {aiText && (
              <p className="text-sm text-gray-300 bg-white/5 px-4 py-3 rounded-2xl border border-white/5 shadow-inner">
                {aiText}
              </p>
            )}
          </div>

          {/* Listening Indicator */}
          <div className="flex flex-col items-center gap-4 w-full mt-auto pointer-events-auto pb-2">
            <span className={`text-[10px] font-medium uppercase tracking-widest ${isListening ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`}>
              {status}
            </span>
            
            <motion.div 
              onClick={onMicClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative w-full max-w-[220px] h-12 rounded-full border ${isListening ? 'border-red-500/50 bg-red-500/20' : 'border-cyan-500/30 bg-cyan-500/10'} flex items-center justify-center cursor-pointer overflow-hidden group`}
            >
               <div className={`absolute inset-0 bg-gradient-to-r ${isListening ? 'from-red-500/20 to-orange-500/20' : 'from-cyan-500/20 to-purple-500/20'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
               <div className="flex items-center gap-3 relative z-10">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] ${isListening ? 'animate-pulse text-red-400' : ''}`}>
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="22"></line>
                  </svg>
                  <span className={`text-sm font-semibold tracking-wide whitespace-nowrap ${isListening ? 'text-red-50' : 'text-cyan-50'}`}>
                    {isListening ? "Stop Listening" : "Tap to Speak"}
                  </span>
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
