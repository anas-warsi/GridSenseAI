import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiSearchLine, RiNotification3Line, RiUserLine, RiMapPin2Line } from 'react-icons/ri';

export default function TopNavbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-20 w-full glassmorphism flex items-center justify-between px-8 border-b border-white/5 z-10 relative"
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-gray-300">
          <RiMapPin2Line className="text-brand-cyan text-xl drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]" />
          <span className="font-semibold tracking-wide">Baduzai 1st, Shahjahanpur</span>
        </div>
        <div className="h-4 w-px bg-white/20" />
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
          <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,1)] animate-pulse" />
          <span className="text-xs font-medium text-green-400">Live Grid Stream</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-sm font-medium text-gray-400 tracking-wider">
          {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          <span className="mx-2 text-white/20">|</span>
          <span className="text-white">{time.toLocaleTimeString('en-US', { hour12: false })}</span>
        </div>

        <div className="flex items-center gap-4">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-brand-cyan/50 transition-colors relative">
            <RiSearchLine />
          </motion.button>
          
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-brand-cyan/50 transition-colors relative">
            <RiNotification3Line />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-red shadow-[0_0_5px_rgba(255,51,102,0.8)]" />
          </motion.button>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-3 pl-2 pr-4 py-1 rounded-full bg-white/5 border border-white/10 hover:border-brand-cyan/50 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-blue flex items-center justify-center text-white">
              <RiUserLine />
            </div>
            <span className="text-sm font-medium text-gray-200">Cmdr. Admin</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
