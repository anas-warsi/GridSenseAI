import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { GridContext } from '../context/GridContext';
import { RiFlashlightFill, RiHeartPulseLine } from 'react-icons/ri';

export default function Transformers() {
  const { transformers } = useContext(GridContext);

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
          <RiFlashlightFill className="text-2xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Grid Assets</h1>
          <p className="text-gray-400 text-sm">Transformer health & load monitoring</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {transformers.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`glassmorphism rounded-xl border relative overflow-hidden group ${
                t.status === 'Normal' ? 'border-brand-cyan/30 hover:border-brand-cyan/60' :
                t.status === 'Warning' ? 'border-brand-yellow/30 hover:border-brand-yellow/60' :
                'border-brand-red/30 hover:border-brand-red/60'
              } transition-colors`}
            >
              <div className={`absolute top-0 left-0 w-full h-1 ${
                t.status === 'Normal' ? 'bg-brand-cyan' :
                t.status === 'Warning' ? 'bg-brand-yellow' : 'bg-brand-red'
              }`} />
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-white">{t.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                    t.status === 'Normal' ? 'bg-brand-cyan/20 text-brand-cyan' :
                    t.status === 'Warning' ? 'bg-brand-yellow/20 text-brand-yellow' :
                    'bg-brand-red/20 text-brand-red'
                  }`}>
                    {t.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Current Load</span>
                      <span className="text-white font-mono">{t.load}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${t.load}%` }}
                        transition={{ duration: 1 }}
                        className={`h-full ${
                          t.load > 90 ? 'bg-brand-red shadow-[0_0_10px_rgba(255,51,102,0.8)]' : 
                          t.load > 75 ? 'bg-brand-yellow shadow-[0_0_10px_rgba(255,215,0,0.8)]' : 
                          'bg-brand-cyan shadow-[0_0_10px_rgba(0,240,255,0.8)]'
                        }`}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">COMPLAINTS</div>
                      <div className="text-xl font-bold text-white">{t.complaints}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">HEALTH</div>
                      <div className={`flex items-center gap-1 font-bold ${t.load > 90 ? 'text-brand-red' : 'text-green-400'}`}>
                        <RiHeartPulseLine className="animate-pulse" /> {100 - (t.load > 100 ? 50 : Math.max(0, t.load - 50))}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
