import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GridContext } from '../context/GridContext';
import { RiAlertFill, RiMapPinLine, RiTimeLine } from 'react-icons/ri';

export default function Complaints() {
  const { complaints } = useContext(GridContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-full p-6 flex flex-col pb-20"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-xl bg-brand-red/20 text-brand-red shadow-[0_0_15px_rgba(255,51,102,0.4)] animate-pulse">
          <RiAlertFill className="text-2xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Active Complaints</h1>
          <p className="text-gray-400 text-sm">Real-time anomaly tracking</p>
        </div>
        <div className="ml-auto glassmorphism px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2">
          <span className="text-sm text-gray-400">Total:</span>
          <span className="text-xl font-bold text-brand-cyan">{complaints.length}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {complaints.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`glassmorphism p-5 rounded-xl border relative overflow-hidden group hover:-translate-y-1 transition-transform ${
                  c.severity === 'critical' ? 'border-brand-red/40 hover:shadow-[0_0_20px_rgba(255,51,102,0.2)]' :
                  c.severity === 'high' ? 'border-orange-500/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]' :
                  'border-brand-yellow/40 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)]'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-white">{c.type}</h3>
                  <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full border ${
                    c.severity === 'critical' ? 'bg-brand-red/20 text-brand-red border-brand-red/30' :
                    c.severity === 'high' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                    'bg-brand-yellow/20 text-brand-yellow border-brand-yellow/30'
                  }`}>
                    {c.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-4 line-clamp-2">"{c.message}"</p>
                <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <RiMapPinLine className="text-brand-cyan" /> {c.lat.toFixed(4)}, {c.lng.toFixed(4)}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <RiTimeLine className="text-brand-cyan" /> Logged recently
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
