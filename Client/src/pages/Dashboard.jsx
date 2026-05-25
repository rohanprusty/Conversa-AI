import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../App';
import GlassCard from '../Components/GlassCard';
import AnimatedButton from '../Components/AnimatedButton';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await axios.get(ServerUrl + '/api/agents', { withCredentials: true });
      setAgents(res.data);
    } catch (error) {
      toast.error("Failed to load assistants");
    } finally {
      setLoading(false);
    }
  };

  const createAssistant = async () => {
    try {
      const res = await axios.post(ServerUrl + '/api/agents', {}, { withCredentials: true });
      navigate(`/builder/${res.data._id}`);
    } catch (error) {
      toast.error("Failed to create assistant");
    }
  };

  const deleteAssistant = async (id) => {
    if (window.confirm("Are you sure you want to delete this assistant?")) {
      try {
        await axios.delete(ServerUrl + `/api/agents/${id}`, { withCredentials: true });
        toast.success("Assistant deleted");
        fetchAgents();
      } catch (error) {
        toast.error("Failed to delete assistant");
      }
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto text-white mt-24 relative z-40 min-h-[70vh]">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">My Assistants</h1>
          <p className="text-gray-400">Manage your AI voice agents across different projects.</p>
        </div>
        <AnimatedButton onClick={createAssistant} variant="primary">
          + Create New Assistant
        </AnimatedButton>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agents.map(agent => (
            <GlassCard key={agent._id} className="p-6 flex flex-col hover:-translate-y-2 transition-transform duration-300 shadow-[0_0_20px_rgba(34,211,238,0.05)]">
              <div className="flex items-center gap-4 mb-4 border-b border-white/10 pb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 flex items-center justify-center font-bold shadow-[0_0_15px_rgba(192,38,211,0.3)]">
                  {agent.assistantName ? agent.assistantName.charAt(0).toUpperCase() : "A"}
                </div>
                <div>
                  <h3 className="text-xl font-bold truncate max-w-[150px]">{agent.assistantName || "New Assistant"}</h3>
                  <p className="text-cyan-400 text-xs mt-1 font-mono">{agent.theme} theme</p>
                </div>
              </div>
              
              <div className="mb-6 flex-grow">
                <p className="text-gray-400 text-sm">Created: {new Date(agent.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => navigate(`/builder/${agent._id}`)} 
                  className="bg-white/10 hover:bg-white/20 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteAssistant(agent._id)} 
                  className="bg-red-500/20 text-red-400 hover:bg-red-500/40 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </GlassCard>
          ))}

          {agents.length === 0 && (
            <div className="col-span-full py-20 text-center border border-dashed border-white/20 rounded-3xl bg-[#0B1020]/50 backdrop-blur-md">
              <p className="text-gray-400 mb-4 text-lg">You don't have any assistants yet.</p>
              <button onClick={createAssistant} className="text-cyan-400 hover:text-cyan-300 font-bold underline underline-offset-4">
                Create your first one now
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
