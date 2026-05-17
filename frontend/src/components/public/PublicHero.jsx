import React from 'react';
import { motion } from 'framer-motion';
import { RiFlashlightFill, RiArrowRightLine } from 'react-icons/ri';

export default function PublicHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-x-hidden pt-24 pb-16">
      {/* Cinematic Backgrounds */}
      <div className="absolute inset-0 bg-[#0A0A0B]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.05)_0%,rgba(10,10,11,1)_80%)]" />
      
      {/* Animated Grid lines */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Glowing Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-cyan/20 rounded-full blur-[120px]" 
      />
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-brand-blue/30 rounded-full blur-[150px]" 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/5 text-brand-cyan text-sm font-semibold tracking-wide"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
            </span>
            System Online & Monitoring
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight"
          >
            AI-Powered <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">
              Electricity Intelligence
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed"
          >
            Monitor outages, report electricity issues, and improve local grid response using real-time AI-powered infrastructure monitoring for smarter communities.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <a 
              href="#report"
              className="px-8 py-4 rounded-full bg-brand-red text-white font-bold tracking-wider hover:bg-red-500 hover:shadow-[0_0_30px_rgba(255,51,102,0.6)] transition-all flex items-center justify-center gap-2 text-center"
            >
              Report Electricity Issue
            </a>
            <a 
              href="#live-grid"
              className="px-8 py-4 rounded-full glassmorphism border border-brand-cyan/50 text-white font-bold tracking-wider hover:bg-brand-cyan/10 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all flex items-center justify-center gap-2 group text-center"
            >
              View Live Grid <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Right Content - Abstract visual representation of map/grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative hidden lg:block"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/20 to-brand-cyan/20 blur-[100px] rounded-full" />
          <div className="relative glassmorphism rounded-3xl border border-brand-cyan/30 p-4 shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden h-[500px]">
             {/* Fake Map Grid overlay */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(0,240,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.5) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            
            {/* Animated Nodes */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-12 h-12 bg-brand-cyan/20 border border-brand-cyan rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.5)]"
            >
              <RiFlashlightFill className="text-brand-cyan" />
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/3 right-1/4 w-10 h-10 bg-brand-red/20 border border-brand-red rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,51,102,0.5)]"
            >
              <div className="w-3 h-3 bg-brand-red rounded-full animate-ping" />
            </motion.div>

            <motion.div 
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/2 left-2/3 w-8 h-8 bg-brand-yellow/20 border border-brand-yellow rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.5)]"
            />
            
            {/* Connecting lines SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
               <motion.path 
                 d="M 120 150 L 250 250 L 150 350" 
                 fill="none" 
                 stroke="#00F0FF" 
                 strokeWidth="2"
                 strokeDasharray="10 5"
                 animate={{ strokeDashoffset: [0, -50] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               />
               <path d="M 250 250 L 300 180" fill="none" stroke="rgba(255,51,102,0.5)" strokeWidth="2" strokeDasharray="5 5" />
            </svg>

            <div className="absolute bottom-6 left-6 right-6 glassmorphism rounded-xl border border-white/10 p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-brand-cyan font-bold tracking-widest uppercase">Grid AI Status</span>
                <span className="text-xs text-green-400 font-bold">Stable</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: "85%" }}
                   transition={{ duration: 2, delay: 1 }}
                   className="h-full bg-brand-cyan shadow-[0_0_10px_rgba(0,240,255,0.8)]"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
