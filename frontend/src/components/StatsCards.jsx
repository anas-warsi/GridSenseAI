import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { RiAlertFill, RiFlashlightFill, RiErrorWarningFill, RiDashboard3Fill, RiMapPinRangeFill } from 'react-icons/ri';
import { GridContext } from '../context/GridContext';

export default function StatsCards() {
  const { complaints, transformers, riskLevel, stats: backendStats } = useContext(GridContext);

  const activeOutages = backendStats ? backendStats.active_outages : complaints.filter(c => c.severity === 'critical').length;
  const highRiskZones = backendStats ? backendStats.critical_transformers : transformers.filter(t => t.load > 90).length;
  const avgLoad = backendStats ? backendStats.avg_transformer_load : (transformers.length > 0 ? Math.round(transformers.reduce((acc, t) => acc + t.load, 0) / transformers.length) : 0);
  const totalComplaints = backendStats ? backendStats.total_complaints : complaints.length;

  const stats = [
    {
      title: 'Total Complaints',
      value: totalComplaints.toString(),
      trend: '+1',
      trendUp: true,
      icon: RiAlertFill,
      color: 'from-brand-blue/20 to-brand-cyan/5',
      iconColor: 'text-brand-cyan',
      borderColor: 'border-brand-cyan/30'
    },
    {
      title: 'Active Outages',
      value: activeOutages.toString(),
      trend: activeOutages > 2 ? '+1' : 'Stable',
      trendUp: activeOutages > 2,
      icon: RiErrorWarningFill,
      color: 'from-brand-red/20 to-pink-500/5',
      iconColor: 'text-brand-red',
      borderColor: 'border-brand-red/30'
    },
    {
      title: 'High Risk Zones',
      value: highRiskZones.toString(),
      trend: riskLevel,
      trendUp: riskLevel === 'CRITICAL' || riskLevel === 'HIGH',
      icon: RiMapPinRangeFill,
      color: 'from-brand-yellow/20 to-orange-500/5',
      iconColor: 'text-brand-yellow',
      borderColor: 'border-brand-yellow/30'
    },
    {
      title: 'Avg Grid Load',
      value: `${avgLoad}%`,
      trend: avgLoad > 80 ? '+High' : 'Stable',
      trendUp: avgLoad > 80,
      icon: RiDashboard3Fill,
      color: 'from-purple-500/20 to-indigo-500/5',
      iconColor: 'text-purple-400',
      borderColor: 'border-purple-500/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className={`glassmorphism rounded-xl p-5 border ${stat.borderColor} relative overflow-hidden group`}
        >
          {/* Animated Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${stat.iconColor} shadow-[0_0_10px_currentColor] opacity-80 group-hover:opacity-100`}>
                <stat.icon className="text-xl" />
              </div>
              {stat.trendUp !== null && (
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  stat.trendUp ? 'bg-brand-red/20 text-brand-red' : 'bg-green-500/20 text-green-400'
                }`}>
                  {stat.trend}
                </span>
              )}
            </div>
            
            <div>
              <h3 className="text-gray-400 text-sm font-medium mb-1 tracking-wide">{stat.title}</h3>
              <div className="text-3xl font-bold text-white tracking-tight">{stat.value}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
