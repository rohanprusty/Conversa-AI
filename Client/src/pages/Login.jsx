import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineSparkles, HiOutlineMicrophone } from "react-icons/hi";
import { HiOutlineBolt, HiOutlineCodeBracket } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { Play } from 'lucide-react';
import logo from "../assets/logo.png";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from "axios";
import { ServerUrl } from '../App';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Login({setUser}) {
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const {displayName, email} = result.user;
            const res = await axios.post(ServerUrl + "/api/auth/google", { name: displayName, email }, { withCredentials: true });
            setUser(res.data);
            toast.success("Login Successfully");
            navigate("/");
        } catch (error) {
            toast.error("Login Failed...");
            console.log(error);
        }
    };

    const FEATURES = [
        { icon: <HiOutlineMicrophone />, title: "Voice AI", desc: "Natural real-time voice conversations", color: "from-purple-500 to-fuchsia-500", glow: "rgba(168,85,247,0.4)" },
        { icon: <HiOutlineSparkles />, title: "Smart Nav", desc: "Voice-controlled page routing", color: "from-cyan-400 to-blue-500", glow: "rgba(34,211,238,0.4)" },
        { icon: <HiOutlineCodeBracket />, title: "Easy Embed", desc: "Add via single script tag", color: "from-emerald-400 to-teal-500", glow: "rgba(52,211,153,0.4)" },
        { icon: <HiOutlineBolt />, title: "Fast AI", desc: "Optimized Gemini responses", color: "from-amber-400 to-orange-500", glow: "rgba(251,191,36,0.4)" },
    ];

    // Easing for framer motion
    const customEase = [0.16, 1, 0.3, 1];

    return (
        <div className='min-h-screen bg-[#030014] overflow-hidden relative font-sans text-white flex items-center justify-center selection:bg-purple-500/30'>
            
            {/* --- COSMIC BACKGROUND --- */}
            <div className='absolute inset-0 pointer-events-none z-0 overflow-hidden'>
                <motion.div 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className='absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/40 blur-[120px]' 
                />
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className='absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-900/20 blur-[150px]' 
                />
                <div className='absolute top-[30%] left-[40%] w-[30vw] h-[30vw] rounded-full bg-fuchsia-900/20 blur-[120px]' />
                {/* Subtle Grid / Noise */}
                <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] opacity-30' />
            </div>

            <div className='relative z-10 max-w-[1440px] w-full mx-auto px-6 py-12 lg:py-0 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen'>
                
                {/* --- LEFT SIDE: HERO CONTENT --- */}
                <div className='flex flex-col items-start'>
                    
                    {/* Top Badge */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: customEase }}
                        className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-gray-300 text-sm font-medium shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
                        </span>
                        AI Voice Assistant Platform
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
                        className='mt-6 text-5xl sm:text-6xl lg:text-[72px] font-black leading-[1.05] tracking-tight'
                    >
                        Build AI<br/>Assistants
                        <span className='block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 drop-shadow-[0_0_20px_rgba(192,38,211,0.3)]'>
                            For Any Website
                        </span>
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
                        className='mt-6 text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl font-light'
                    >
                        Create customizable AI voice assistants that talk,
                        guide users, and integrate seamlessly into any website experience.
                    </motion.p>

                    {/* CTA Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: customEase }}
                        className='mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto'
                    >
                        <button 
                            onClick={handleLogin} 
                            className='group relative h-14 px-8 rounded-full bg-white text-black text-base font-semibold flex items-center justify-center gap-3 overflow-hidden w-full sm:w-auto transition-transform hover:scale-105 active:scale-95'
                        >
                            <div className='absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md' />
                            <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300' />
                            <FcGoogle className='text-2xl relative z-10 bg-white rounded-full' />
                            <span className="relative z-10">Start Building</span>
                        </button>

                        <button className='group h-14 px-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white text-base font-semibold flex items-center justify-center gap-3 hover:bg-white/10 hover:border-white/20 transition-all w-full sm:w-auto'>
                            <Play className='w-5 h-5 fill-white text-white group-hover:text-cyan-400 group-hover:fill-cyan-400 transition-colors' />
                            Watch Demo
                        </button>
                    </motion.div>

                    {/* Social Proof */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className='mt-8 flex items-center gap-4'
                    >
                        <div className="flex -space-x-3">
                            {[1,2,3,4].map((i) => (
                                <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#030014] bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center overflow-hidden`}>
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="avatar" className="w-full h-full object-cover opacity-80" />
                                </div>
                            ))}
                        </div>
                        <div className="text-sm">
                            <div className="flex items-center gap-1 text-yellow-500">
                                ★★★★★
                            </div>
                            <span className="text-gray-400 font-medium">Trusted by 2,000+ creators</span>
                        </div>
                    </motion.div>
                </div>

                {/* --- RIGHT SIDE: UI PREVIEW (BENTO GRID DASHBOARD) --- */}
                <motion.div 
                    initial={{ opacity: 0, x: 50, rotateY: 10, perspective: 1000 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: customEase }}
                    className='relative w-full aspect-[4/3] lg:aspect-auto lg:h-[540px] flex items-center justify-center'
                >
                    {/* Dashboard Container */}
                    <motion.div 
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className='relative w-full max-w-[560px] h-[480px] rounded-[32px] border border-white/10 bg-[#0A0A0A]/40 backdrop-blur-2xl shadow-[0_0_80px_rgba(168,85,247,0.15)] overflow-hidden flex flex-col p-6'
                    >
                        {/* Dashboard Header */}
                        <div className='flex items-center justify-between mb-8 pb-4 border-b border-white/5'>
                            <div className='flex items-center gap-3'>
                                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center overflow-hidden'>
                                    <img src={logo} alt="logo" className='w-full h-full object-cover' />
                                </div>
                                <div>
                                    <h3 className='text-white font-semibold text-sm'>Conversa AI</h3>
                                    <p className='text-xs text-gray-500'>Dashboard Preview</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse' />
                                <span className='text-xs font-medium text-gray-400'>System Online</span>
                            </div>
                        </div>

                        {/* Bento Grid */}
                        <div className='grid grid-cols-2 gap-4 flex-1'>
                            
                            {/* Large Active Widget */}
                            <div className='col-span-2 rounded-2xl border border-white/5 bg-white/[0.02] p-5 relative overflow-hidden group hover:bg-white/[0.04] transition-colors'>
                                <div className='absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity' />
                                <div className='flex items-center justify-between relative z-10'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'>
                                            <HiOutlineMicrophone className="text-xl" />
                                        </div>
                                        <div>
                                            <h4 className='text-white font-semibold'>Active Assistant</h4>
                                            <p className='text-xs text-cyan-400'>Listening to user...</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Simulated Voice Wave */}
                                <div className='mt-6 flex items-end justify-between h-12 gap-1 relative z-10'>
                                    {[...Array(24)].map((_, i) => (
                                        <motion.div 
                                            key={i}
                                            animate={{ height: ['20%', `${Math.random() * 80 + 20}%`, '20%'] }}
                                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                                            className='w-full bg-gradient-to-t from-purple-500 to-cyan-400 rounded-full opacity-80'
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Feature Cards */}
                            {FEATURES.slice(1).map((feature, idx) => (
                                <motion.div 
                                    key={idx}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className='rounded-2xl border border-white/5 bg-white/[0.02] p-5 relative overflow-hidden group'
                                >
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 rounded-full`} />
                                    <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_${feature.glow}] transition-shadow`}>
                                        {feature.icon}
                                    </div>
                                    <h4 className='text-sm font-semibold text-white mb-1'>{feature.title}</h4>
                                    <p className='text-xs text-gray-400 leading-relaxed'>{feature.desc}</p>
                                </motion.div>
                            ))}

                        </div>
                    </motion.div>

                    {/* Floating Decorative Elements */}
                    <motion.div 
                        animate={{ y: [10, -10, 10], rotate: [0, 5, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className='absolute -top-4 -right-4 w-32 h-32 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-30'
                    >
                        <div className='text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'>99%</div>
                        <div className='text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-1'>Accuracy</div>
                    </motion.div>

                    <motion.div 
                        animate={{ y: [-15, 15, -15], rotate: [0, -5, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className='absolute -bottom-4 -left-4 w-40 h-24 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-30 p-4'
                    >
                        <div className='w-12 h-12 rounded-full border-2 border-purple-500/50 flex items-center justify-center text-purple-400'>
                            <HiOutlineBolt className="text-2xl" />
                        </div>
                        <div>
                            <div className='text-sm font-bold text-white'>120ms</div>
                            <div className='text-[10px] text-gray-400 font-medium uppercase tracking-wider'>Latency</div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
}

export default Login;
