import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import axios from 'axios';
import { ServerUrl } from '../App';
import toast from 'react-hot-toast';

function Navbar({user, setUser}) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true })
      setUser(null)
      toast.success("Logged Out Successfully")
      navigate("/login")
    } catch (error) {
      toast.error("Logout failed")
      console.log(error)
    }
  }

  const NavLink = ({ href, children }) => (
    <a href={href} className="relative group text-sm font-medium text-gray-300 hover:text-white transition-colors">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-300 group-hover:w-full" />
    </a>
  );

  return (
    <div className='fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-[100] transition-all'>
      <div className='bg-[#0B1020]/70 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_0_30px_rgba(124,58,237,0.1)] px-4 sm:px-6 py-3 flex items-center justify-between transition-all hover:bg-[#0B1020]/80 hover:shadow-[0_0_40px_rgba(124,58,237,0.2)]'>

        {/* Logo */}
        <div onClick={() => navigate("/")} className='flex items-center gap-3 cursor-pointer group'>
          <div className="relative w-9 h-9 flex items-center justify-center">
            <img 
              src="/logo.jpg" 
              alt="Conversa AI" 
              className="relative w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform duration-300 z-10" 
            />
          </div>
          <h1 className='font-bold text-lg text-white leading-none tracking-tight'>
            Conversa <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500'>AI</span>
          </h1>
        </div>

        {/* Desktop Links (No User) */}
        {!user && (
          <div className='hidden md:flex items-center gap-8'>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#">Docs</NavLink>
            <NavLink href="#">Contact</NavLink>
            
            <button onClick={() => navigate("/login")} className="relative inline-flex items-center justify-center px-6 py-2 rounded-full font-medium text-sm text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md cursor-pointer">
              Dashboard
            </button>
            <button onClick={() => navigate("/login")} className="relative inline-flex items-center justify-center px-6 py-2 rounded-full font-semibold text-sm text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all overflow-hidden cursor-pointer hover:-translate-y-0.5">
              <span className="absolute inset-0 bg-gradient-to-r from-[#c026ff] via-[#7c3aed] to-[#00d2ff] bg-[length:200%_auto] animate-shiny" />
              <span className="relative z-10">Start Building &rarr;</span>
            </button>
          </div>
        )}

        {/* User Actions */}
        {user && (
          <div className='hidden md:flex items-center gap-4'>
            <button onClick={() => navigate("/dashboard")} className='px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all cursor-pointer backdrop-blur-md'>
              Dashboard
            </button>

            <button onClick={() => navigate("/billing")} className='px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all cursor-pointer backdrop-blur-md'>
              Billing
            </button>

            <div className='flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md'>
              <div className='w-7 h-7 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(34,211,238,0.4)]'>
                <span className='text-white text-xs font-bold'>
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className='max-w-[100px]'>
                <p className='text-xs font-semibold text-white truncate'>{user.name}</p>
              </div>
              <button onClick={handleLogout} className='ml-2 text-gray-400 hover:text-red-400 transition-colors cursor-pointer'>
                <FiLogOut size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className='md:hidden text-gray-300 hover:text-white transition-colors p-2 z-[110] relative'>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className='md:hidden absolute top-[calc(100%+10px)] left-0 w-full px-2 z-[100]'>
          <div className='bg-[#0B1020]/95 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] p-4 flex flex-col gap-4'>
            {user ? (
              <>
                <div className='flex items-center gap-3 pb-4 border-b border-white/10'>
                  <div className='w-10 h-10 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 flex items-center justify-center flex-shrink-0'>
                    <span className='text-white text-sm font-bold'>
                      {user?.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className='flex-1 overflow-hidden'>
                    <p className='text-sm font-semibold text-white truncate'>{user.name}</p>
                    <p className='text-xs text-gray-400 truncate'>{user.email}</p>  
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <button className='w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-colors' onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}>Dashboard</button>
                  <button className='w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-colors' onClick={() => { navigate("/billing"); setMenuOpen(false); }}>Billing</button>
                  <button onClick={() => { setMenuOpen(false); handleLogout(); }} className='w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm font-medium'>
                    <FiLogOut size={16} /> Log Out
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <a href="#features" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-300 py-2 text-center">Features</a>
                <a href="#pricing" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-300 py-2 text-center">Pricing</a>
                <button onClick={() => { navigate("/login"); setMenuOpen(false); }} className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium">Dashboard</button>
                <button onClick={() => { navigate("/login"); setMenuOpen(false); }} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c026ff] via-[#7c3aed] to-[#00d2ff] bg-[length:200%_auto] animate-shiny text-white text-sm font-bold">Start Building</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
