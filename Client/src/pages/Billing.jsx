import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ServerUrl } from '../App';
import { motion } from 'framer-motion';
import GlassCard from '../Components/GlassCard';
import AnimatedButton from '../Components/AnimatedButton';
import { Check } from 'lucide-react';

function Billing({ user, setUser }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (user && !user.isSetupComplete) {
      toast.error("Setup your assistant first");
      navigate("/builder");
    }
  }, [user, navigate])

  const remainingMessages = Math.max(0, (user?.requestLimit || 0) - (user?.totalMessages || 0));
  const remainingDays = user?.proExpiresAt
    ? Math.max(0, Math.ceil((new Date(user.proExpiresAt) - new Date()) / (1000 * 60 * 60 * 24)))
    : 0;

  const handlePay = async () => {
    try {
      const res = await axios.post(ServerUrl + "/api/billing/order", { plan: "pro" }, { withCredentials: true })
      const order = res.data.order
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Conversa AI",
        description: "Pro Plan",
        order_id: order.id,
        handler: async (response) => {
          const verifyRes = await axios.post(ServerUrl + "/api/billing/verify", response, { withCredentials: true })
          if (verifyRes.data.success) {
            toast.success("Payment successful")
            setUser(verifyRes.data.user)
          }
        },
        theme: {
          color: "#7c3aed",
        },
      }
      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      toast.error("Payment Failed")
      console.log(error);
    }
  }

  return (
    <div className='min-h-screen pt-32 pb-16 px-4 md:px-8 relative z-10'>
      <div className='max-w-5xl mx-auto'>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='mb-12 text-center'
        >
          <h2 className='text-4xl md:text-5xl font-black text-white tracking-tight mb-4'>
            Billing & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Subscription</span>
          </h2>
          <p className='text-gray-400 text-lg'>Manage your AI assistant plan and usage.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 mb-12'
        >
          <GlassCard className='p-6'>
            <p className='text-xs font-medium text-gray-400 uppercase tracking-wider'>Current Plan</p>
            <h2 className='text-3xl font-bold text-white mt-2 capitalize'>{user?.plan}</h2>
          </GlassCard>

          <GlassCard className='p-6'>
            <p className='text-xs font-medium text-gray-400 uppercase tracking-wider'>AI Engine Status</p>
            <h2 className={`text-3xl font-bold mt-2 capitalize ${user?.geminiStatus === "active" ? "text-cyan-400" : user?.geminiStatus === "invalid" ? "text-red-500" : "text-amber-500"}`}>
              {user?.geminiStatus || "Active"}
            </h2>
          </GlassCard>

          <GlassCard className='p-6'>
            <p className='text-xs font-medium text-gray-400 uppercase tracking-wider'>{user?.plan === "free" ? "Messages Left" : "Plan Expiry"}</p>
            <h2 className='text-3xl font-bold text-white mt-2 capitalize'>{user?.plan === "free" ? remainingMessages : `${remainingDays} Days`}</h2>
          </GlassCard>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Free Plan */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="h-full"
          >
            <GlassCard className='p-10 h-full flex flex-col relative overflow-hidden'>
              <h2 className="text-2xl font-bold text-white">Free Plan</h2>
              <div className="my-6">
                <span className="text-6xl font-black text-white">₹0</span>
              </div>
              <p className="text-gray-400 mb-8 min-h-[40px]">Perfect for testing and small personal projects.</p>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {["200 AI messages", "Voice assistant", "Navigation support", "Basic customization"].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <AnimatedButton variant="secondary" className="w-full justify-center pointer-events-none opacity-50">
                {user?.plan === "free" ? "Current Plan" : "Downgrade"}
              </AnimatedButton>
            </GlassCard>
          </motion.div>

          {/* Pro Plan */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="h-full relative"
          >
            <div className="absolute -inset-[1px] bg-gradient-to-b from-[#c026ff] to-[#00d2ff] rounded-[1.5rem] blur-sm opacity-50" />
            <GlassCard className='p-10 h-full flex flex-col bg-[#0B1020]/90 border-none shadow-[0_0_40px_rgba(124,58,237,0.2)]'>
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="bg-gradient-to-r from-[#c026ff] to-[#00d2ff] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Recommended
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white relative z-10">Pro Plan</h2>
              <div className="my-6 relative z-10">
                <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">₹699</span>
                <p className='mt-2 text-sm text-cyan-400 font-medium'>3 Months Access</p>
              </div>
              
              <ul className='space-y-4 flex-grow relative z-10 mb-10'>
                {["Unlimited AI messages", "Advanced AI assistant", "Priority performance", "Unlimited navigation", "Premium support"].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <span className="text-white font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <AnimatedButton 
                variant={user?.plan === "pro" ? "secondary" : "primary"}
                onClick={handlePay}
                disabled={user?.plan === "pro"} 
                className="w-full justify-center relative z-10 h-14"
              >
                {user?.plan === "pro" ? "Active Plan" : "Upgrade Now"}
              </AnimatedButton>
            </GlassCard>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default Billing
