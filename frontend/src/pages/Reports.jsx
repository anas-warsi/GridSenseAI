import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiFileChartLine, RiBarChartBoxLine } from 'react-icons/ri';
import { reportsAPI } from '../services/api';

export default function Reports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await reportsAPI.get();
        setData(res);
      } catch (err) {
        console.error("Failed to fetch reports:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading) return (
    <div className="flex-1 flex items-center justify-center text-brand-cyan animate-pulse">
      <RiFileChartLine className="text-4xl mr-2" /> Loading Grid Intelligence...
    </div>
  );

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
        {/* Severity Breakdown */}
        <div className="glassmorphism rounded-2xl border border-white/10 p-6 flex flex-col relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-brand-cyan/5 opacity-50" />
          <h3 className="text-lg font-bold text-white mb-6 relative z-10 flex items-center gap-2">
            <RiBarChartBoxLine className="text-purple-400" /> Complaint Severity
          </h3>
          <div className="flex-1 border border-white/5 rounded-xl bg-black/20 flex items-end justify-around p-4 gap-4 relative z-10">
            {['warning', 'high', 'critical'].map((sev, i) => {
              const count = data?.severity_breakdown?.[sev] || 0;
              const h = (count / Math.max(data?.total_complaints || 1, 1)) * 100;
              return (
                <div key={sev} className="w-12 bg-white/5 rounded-t-sm relative group-hover:bg-white/10 transition-colors flex flex-col items-center">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(h, 5)}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`absolute bottom-0 w-full rounded-t-sm shadow-lg ${
                      sev === 'critical' ? 'bg-red-500' : sev === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                    }`}
                  />
                  <span className="absolute -top-6 text-xs text-white font-mono">{count}</span>
                  <span className="absolute -bottom-6 text-[10px] uppercase text-gray-500">{sev}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Load Distribution */}
        <div className="glassmorphism rounded-2xl border border-white/10 p-6 flex flex-col relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-brand-blue/5 opacity-50" />
          <h3 className="text-lg font-bold text-white mb-6 relative z-10 flex items-center gap-2">
            <RiBarChartBoxLine className="text-brand-cyan" /> Transformer Status
          </h3>
          <div className="flex-1 border border-white/5 rounded-xl bg-black/20 flex items-center justify-center p-4 relative z-10">
             <div className="w-48 h-48 rounded-full border-8 border-white/5 relative flex items-center justify-center">
               <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle 
                    cx="96" cy="96" r="88" fill="none" stroke="#00F0FF" strokeWidth="16" 
                    strokeDasharray="552" 
                    strokeDashoffset={552 - (552 * (data?.resolution_rate || 0)) / 100} 
                    className="drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] transition-all duration-1000" 
                  />
               </svg>
               <div className="text-center">
                 <div className="text-3xl font-bold text-white">{data?.resolution_rate}%</div>
                 <div className="text-xs text-gray-400">Resolution Rate</div>
               </div>
             </div>
          </div>
        </div>

        {/* Grid Stats Summary */}
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
                { label: 'Total Complaints', value: data?.total_complaints },
                { label: 'Transformers', value: data?.total_transformers },
                { label: 'AI Prediction', value: data?.ai_prediction_accuracy + '%' },
                { label: 'AI Alerts', value: data?.total_alerts },
            ].map((stat, i) => (
                <div key={i} className="glassmorphism p-4 rounded-xl border border-white/5 text-center">
                    <div className="text-gray-400 text-xs uppercase mb-1">{stat.label}</div>
                    <div className="text-xl font-bold text-brand-cyan">{stat.value}</div>
                </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}
