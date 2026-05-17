import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { RiCheckDoubleFill, RiErrorWarningLine, RiFlashlightLine, RiRobot2Line, RiHeartPulseLine } from 'react-icons/ri';
import { GridContext } from '../../context/GridContext';

export default function PublicStatus() {
  const { complaints, transformers, riskLevel } = useContext(GridContext);

  const activeOutages = complaints.filter(c => c.severity === 'critical').length;
  // Mock some resolved data based on active to make it look alive
  const baseResolved = 124;
  const resolvedCount = baseResolved + Math.floor(complaints.length / 2);
  const efficiency = Math.min(99, Math.round((resolvedCount / (resolvedCount + complaints.length)) * 100));

  const stats = [
    {
      title: 'Issues Resolved Today',
      value: resolvedCount.toString(),
      icon: RiCheckDoubleFill,
      color: 'from-green-500/20 to-emerald-500/5',
      iconColor: 'text-green-400',
      borderColor: 'border-green-500/30'
    },
    {
      title: 'Active Grid Anomalies',
      value: complaints.length.toString(),
      icon: RiErrorWarningLine,
      color: 'from-brand-yellow/20 to-orange-500/5',
      iconColor: 'text-brand-yellow',
      borderColor: 'border-brand-yellow/30'
    },
    {
      title: 'Critical Outages',
      value: activeOutages.toString(),
      icon: RiFlashlightLine,
      color: 'from-brand-red/20 to-pink-500/5',
      iconColor: 'text-brand-red',
      borderColor: 'border-brand-red/30'
    },
    {
      title: 'AI Prediction Accuracy',
      value: '96.4%',
      icon: RiRobot2Line,
      color: 'from-brand-blue/20 to-brand-cyan/5',
      iconColor: 'text-brand-cyan',
      borderColor: 'border-brand-cyan/30'
    }
  ];

  return (
    <section id="status" className="py-24 relative z-10 bg-[#0A0A0B]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.02)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
            >
              Public System <span className="text-brand-cyan">Status</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg max-w-xl"
            >
              Total transparency into local grid operations and AI resolution efficiency.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glassmorphism px-6 py-4 rounded-2xl border border-white/10 flex items-center gap-4"
          >
            <div className="p-3 rounded-xl bg-brand-cyan/20 border border-brand-cyan/30">
              <RiHeartPulseLine className="text-3xl text-brand-cyan animate-pulse drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
            </div>
            <div>
              <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Resolution Efficiency</div>
              <div className="text-3xl font-black text-white">{efficiency}%</div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`glassmorphism rounded-2xl p-6 border ${stat.borderColor} relative overflow-hidden group`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${stat.iconColor} shadow-[0_0_15px_currentColor] opacity-80 group-hover:opacity-100 transition-all`}>
                    <stat.icon className="text-2xl" />
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="text-4xl font-black text-white tracking-tight mb-2 drop-shadow-md">
                    {stat.value}
                  </div>
                  <h3 className="text-gray-400 text-sm font-semibold tracking-wider uppercase">{stat.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
