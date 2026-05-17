import React from 'react';
import { motion } from 'framer-motion';
import { RiFileChartLine, RiBarChartBoxLine } from 'react-icons/ri';

export default function Reports() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-full p-6 flex flex-col pb-20"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] animate-pulse">
          <RiFileChartLine className="text-2xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">System Reports</h1>
          <p className="text-gray-400 text-sm">Automated statistics and compliance tracking</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glassmorphism rounded-2xl border border-white/10 p-6 flex flex-col relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-brand-cyan/5 opacity-50" />
          <h3 className="text-lg font-bold text-white mb-6 relative z-10 flex items-center gap-2">
            <RiBarChartBoxLine className="text-purple-400" /> Outage Trends (Last 7 Days)
          </h3>
          <div className="flex-1 border border-white/5 rounded-xl bg-black/20 flex items-end justify-between p-4 gap-2 relative z-10">
            {/* Mock Chart Bars */}
            {[40, 20, 60, 30, 80, 45, 10].map((h, i) => (
              <div key={i} className="w-full bg-white/5 rounded-t-sm relative group-hover:bg-white/10 transition-colors" style={{ height: '100%' }}>
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="absolute bottom-0 w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-sm shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="glassmorphism rounded-2xl border border-white/10 p-6 flex flex-col relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-brand-blue/5 opacity-50" />
          <h3 className="text-lg font-bold text-white mb-6 relative z-10 flex items-center gap-2">
            <RiBarChartBoxLine className="text-brand-cyan" /> Load Distribution
          </h3>
          <div className="flex-1 border border-white/5 rounded-xl bg-black/20 flex items-center justify-center p-4 relative z-10">
             {/* Mock Circular Chart */}
             <div className="w-48 h-48 rounded-full border-8 border-white/5 relative flex items-center justify-center">
               <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle cx="96" cy="96" r="88" fill="none" stroke="#00F0FF" strokeWidth="16" strokeDasharray="552" strokeDashoffset="150" className="drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
                  <circle cx="96" cy="96" r="88" fill="none" stroke="#FFD700" strokeWidth="16" strokeDasharray="552" strokeDashoffset="450" className="drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
               </svg>
               <div className="text-center">
                 <div className="text-3xl font-bold text-white">78%</div>
                 <div className="text-xs text-gray-400">Avg Load</div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
