import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Navigation, Brain, MessageSquare, BarChart, Code, ArrowRight } from 'lucide-react';
import GlassCard from './GlassCard';
import AnimatedButton from './AnimatedButton';

const FEATURES = [
  {
    title: "Voice AI",
    desc: "Natural voice conversations powered by advanced AI models.",
    icon: <Mic className="w-6 h-6 text-fuchsia-400 group-hover:scale-110 transition-transform duration-300" />,
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    title: "Real-time Navigation",
    desc: "Guide users to the right pages instantly with smart AI.",
    icon: <Navigation className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />,
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    title: "AI Memory",
    desc: "Remembers conversations and user preferences automatically.",
    icon: <Brain className="w-6 h-6 text-violet-400 group-hover:scale-110 transition-transform duration-300" />,
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    title: "Smart Replies",
    desc: "AI suggests the best replies for every user question.",
    icon: <MessageSquare className="w-6 h-6 text-fuchsia-400 group-hover:scale-110 transition-transform duration-300" />,
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    title: "Analytics",
    desc: "Track performance and improve user experience effortlessly.",
    icon: <BarChart className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />,
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    title: "Website Integration",
    desc: "Add to any website with a simple one-line script tag.",
    icon: <Code className="w-6 h-6 text-violet-400 group-hover:scale-110 transition-transform duration-300" />,
    colSpan: "col-span-1 md:col-span-2",
  },
];

const FeatureGrid = () => {
  return (
    <section className="py-24 px-6 relative z-40">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">
              Powerful features for <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c026ff] via-[#7c3aed] to-[#00d2ff]">
                modern websites
              </span>
            </h2>
          </div>
          <AnimatedButton variant="secondary" className="whitespace-nowrap">
            Explore All Features <ArrowRight className="w-4 h-4 ml-2" />
          </AnimatedButton>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${feature.colSpan}`}
            >
              <GlassCard className="p-8 h-full flex flex-col justify-between group transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]">
                <div className="mb-6 w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(124,58,237,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white/90 group-hover:text-white transition-colors">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
