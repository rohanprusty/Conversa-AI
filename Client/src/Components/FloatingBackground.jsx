import React, { lazy, Suspense } from 'react';

// Lazy load particles for performance optimization
const Particles = lazy(() => import('./Particles'));

const FloatingBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none bg-[#040816]">
      {/* Dark Radial Overlay Gradients: z-10 */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(4,8,22,0.4)_0%,rgba(4,8,22,0.95)_100%)]" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#040816]/50 to-[#040816]" />

      {/* Animated Fog / Aurora Layer: z-20 */}
      <div className="absolute inset-0 z-20 mix-blend-screen opacity-30 animate-aurora">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(168,85,247,0.4)_0%,transparent_70%)] rounded-full blur-[100px]" />
        <div className="absolute top-[10%] right-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(34,211,238,0.3)_0%,transparent_70%)] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[70%] h-[70%] bg-[radial-gradient(circle,rgba(59,130,246,0.3)_0%,transparent_70%)] rounded-full blur-[130px]" />
      </div>

      {/* Lazy Loaded Particles: z-30 */}
      <div className="absolute inset-0 z-30 mix-blend-screen">
        <Suspense fallback={null}>
          <Particles />
        </Suspense>
      </div>

      {/* Grid Texture & Noise */}
      <div
        className="absolute inset-0 z-30 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
};

export default FloatingBackground;
