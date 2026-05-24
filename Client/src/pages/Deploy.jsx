import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl, CLIENT_URL } from '../App';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import GlassCard from '../Components/GlassCard';
import AnimatedButton from '../Components/AnimatedButton';
import { FiCopy } from 'react-icons/fi';

const Deploy = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agentName, setAgentName] = useState("Loading...");

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const res = await axios.get(ServerUrl + `/api/agents/${id}`, { withCredentials: true });
        setAgentName(res.data.assistantName || "Your Assistant");
      } catch (error) {
        console.log(error);
        toast.error("Failed to load assistant data.");
      }
    };
    if (id) fetchAgent();
  }, [id]);

  const remainingMessages = Math.max(0, (user?.requestLimit || 0) - (user?.totalMessages || 0));
  const embedCode = `<script src="${CLIENT_URL}/assistant.js" data-agent-id="${id}"></script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className='min-h-screen pt-32 pb-16 px-4 md:px-8 relative z-10'>
      <div className='max-w-4xl mx-auto'>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-12 text-center'
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-[0_0_40px_rgba(52,211,153,0.4)] mb-6 animate-pulse">
            <span className="text-white font-bold text-3xl">✓</span>
          </div>
          <h2 className='text-4xl md:text-5xl font-black text-white tracking-tight mb-4'>
            Deploy <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{agentName}</span>
          </h2>
          <p className='text-gray-400 text-lg'>Your assistant is saved and ready to be embedded on your website.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className='p-8 mb-8 border-emerald-500/20'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
              <div className='rounded-2xl liquid-glass p-5 border border-white/5'>
                <p className='text-xs font-medium text-gray-400 uppercase tracking-wider'>Current Plan</p>
                <h2 className='text-2xl font-bold text-white mt-2 capitalize'>{user?.plan || "Free"}</h2>
              </div>
              <div className='rounded-2xl liquid-glass p-5 border border-white/5'>
                <p className='text-xs font-medium text-gray-400 uppercase tracking-wider'>AI Engine</p>
                <h2 className={`text-2xl font-bold mt-2 capitalize ${user?.geminiStatus === "active" ? "text-cyan-400" : "text-purple-400"}`}>
                  {user?.geminiStatus || "Active"}
                </h2>
              </div>
              <div className='rounded-2xl liquid-glass p-5 border border-white/5'>
                <p className='text-xs font-medium text-gray-400 uppercase tracking-wider'>Messages Left</p>
                <h2 className='text-2xl font-bold text-white mt-2'>{remainingMessages}</h2>
              </div>
            </div>

            <div className='mb-8'>
              <h3 className="text-xl font-bold text-white mb-4">Where to paste this script?</h3>
              <div className='rounded-2xl liquid-glass p-6 border border-emerald-500/20 relative overflow-hidden'>
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                <p className='text-sm text-gray-300 mb-4 leading-relaxed'>
                  Copy the snippet below and paste it just before the closing <code className="bg-white/10 px-2 py-0.5 rounded text-emerald-400">{"</body>"}</code> tag of your website.
                </p>
                <div className='relative'>
                  <textarea 
                    readOnly 
                    value={embedCode} 
                    className='w-full h-24 bg-[#050816]/80 text-cyan-400 rounded-xl p-4 text-sm font-mono resize-none outline-none border border-white/5 shadow-inner'
                  />
                  <button 
                    onClick={copyToClipboard} 
                    className='absolute top-4 right-4 w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors border border-white/10 backdrop-blur-md cursor-pointer'
                  >
                    <FiCopy />
                  </button>
                </div>
              </div>
            </div>

            <AnimatedButton variant="secondary" onClick={() => navigate('/dashboard')} className="w-full">
              Back to Dashboard
            </AnimatedButton>
          </GlassCard>
        </motion.div>

      </div>
    </div>
  );
};

export default Deploy;
