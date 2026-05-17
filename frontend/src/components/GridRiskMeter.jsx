import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { GridContext } from '../context/GridContext';

export default function GridRiskMeter() {
  const { riskLevel } = useContext(GridContext);

  const getMeterData = () => {
    switch(riskLevel) {
      case 'CRITICAL': return { color: 'text-brand-red', stroke: '#FF3366', dashOffset: 50, label: 'CRITICAL', glow: 'drop-shadow-[0_0_15px_rgba(255,51,102,0.8)]' };
      case 'HIGH': return { color: 'text-orange-500', stroke: '#F97316', dashOffset: 120, label: 'HIGH RISK', glow: 'drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]' };
      case 'MEDIUM': return { color: 'text-brand-yellow', stroke: '#FFD700', dashOffset: 180, label: 'MODERATE', glow: 'drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]' };
      default: return { color: 'text-brand-cyan', stroke: '#00F0FF', dashOffset: 250, label: 'OPTIMAL', glow: 'drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]' };
    }
  };

  const { color, stroke, dashOffset, label, glow } = getMeterData();
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="glassmorphism rounded-2xl border border-white/10 p-5 flex flex-col items-center justify-center relative overflow-hidden group">
      <h3 className="text-sm font-semibold text-gray-300 tracking-wider mb-4">GRID RISK INDEX</h3>
      
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
          <circle 
            cx="70" cy="70" r={radius} 
            fill="transparent" 
            stroke="rgba(255,255,255,0.05)" 
            strokeWidth="10" 
          />
          {/* Animated foreground circle */}
          <motion.circle 
            cx="70" cy="70" r={radius} 
            fill="transparent" 
            stroke={stroke} 
            strokeWidth="10"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className={glow}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            key={label}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-xl font-bold tracking-widest ${color} ${glow}`}
          >
            {label}
          </motion.span>
        </div>
      </div>
    </div>
  );
}
