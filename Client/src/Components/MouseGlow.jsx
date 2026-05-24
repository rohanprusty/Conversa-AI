import React, { useEffect, useState } from 'react';

const MouseGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop for performance
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
      
      // Update global CSS variables for Spotlight cards
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 hidden md:block mix-blend-screen"
      style={{
        background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(34, 211, 238, 0.06), rgba(168, 85, 247, 0.03) 20%, transparent 60%)`,
        opacity: visible ? 1 : 0,
      }}
    />
  );
};

export default MouseGlow;
