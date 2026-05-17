import React, { useContext, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RiBrainLine, RiRobot2Line, RiSparklingLine } from 'react-icons/ri';
import { GridContext } from '../context/GridContext';

export default function AIInsightsPanel() {
  const { insights } = useContext(GridContext);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [insights]);

  return (
    <div className="glassmorphism rounded-2xl border border-brand-cyan/20 p-5 flex flex-col h-full relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/10 blur-[50px] pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2 rounded bg-brand-cyan/20 text-brand-cyan shadow-[0_0_15px_rgba(0,240,255,0.4)] animate-pulse">
          <RiBrainLine className="text-2xl" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white tracking-wide">AI Insights</h2>
          <p className="text-xs text-brand-cyan">GridSense Analytics Engine</p>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto pr-2 space-y-4 relative z-10 scroll-smooth custom-scrollbar"
      >
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-cyan/40 transition-colors group relative overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-cyan to-brand-blue opacity-50 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex items-start gap-3 pl-2">
              <RiSparklingLine className="text-brand-yellow mt-1 shrink-0" />
              <div>
                <p className="text-sm text-gray-200 leading-relaxed">{insight.text}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-[10px] uppercase tracking-wider text-brand-cyan font-semibold border border-brand-cyan/30 px-2 py-0.5 rounded">
                    {insight.type}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <RiRobot2Line /> Conf: {insight.confidence}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="mt-4 w-full py-3 rounded-xl bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 hover:bg-brand-cyan/20 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all font-semibold tracking-wide text-sm flex items-center justify-center gap-2">
        <RiBrainLine /> Generate Deep Report
      </button>
    </div>
  );
}
