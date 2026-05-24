import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, MessageSquare, Mic, Navigation } from 'lucide-react';
import AnimatedButton from './AnimatedButton';
import AssistantPreview from './AssistantPreview';
import GlassCard from './GlassCard';

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 z-40 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-grow">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md w-fit mb-8 shadow-[0_0_20px_rgba(124,58,237,0.1)]">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-medium text-gray-300 uppercase tracking-widest">Voice AI for modern websites</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6">
            Add a <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c026ff] via-[#7c3aed] to-[#00d2ff] animate-shiny bg-[length:200%_auto]">
              Virtual AI Assistant
            </span>
            <br />
            to Your Website
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
            Create smart voice-enabled assistants that talk to visitors, answer questions and help users navigate instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <AnimatedButton variant="primary">
              Build Your Assistant <ArrowRight className="w-4 h-4 ml-1" />
            </AnimatedButton>
            <AnimatedButton variant="secondary">
              <Play className="w-4 h-4 mr-1" /> Watch Demo
            </AnimatedButton>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <GlassCard className="p-4 flex items-center gap-4 transition-transform hover:-translate-y-1">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">200+</p>
                <p className="text-gray-400 text-xs">AI Responses</p>
              </div>
            </GlassCard>
            
            <GlassCard className="p-4 flex items-center gap-4 transition-transform hover:-translate-y-1">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <Mic className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Voice</p>
                <p className="text-gray-400 text-xs">Enabled</p>
              </div>
            </GlassCard>

            <GlassCard className="p-4 flex items-center gap-4 transition-transform hover:-translate-y-1">
              <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 flex items-center justify-center flex-shrink-0">
                <Navigation className="w-5 h-5 text-fuchsia-400" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Real-time</p>
                <p className="text-gray-400 text-xs">Navigation</p>
              </div>
            </GlassCard>
          </div>
        </motion.div>

        {/* Right Content - Assistant Preview */}
        <div className="flex justify-center lg:justify-end z-10 lg:order-last order-first mt-12 lg:mt-0">
          <AssistantPreview />
        </div>

      </div>

      {/* Trusted By Marquee */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="w-full mt-24 max-w-5xl mx-auto"
      >
        <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-widest mb-8">Trusted by innovative teams worldwide</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Placeholder Logos */}
          <div className="text-xl font-bold text-white tracking-tighter flex items-center gap-1 hover:text-cyan-400 transition-colors cursor-default drop-shadow-[0_0_10px_rgba(34,211,238,0)] hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            <div className="w-6 h-6 rounded bg-current" /> ACME Corp
          </div>
          <div className="text-xl font-bold text-white tracking-tighter flex items-center gap-1 hover:text-purple-400 transition-colors cursor-default drop-shadow-[0_0_10px_rgba(168,85,247,0)] hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
            <div className="w-6 h-6 rounded-full bg-current" /> Globex
          </div>
          <div className="text-xl font-bold text-white tracking-tighter flex items-center gap-1 hover:text-fuchsia-400 transition-colors cursor-default drop-shadow-[0_0_10px_rgba(192,38,211,0)] hover:drop-shadow-[0_0_10px_rgba(192,38,211,0.5)]">
            <div className="w-6 h-6 rotate-45 bg-current" /> Soylent
          </div>
          <div className="text-xl font-bold text-white tracking-tighter flex items-center gap-1 hover:text-blue-400 transition-colors cursor-default drop-shadow-[0_0_10px_rgba(59,130,246,0)] hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
            <div className="w-6 h-6 rounded-tl-lg rounded-br-lg bg-current" /> Initech
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
