import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiBroadcastLine, RiErrorWarningFill, RiInformationFill } from 'react-icons/ri';
import { GridContext } from '../../context/GridContext';

export default function PublicAlerts() {
  const { alerts } = useContext(GridContext);

  const getIcon = (type) => {
    if (type === 'critical' || type === 'high') return <RiErrorWarningFill className="text-xl text-brand-red" />;
    return <RiInformationFill className="text-xl text-brand-cyan" />;
  };

  const getTimeAgo = (isoString) => {
    const diff = Math.floor((new Date() - new Date(isoString)) / 1000);
    if (diff < 60) return `${diff}s ago`;
    return `${Math.floor(diff/60)}m ago`;
  };

  return (
    <section className="py-12 relative z-10 bg-[#0A0A0B] border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-brand-cyan/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-6">
        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <div className="p-2 rounded-full bg-brand-cyan/20 border border-brand-cyan/50 shadow-[0_0_15px_rgba(0,240,255,0.4)] animate-pulse">
            <RiBroadcastLine className="text-xl text-brand-cyan" />
          </div>
          <span className="text-sm font-bold uppercase tracking-widest text-brand-cyan">Live Comm</span>
        </div>

        <div className="flex-1 relative h-12 overflow-hidden mask-image-linear-horizontal w-full">
          {/* We use a simple AnimatePresence here to cycle through the latest 3 alerts or show the newest one */}
          <div className="absolute inset-y-0 left-0 flex flex-col justify-center w-full">
            <AnimatePresence mode="popLayout">
              {alerts.slice(0, 1).map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-4 text-gray-300 w-full"
                >
                  <span className="shrink-0">{getIcon(alert.type)}</span>
                  <span className="text-sm md:text-base font-medium truncate">{alert.text}</span>
                  <span className="text-xs text-gray-500 font-mono shrink-0 ml-auto md:ml-4">{getTimeAgo(alert.time)}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
