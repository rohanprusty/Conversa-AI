import React from 'react';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import GlassCard from './GlassCard';

const AssistantPreview = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1, delay: 0.2, type: 'spring' }}
      className="relative w-full max-w-sm mx-auto perspective-1000"
    >
      {/* Background Glow for Card */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-[2.5rem] blur-2xl opacity-20 animate-glow" />
      
      <GlassCard className="relative p-8 rounded-[2.5rem] flex flex-col items-center justify-center min-h-[400px] border-white/20 bg-[#0B1020]/80">
        
        {/* Top Dots */}
        <div className="absolute top-6 right-6 flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400/80 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
        </div>

        {/* Floating AI Orb */}
        <motion.div 
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-24 h-24 mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full blur-md animate-pulse" />
          <div className="absolute inset-2 bg-gradient-to-br from-fuchsia-400 to-cyan-300 rounded-full shadow-[0_0_30px_rgba(192,38,211,0.6)]" />
        </motion.div>

        {/* Text content */}
        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Hello! I'm Conversa AI</h3>
        <p className="text-sm text-gray-400 text-center mb-8 max-w-[200px] leading-relaxed">
          Your smart voice assistant. Ask anything about your website.
        </p>

        {/* Listening Indicator */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs font-medium text-cyan-400 uppercase tracking-widest animate-pulse">Listening...</span>
          
          {/* Animated Voice Bars */}
          <div className="flex items-center gap-1.5 h-8">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: ['20%', '100%', '20%'] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
                className="w-1 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Mic Button Glow */}
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="mt-8 relative"
        >
          <div className="absolute inset-0 bg-fuchsia-500 rounded-full blur-xl opacity-40 animate-pulse" />
          <div className="relative w-14 h-14 rounded-full border border-white/20 bg-white/5 flex items-center justify-center backdrop-blur-md cursor-pointer hover:bg-white/10 transition-colors">
            <Mic className="w-6 h-6 text-fuchsia-400" />
          </div>
        </motion.div>

      </GlassCard>
    </motion.div>
  );
};

export default AssistantPreview;
