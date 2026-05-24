import React, { useEffect, useState } from 'react';
import { useToaster, toast, resolveValue } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const TOAST_TYPES = {
  success: {
    icon: CheckCircle2,
    glow: '#22D3EE',
    bgGlow: 'rgba(34, 211, 238, 0.15)',
    borderGlow: 'rgba(34, 211, 238, 0.3)',
  },
  error: {
    icon: XCircle,
    glow: '#EF4444',
    bgGlow: 'rgba(239, 68, 68, 0.15)',
    borderGlow: 'rgba(239, 68, 68, 0.3)',
  },
  loading: {
    icon: Info,
    glow: '#3B82F6',
    bgGlow: 'rgba(59, 130, 246, 0.15)',
    borderGlow: 'rgba(59, 130, 246, 0.3)',
  },
  blank: {
    icon: Info,
    glow: '#A855F7',
    bgGlow: 'rgba(168, 85, 247, 0.15)',
    borderGlow: 'rgba(168, 85, 247, 0.3)',
  },
  custom: {
    icon: Info,
    glow: '#A855F7',
    bgGlow: 'rgba(168, 85, 247, 0.15)',
    borderGlow: 'rgba(168, 85, 247, 0.3)',
  }
};

const getToastConfig = (type) => {
  // If react-hot-toast type is 'success' or 'error'
  if (TOAST_TYPES[type]) return TOAST_TYPES[type];
  
  // Custom parsing if people used toast('...', { icon: 'warning' }) etc
  return TOAST_TYPES.blank;
};

const CustomToast = ({ t, updateHeight, offset, handlers }) => {
  const [isHovered, setIsHovered] = useState(false);
  const type = t.type === 'custom' && t.icon === 'warning' ? 'warning' : t.type;
  
  // Custom fallback for warning since react-hot-toast doesn't have warning natively
  const config = t.type === 'blank' && t.icon === '⚠️' ? {
    icon: AlertTriangle,
    glow: '#F59E0B',
    bgGlow: 'rgba(245, 158, 11, 0.15)',
    borderGlow: 'rgba(245, 158, 11, 0.3)',
  } : getToastConfig(t.type);

  const Icon = config.icon;

  useEffect(() => {
    // We don't use updateHeight in this stacked bottom-right setup as framer motion handles layout
    // but we can call it if needed.
  }, [t.id, updateHeight]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    handlers.startPause();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    handlers.endPause();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 120, y: 0, scale: 0.92, filter: 'blur(4px)' }}
      animate={{ opacity: 1, x: 0, y: isHovered ? -4 : 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(2px)' }}
      transition={{ 
        layout: { type: "spring", stiffness: 400, damping: 30 },
        opacity: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        x: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        filter: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="pointer-events-auto relative w-full sm:w-[360px] overflow-hidden rounded-xl"
      style={{
        background: 'rgba(10, 10, 20, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid rgba(255, 255, 255, 0.08)`,
        boxShadow: `0 10px 40px -10px rgba(0,0,0,0.5), 0 0 20px -5px ${config.bgGlow}`,
      }}
    >
      {/* Soft gradient overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${config.bgGlow} 0%, transparent 100%)`
        }}
      />
      
      {/* Hover glow effect */}
      <motion.div 
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 20px ${config.bgGlow}, 0 0 15px ${config.bgGlow}`,
          border: `1px solid ${config.borderGlow}`,
          borderRadius: 'inherit'
        }}
      />

      <div className="relative z-10 flex items-start p-4 gap-3">
        <div 
          className="mt-0.5 flex-shrink-0"
          style={{ color: config.glow, filter: `drop-shadow(0 0 6px ${config.glow})` }}
        >
          {t.icon && typeof t.icon !== 'string' ? t.icon : <Icon size={20} strokeWidth={2.5} />}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-medium text-[#F8FAFC] leading-snug">
            {resolveValue(t.message, t)}
          </p>
        </div>

        <button 
          onClick={() => toast.dismiss(t.id)}
          className="flex-shrink-0 ml-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Progress bar */}
      {t.duration && t.duration !== Infinity && (
        <div className="absolute bottom-0 left-0 h-[2px] bg-[rgba(255,255,255,0.1)] w-full">
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ 
              duration: t.duration / 1000,
              ease: 'linear'
            }}
            style={{
              height: '100%',
              background: config.glow,
              boxShadow: `0 0 8px ${config.glow}`,
              animationPlayState: isHovered ? 'paused' : 'running'
            }}
            className={isHovered ? "[animation-play-state:paused]" : ""}
          />
        </div>
      )}
    </motion.div>
  );
};

const CustomToaster = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause, calculateOffset, updateHeight } = handlers;

  return (
    <div 
      className="fixed bottom-4 right-0 z-[9999] flex flex-col gap-3 pointer-events-none sm:bottom-6 sm:right-6 w-full sm:w-auto px-4 sm:px-0"
      style={{
        // ensure toasts grow upwards
        justifyContent: 'flex-end',
      }}
    >
      <AnimatePresence initial={false}>
        {toasts.filter(t => t.visible).map((t) => {
          const offset = calculateOffset(t, {
            reverseOrder: false,
          });

          return (
            <CustomToast 
              key={t.id} 
              t={t} 
              offset={offset} 
              updateHeight={updateHeight}
              handlers={{ startPause, endPause }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default CustomToaster;
