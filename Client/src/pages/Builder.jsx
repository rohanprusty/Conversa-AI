import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useBlocker } from 'react-router-dom';
import axios from 'axios';
import { FiPlus, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { ServerUrl } from '../App';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import GlassCard from '../Components/GlassCard';
import AnimatedButton from '../Components/AnimatedButton';

const THEMES = ["light", "dark", "glass", "neon"];
const TONES = ["friendly", "professional", "sales"];

const Builder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDirty, setIsDirty] = useState(false);
  
  const [formData, setFormData] = useState({
    assistantName: '',
    businessName: '',
    businessType: '',
    systemPrompt: '',
    theme: 'dark',
    tone: 'friendly',
    geminiApiKey: '',
    smartNavigations: []
  });
  
  const [pageName, setPageName] = useState("");
  const [pagePath, setPagePath] = useState("");
  const [pageKeywords, setPageKeywords] = useState("");
  const [loading, setLoading] = useState(false);

  const inputClass = "w-full liquid-glass text-white border border-white/10 rounded-2xl px-5 py-4 focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.4)] outline-none transition-all placeholder-gray-500";

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const backup = localStorage.getItem(`conversa_builder_backup_${id}`);
        if (backup) {
          const parsed = JSON.parse(backup);
          setFormData(parsed.formData);
          toast("Restored unsaved changes", { icon: '♻️' });
        } else {
          const res = await axios.get(ServerUrl + `/api/agents/${id}`, { withCredentials: true });
          setFormData({
              assistantName: res.data.assistantName || '',
              businessName: res.data.businessName || '',
              businessType: res.data.businessType || '',
              systemPrompt: res.data.systemPrompt || '',
              theme: res.data.theme || 'dark',
              tone: res.data.tone || 'friendly',
              geminiApiKey: res.data.geminiApiKey || '',
              smartNavigations: res.data.smartNavigations || []
          });
        }
        setTimeout(() => setIsDirty(false), 100);
      } catch (error) {
        toast.error("Failed to load assistant");
        navigate('/dashboard');
      }
    };
    if (id) {
        fetchAgent();
    }
  }, [id, navigate]);

  // 1. Silent LocalStorage Backup & isDirty Tracking
  useEffect(() => {
    if (formData.assistantName !== '') {
      setIsDirty(true);
      localStorage.setItem(`conversa_builder_backup_${id}`, JSON.stringify({ formData, smartNavigations: formData.smartNavigations }));
    }
  }, [formData, id]);

  // 3. Browser Refresh/Close Warning
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = ''; // Triggers the default browser warning
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // 4. React Router Navigation Intercept
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      localStorage.setItem(`conversa_builder_backup_${id}`, JSON.stringify({ formData, smartNavigations: formData.smartNavigations }));
      toast("Draft saved locally! Redirecting...", { icon: '💾' });
      setTimeout(() => {
        blocker.proceed();
      }, 500);
    }
  }, [blocker]);

  const addPage = () => {
    if (!pageName || !pagePath) return;
    const newPage = {
      name: pageName,
      path: pagePath,
      keywords: pageKeywords.split(",").map((k) => k.trim())
    };
    setFormData({
        ...formData,
        smartNavigations: [...formData.smartNavigations, newPage]
    });
    setPageName("");
    setPagePath("");
    setPageKeywords("");
  };

  const removePage = (index) => {
    const updatePages = formData.smartNavigations.filter((_, i) => i !== index);
    setFormData({ ...formData, smartNavigations: updatePages });
  };

  const handleEditRule = (index) => {
    const rule = formData.smartNavigations[index];
    setPageName(rule.name);
    setPagePath(rule.path);
    setPageKeywords(rule.keywords ? rule.keywords.join(", ") : "");
    removePage(index);
  };

  const handleSave = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      await axios.put(ServerUrl + `/api/agents/${id}`, formData, { withCredentials: true });
      setIsDirty(false);
      localStorage.removeItem(`conversa_builder_backup_${id}`);
      toast.success("Assistant Saved Successfully!");
      navigate(`/deploy/${id}`);
    } catch (error) {
      toast.error("Failed to save assistant");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen pt-32 pb-16 px-4 md:px-8 relative z-10'>
      <div className='max-w-4xl mx-auto'>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-12 flex justify-between items-center'
        >
          <div>
            <h2 className='text-4xl md:text-5xl font-black text-white tracking-tight mb-4'>
              Assistant <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Builder</span>
            </h2>
            <p className='text-gray-400 text-lg'>Configure and train your virtual assistant.</p>
          </div>
          <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white mb-6 text-sm font-medium flex items-center gap-2 transition-colors">
            &larr; Dashboard
          </button>
        </motion.div>

        <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='space-y-8'
            onSubmit={handleSave}
        >
          {/* Assistant Information */}
          <GlassCard className='p-8'>
            <h2 className='text-2xl font-bold text-white mb-6 flex items-center gap-3'>
              <span className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm">1</span>
              Assistant Information
            </h2>
            <div className='space-y-5'>
              <input type="text" onChange={(e) => setFormData({...formData, assistantName: e.target.value})} value={formData.assistantName} placeholder="Assistant Name (e.g., SupportBot)" className={inputClass} required />
              <input type="text" onChange={(e) => setFormData({...formData, businessName: e.target.value})} value={formData.businessName} placeholder="Business Name" className={inputClass} />
              <input type="text" onChange={(e) => setFormData({...formData, businessType: e.target.value})} value={formData.businessType} placeholder="Business Type (e.g., SaaS, E-commerce)" className={inputClass} />
              <textarea rows={4} onChange={(e) => setFormData({...formData, systemPrompt: e.target.value})} value={formData.systemPrompt} placeholder="System Prompt: Describe your business and what the assistant should know..." className={`${inputClass} resize-none min-h-[120px]`} />
            </div>
          </GlassCard>

          {/* Appearance & Tone */}
          <GlassCard className='p-8'>
            <h2 className='text-2xl font-bold text-white mb-6 flex items-center gap-3'>
              <span className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm">2</span>
              Voice & Personality
            </h2>
            <div className='mb-8'>
              <label className='text-sm font-medium text-gray-400 mb-4 block uppercase tracking-wider'>UI Theme</label>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {THEMES.map((item) => (
                  <button 
                    key={item} 
                    type="button"
                    onClick={() => setFormData({...formData, theme: item})} 
                    className={`py-4 rounded-2xl border transition-all capitalize font-medium ${formData.theme === item ? "border-cyan-400 bg-cyan-400/10 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]" : "border-white/10 text-gray-400 hover:border-white/30 liquid-glass"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-400 mb-4 block uppercase tracking-wider'>Conversational Tone</label>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                {TONES.map((item) => (
                  <button 
                    key={item} 
                    type="button"
                    onClick={() => setFormData({...formData, tone: item})} 
                    className={`py-4 rounded-2xl border transition-all capitalize font-medium ${formData.tone === item ? "border-purple-500 bg-purple-500/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]" : "border-white/10 text-gray-400 hover:border-white/30 liquid-glass"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* API Integration */}
          <GlassCard className='p-8 border border-fuchsia-500/30 shadow-[0_0_30px_rgba(192,38,211,0.1)]'>
            <div className='flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4'>
              <div>
                <h2 className='text-2xl font-bold text-white flex items-center gap-3'>
                  <span className="w-8 h-8 rounded-full bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 text-sm">3</span>
                  AI Engine
                </h2>
                <p className='text-sm text-gray-400 mt-2 pl-11'>Connect your Gemini API key to activate intelligence.</p>
              </div>
              <a href="https://aistudio.google.com/app/apikey" target='_blank' rel='noopener noreferrer' className='px-5 py-2.5 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-all border border-white/10 backdrop-blur-md cursor-pointer text-center'>
                Get API Key &rarr;
              </a>
            </div>
            <input type="password" placeholder="AIzaSy..." onChange={(e) => setFormData({...formData, geminiApiKey: e.target.value})} value={formData.geminiApiKey} className={inputClass} />
          </GlassCard>

          {/* Navigation Pages */}
          <GlassCard className='p-8'>
            <div className='flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4'>
              <div>
                <h2 className='text-2xl font-bold text-white flex items-center gap-3'>
                  <span className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm">4</span>
                  Smart Navigation
                </h2>
                <p className='text-sm text-gray-400 mt-2 pl-11'>Train AI to redirect users to specific pages.</p>
                <p className='text-sm text-gray-400 mt-1 pl-11'>For full pages, enter a path like '/about'. For scrolling to sections on the same page, enter an ID like '#pricing'.</p>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] gap-4 mb-8'>
              <input type="text" placeholder='Page Name (e.g., Pricing)' className={inputClass} onChange={(e) => setPageName(e.target.value)} value={pageName} />
              <input type="text" placeholder='Path (e.g., /pricing)' className={inputClass} onChange={(e) => setPagePath(e.target.value)} value={pagePath} />
              <input type="text" placeholder='Keywords (comma separated)' className={inputClass} onChange={(e) => setPageKeywords(e.target.value)} value={pageKeywords} />
              <button type="button" onClick={addPage} className='h-[56px] px-6 rounded-2xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all border border-white/10 flex items-center justify-center gap-2 cursor-pointer'>
                <FiPlus /> Add
              </button>
            </div>

            <div className='space-y-3'>
              {formData.smartNavigations.map((page, index) => (
                <div key={index} className='flex items-center justify-between liquid-glass border border-white/10 rounded-2xl p-5 group hover:border-white/20 transition-colors'>
                  <div>
                    <p className='font-bold text-white'>{page.name}</p>
                    <p className='text-sm text-cyan-400 mt-1 font-mono'>{page.path}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                      <button type="button" onClick={() => handleEditRule(index)} className='w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-500/20'>
                        <FiEdit2 />
                      </button>
                      <button type="button" onClick={() => removePage(index)} className='w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20'>
                        <FiTrash2 />
                      </button>
                  </div>
                </div>
              ))}
              {formData.smartNavigations.length === 0 && (
                <div className="text-center py-8 border border-dashed border-white/20 rounded-2xl">
                  <p className="text-gray-500">No navigation rules added yet.</p>
                </div>
              )}
            </div>
          </GlassCard>

          <AnimatedButton 
            type="submit"
            variant="primary"
            disabled={loading} 
            className="w-full text-lg h-16 mt-8"
          >
            {loading ? "Saving..." : "Save Assistant"}
          </AnimatedButton>

        </motion.form>
      </div>
    </div>
  )
}

export default Builder;
