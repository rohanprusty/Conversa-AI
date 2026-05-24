import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative z-10 pt-20 pb-10 px-6 mt-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent blur-sm" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-cyan-500 flex items-center justify-center font-bold text-white shadow-lg">
              C
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Conversa <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">AI</span>
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Voice AI assistant for modern websites.
          </p>
        </div>

        <div className="flex gap-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Twitter</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">GitHub</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Discord</a>
        </div>

        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Conversa AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
