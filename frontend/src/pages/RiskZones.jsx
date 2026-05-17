import React from 'react';
import { motion } from 'framer-motion';
import { RiMapPinRangeFill, RiFireLine } from 'react-icons/ri';

const zones = [
  { id: 1, name: "Sector 8 Feeder", risk: "Critical", outageProb: "85%", density: "High" },
  { id: 2, name: "Old Market Line", risk: "High", outageProb: "60%", density: "Medium" },
  { id: 3, name: "Residential Block B", risk: "Moderate", outageProb: "25%", density: "Low" }
];

export default function RiskZones() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-full p-6 flex flex-col pb-20"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-xl bg-orange-500/20 text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)] animate-pulse">
          <RiMapPinRangeFill className="text-2xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Vulnerability Heatmap</h1>
          <p className="text-gray-400 text-sm">AI predicted risk zones</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {zones.map((z, i) => (
          <motion.div
            key={z.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glassmorphism p-6 rounded-2xl border border-white/10 relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-50 ${
              z.risk === 'Critical' ? 'bg-brand-red' : z.risk === 'High' ? 'bg-orange-500' : 'bg-brand-yellow'
            }`} />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">{z.name}</h3>
                <RiFireLine className={`text-2xl ${
                  z.risk === 'Critical' ? 'text-brand-red animate-pulse' : z.risk === 'High' ? 'text-orange-500' : 'text-brand-yellow'
                }`} />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-sm text-gray-400">Risk Level</span>
                  <span className={`font-bold ${
                    z.risk === 'Critical' ? 'text-brand-red' : z.risk === 'High' ? 'text-orange-500' : 'text-brand-yellow'
                  }`}>{z.risk}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-sm text-gray-400">Outage Probability</span>
                  <span className="font-mono text-white">{z.outageProb}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-sm text-gray-400">Complaint Density</span>
                  <span className="text-white">{z.density}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
