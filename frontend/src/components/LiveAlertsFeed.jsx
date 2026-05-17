import React, { useContext, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiErrorWarningLine, RiFlashlightLine, RiToolsLine, RiInformationLine } from 'react-icons/ri';
import { GridContext } from '../context/GridContext';

export default function LiveAlertsFeed() {
  const { alerts } = useContext(GridContext);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0; // Alerts are unshifted, newest on top
    }
  }, [alerts]);

  const getIcon = (type) => {
    if (type === 'critical') return RiFlashlightLine;
    if (type === 'warning' || type === 'high') return RiErrorWarningLine;
    if (type === 'info') return RiInformationLine;
    return RiToolsLine;
  };

  const getTimeAgo = (isoString) => {
    const diff = Math.floor((new Date() - new Date(isoString)) / 1000);
    if (diff < 60) return `${diff}s ago`;
    return `${Math.floor(diff/60)}m ago`;
  };

  return (
    <div className="glassmorphism rounded-2xl border border-brand-red/20 p-5 flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse shadow-[0_0_8px_rgba(255,51,102,0.8)]" />
          Live AI Feed
        </h2>
        <span className="text-xs bg-brand-red/20 text-brand-red px-2 py-1 rounded-full border border-brand-red/30">
          {alerts.filter(a => a.type === 'critical').length} Critical
        </span>
      </div>

      <div 
        ref={scrollRef}
        className="space-y-3 overflow-y-auto pr-2 flex-1 scroll-smooth custom-scrollbar"
      >
        <AnimatePresence initial={false}>
          {alerts.map((alert, index) => {
            const Icon = getIcon(alert.type);
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 12 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-3 rounded-lg border flex items-center gap-3 ${
                  alert.type === 'critical' 
                    ? 'bg-brand-red/10 border-brand-red/30 hover:border-brand-red/60 hover:shadow-[0_0_15px_rgba(255,51,102,0.2)]' 
                    : alert.type === 'warning' || alert.type === 'high'
                      ? 'bg-brand-yellow/10 border-brand-yellow/30 hover:border-brand-yellow/60 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)]'
                      : 'bg-brand-cyan/10 border-brand-cyan/30 hover:border-brand-cyan/60 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                } transition-all cursor-pointer`}
              >
                <div className={`p-2 rounded-full ${
                  alert.type === 'critical' ? 'bg-brand-red/20 text-brand-red' 
                  : alert.type === 'warning' || alert.type === 'high' ? 'bg-brand-yellow/20 text-brand-yellow'
                  : 'bg-brand-cyan/20 text-brand-cyan'
                }`}>
                  <Icon />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-white tracking-wide">{alert.text}</h4>
                  <p className="text-xs text-gray-400 mt-1">{getTimeAgo(alert.time)}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
