import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { GridContext } from '../context/GridContext';
import { RiBrainLine, RiRobot2Line } from 'react-icons/ri';

export default function AIInsights() {
  const { insights } = useContext(GridContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-full p-6 flex flex-col pb-20"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-xl bg-brand-cyan/20 text-brand-cyan shadow-[0_0_15px_rgba(0,240,255,0.4)] animate-pulse">
          <RiBrainLine className="text-2xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Deep AI Analysis</h1>
          <p className="text-gray-400 text-sm">Historical and predicted grid behaviors</p>
        </div>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        <div className="space-y-4">
          {insights.map((insight, i) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glassmorphism p-6 rounded-2xl border border-white/10 hover:border-brand-cyan/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-brand-cyan to-brand-blue opacity-50 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start pl-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-brand-cyan font-bold border border-brand-cyan/30 px-2 py-1 rounded">
                      {insight.type}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <RiRobot2Line className="text-brand-cyan" /> Confidence: <span className="text-white font-mono">{insight.confidence}</span>
                    </span>
                  </div>
                  <p className="text-lg text-gray-200 leading-relaxed mt-4">{insight.text}</p>
                </div>
                <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center bg-white/5 group-hover:bg-brand-cyan/10 transition-colors">
                  <RiBrainLine className="text-2xl text-gray-500 group-hover:text-brand-cyan transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
