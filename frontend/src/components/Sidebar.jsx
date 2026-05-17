import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { 
  RiDashboardFill, 
  RiAlertFill, 
  RiFlashlightFill, 
  RiMapPinRangeFill, 
  RiBrainLine, 
  RiFileChartLine, 
  RiSettings4Line 
} from 'react-icons/ri';

const menuItems = [
  { icon: RiDashboardFill, label: 'Dashboard', path: '/' },
  { icon: RiAlertFill, label: 'Complaints', path: '/complaints' },
  { icon: RiFlashlightFill, label: 'Transformers', path: '/transformers' },
  { icon: RiMapPinRangeFill, label: 'Risk Zones', path: '/risk-zones' },
  { icon: RiBrainLine, label: 'AI Insights', path: '/ai-insights' },
  { icon: RiFileChartLine, label: 'Reports', path: '/reports' },
  { icon: RiSettings4Line, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-64 h-full glassmorphism flex flex-col pt-6 pb-6 border-r border-white/5 z-20 relative shrink-0"
    >
      <div className="flex items-center gap-3 px-6 mb-10">
        <div className="w-8 h-8 rounded bg-brand-cyan/20 flex items-center justify-center animate-pulse">
          <RiFlashlightFill className="text-brand-cyan text-xl" />
        </div>
        <h1 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-cyan">
          GridSense AI
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
          <NavLink 
            to="/dashboard"
            end
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-brand-cyan/20 border border-brand-cyan/30 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={`relative z-10 ${isActive ? 'text-brand-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]' : ''}`}>
                  <RiDashboardFill className="text-xl" />
                </div>
                <span className="relative z-10 font-medium tracking-wide">Dashboard</span>
              </>
            )}
          </NavLink>

          <NavLink 
            to="/dashboard/complaints"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-brand-red/20 to-orange-500/20 border border-brand-red/30 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={`relative z-10 ${isActive ? 'text-brand-red drop-shadow-[0_0_8px_rgba(255,51,102,0.8)]' : ''}`}>
                  <RiAlertFill className="text-xl" />
                </div>
                <span className="relative z-10 font-medium tracking-wide">Complaints</span>
              </>
            )}
          </NavLink>

          <NavLink 
            to="/dashboard/transformers"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-brand-cyan/20 border border-brand-cyan/30 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={`relative z-10 ${isActive ? 'text-brand-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]' : ''}`}>
                  <RiFlashlightFill className="text-xl" />
                </div>
                <span className="relative z-10 font-medium tracking-wide">Transformers</span>
              </>
            )}
          </NavLink>

          <NavLink 
            to="/dashboard/risk-zones"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-brand-yellow/20 to-orange-500/20 border border-brand-yellow/30 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={`relative z-10 ${isActive ? 'text-brand-yellow drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]' : ''}`}>
                  <RiMapPinRangeFill className="text-xl" />
                </div>
                <span className="relative z-10 font-medium tracking-wide">Risk Zones</span>
              </>
            )}
          </NavLink>

          <NavLink 
            to="/dashboard/ai-insights"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-brand-cyan/20 border border-brand-cyan/30 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={`relative z-10 ${isActive ? 'text-brand-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]' : ''}`}>
                  <RiBrainLine className="text-xl" />
                </div>
                <span className="relative z-10 font-medium tracking-wide">AI Insights</span>
              </>
            )}
          </NavLink>

          <NavLink 
            to="/dashboard/reports"
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-brand-cyan/20 border border-purple-500/30 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={`relative z-10 ${isActive ? 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' : ''}`}>
                  <RiFileChartLine className="text-xl" />
                </div>
                <span className="relative z-10 font-medium tracking-wide">Reports</span>
              </>
            )}
          </NavLink>
      </nav>

      <div className="mt-auto px-4 pb-6 space-y-2">
        <NavLink 
          to="/dashboard/settings"
          className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-gray-500/20 to-gray-700/20 border border-gray-500/30 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className={`relative z-10 ${isActive ? 'text-white' : ''}`}>
                <RiSettings4Line className="text-xl" />
              </div>
              <span className="relative z-10 font-medium tracking-wide">Settings</span>
            </>
          )}
        </NavLink>
        <div className="p-4 rounded-xl bg-gradient-to-br from-brand-cyan/10 to-brand-blue/10 border border-brand-cyan/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-brand-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          <div className="relative z-10">
            <h4 className="text-xs font-semibold text-brand-cyan mb-1">System Status</h4>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
              <span className="text-sm font-medium text-white">Optimal</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
