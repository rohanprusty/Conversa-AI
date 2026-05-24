import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../App';
import { motion } from 'framer-motion';

const History = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchLogs();
    }, 300); // debounce search
    return () => clearTimeout(delayDebounceFn);
  }, [agentId, search]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(ServerUrl + `/api/logs/${agentId}?search=${search}`, { withCredentials: true });
      setLogs(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleString('en-US', { 
      month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' 
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto text-white mt-24 relative z-40 min-h-screen">
      <div className="mb-12">
        <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white mb-6 text-sm font-medium flex items-center gap-2 transition-colors">
          &larr; Back to Dashboard
        </button>
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight">Conversation <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">History</span></h1>
            <p className="text-gray-400 mt-2">View logs of interactions with this assistant.</p>
          </div>
          <input 
            type="text" 
            placeholder="Search conversations..." 
            className="bg-[#0B1020]/80 backdrop-blur-md border border-white/10 p-3 px-5 rounded-full text-white w-full md:w-72 focus:border-cyan-500 outline-none transition-colors shadow-[0_0_15px_rgba(34,211,238,0.1)]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
        {loading && logs.length === 0 ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          logs.map((log, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={log._id} 
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              
              {/* Timeline Dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-[#0B1020] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_10px_rgba(34,211,238,0.2)] z-10">
                <span className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></span>
              </div>

              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/[0.03] border border-white/10 p-6 rounded-3xl backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="text-xs text-gray-500 mb-4 font-semibold tracking-wider">
                  {formatTime(log.timestamp)}
                </div>
                <div className="mb-5">
                  <span className="text-[10px] text-fuchsia-400 font-black uppercase tracking-widest block mb-1">User Said</span>
                  <p className="text-gray-200 text-sm leading-relaxed">{log.userPrompt}</p>
                </div>
                <div className="bg-[#040816]/80 p-4 rounded-2xl border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-full blur-2xl" />
                  <span className="text-[10px] text-cyan-400 font-black uppercase tracking-widest block mb-1">AI Response</span>
                  <p className="text-gray-300 text-sm leading-relaxed relative z-10">{log.aiResponse}</p>
                </div>
              </div>

            </motion.div>
          ))
        )}

        {!loading && logs.length === 0 && (
          <div className="text-center py-20 bg-white/5 border border-dashed border-white/20 rounded-3xl backdrop-blur-sm">
            <p className="text-gray-400">No conversation history found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
