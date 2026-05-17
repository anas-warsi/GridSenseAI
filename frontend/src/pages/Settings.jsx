import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RiSettings4Line, RiToggleLine, RiToggleFill } from 'react-icons/ri';

export default function Settings() {
  const [settings, setSettings] = useState({
    theme: true,
    alerts: true,
    ai: true,
    sound: false
  });

  const toggle = (key) => setSettings(s => ({ ...s, [key]: !s[key] }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-full p-6 pb-20 flex flex-col max-w-3xl mx-auto w-full"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-xl bg-gray-500/20 text-gray-300 shadow-[0_0_15px_rgba(156,163,175,0.4)]">
          <RiSettings4Line className="text-2xl" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wide">System Configuration</h1>
          <p className="text-gray-400 text-sm">Manage dashboard preferences and AI thresholds</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glassmorphism p-6 rounded-2xl border border-white/10">
          <h3 className="text-brand-cyan font-bold mb-4 uppercase tracking-wider text-sm">Interface Preferences</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
              <div>
                <div className="font-semibold text-white">Cyberpunk Dark Theme</div>
                <div className="text-xs text-gray-400">Force high-contrast neon glows</div>
              </div>
              <button onClick={() => toggle('theme')} className="text-3xl text-brand-cyan transition-colors">
                {settings.theme ? <RiToggleFill className="drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" /> : <RiToggleLine className="text-gray-500" />}
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
              <div>
                <div className="font-semibold text-white">Interface Sounds</div>
                <div className="text-xs text-gray-400">Audible alerts for critical grid events</div>
              </div>
              <button onClick={() => toggle('sound')} className="text-3xl text-brand-cyan transition-colors">
                {settings.sound ? <RiToggleFill className="drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" /> : <RiToggleLine className="text-gray-500" />}
              </button>
            </div>
          </div>
        </div>

        <div className="glassmorphism p-6 rounded-2xl border border-white/10">
          <h3 className="text-brand-cyan font-bold mb-4 uppercase tracking-wider text-sm">AI Engine Core</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
              <div>
                <div className="font-semibold text-white">Predictive Analytics</div>
                <div className="text-xs text-gray-400">Allow AI to generate load forecasts</div>
              </div>
              <button onClick={() => toggle('ai')} className="text-3xl text-brand-cyan transition-colors">
                {settings.ai ? <RiToggleFill className="drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" /> : <RiToggleLine className="text-gray-500" />}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
              <div>
                <div className="font-semibold text-white">Critical Alert Auto-dispatch</div>
                <div className="text-xs text-gray-400">Automatically notify field teams on overload</div>
              </div>
              <button onClick={() => toggle('alerts')} className="text-3xl text-brand-cyan transition-colors">
                {settings.alerts ? <RiToggleFill className="drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" /> : <RiToggleLine className="text-gray-500" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
