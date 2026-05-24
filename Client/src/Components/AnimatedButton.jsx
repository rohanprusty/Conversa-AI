import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ children, onClick, className = '', variant = 'primary', ...props }) => {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-sm sm:text-base transition-all overflow-hidden cursor-pointer w-full sm:w-auto";
  
  const variants = {
    primary: "text-white shadow-[0_12px_40px_rgba(168,85,247,0.25)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.4)]",
    secondary: "bg-white/[0.03] text-white border border-white/10 hover:bg-white/10 backdrop-blur-xl",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {variant === 'primary' && (
        <>
          {/* Animated Gradient Background */}
          <span className="absolute inset-0 bg-gradient-to-r from-[#c026ff] via-[#7c3aed] to-[#00d2ff] bg-[length:200%_auto] animate-shiny" />
          {/* Glass overlay */}
          <span className="absolute inset-0 rounded-2xl border border-white/20" />
        </>
      )}
      
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

export default AnimatedButton;
