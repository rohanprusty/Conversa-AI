import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import axios from 'axios'
import ProtectedRoute from './Components/ProtectedRoute'
import Navbar from './Components/Navbar'
import Builder from './pages/Builder'
import Billing from './pages/Billing'
import Dashboard from './pages/Dashboard'
import Deploy from './pages/Deploy'
import History from './pages/History'
import CustomToaster from './Components/CustomToaster'
import FloatingAssistant from './Components/FloatingAssistant'
import FloatingBackground from './Components/FloatingBackground'
import MouseGlow from './Components/MouseGlow'
import Lenis from 'lenis'

export const ServerUrl = "http://localhost:8000"
export const CLIENT_URL = "http://localhost:5173"

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    }
  }, [])

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get(ServerUrl + "/api/user/current-user", { withCredentials: true })
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchMe()
  }, [])

  return (
    <>
      <div className="noise-overlay"></div>
      <FloatingBackground />
      <MouseGlow />
      <CustomToaster />
      <FloatingAssistant defaultSize="auto" />
      
      <div className="relative z-40 flex flex-col min-h-screen">
        <ScrollToTop />
        <Routes>
          <Route path='/login' element={<Login setUser={setUser}/>} />
          <Route path='/*' element={<ProtectedRoute user={user} loading={loading}>
            <Navbar setUser={setUser} user={user}/>
            <main className="flex-grow">
              <Routes>
                <Route path='/' element={<Home user={user}/>} />
                <Route path='/dashboard' element={<Dashboard />}/>
                <Route path='/builder/:id' element={<Builder />}/>
                <Route path='/deploy/:id' element={<Deploy user={user}/>}/>
                <Route path='/history/:agentId' element={<History />}/>
                <Route path='/billing' element={<Billing user={user} setUser={setUser}/>}/>
                <Route path='*' element={<Navigate to="/" replace/>}/>
              </Routes>
            </main>
          </ProtectedRoute>} />
        </Routes>
      </div>
    </>
  )
}

export default App
