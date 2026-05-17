import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCloseLine, RiSendPlaneFill, RiMapPinLine } from 'react-icons/ri';
import { GridContext } from '../context/GridContext';

export default function ComplaintModal({ isOpen, onClose }) {
  const { addComplaint } = useContext(GridContext);
  const [formData, setFormData] = useState({
    type: 'Low Voltage',
    severity: 'high', // match the data schema
    lat: '',
    lng: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addComplaint({
      type: formData.type,
      severity: formData.severity,
      message: formData.message || 'No description provided.',
      lat: formData.lat ? parseFloat(formData.lat) : undefined,
      lng: formData.lng ? parseFloat(formData.lng) : undefined
    });
    // Reset and close
    setFormData({ type: 'Low Voltage', severity: 'high', lat: '', lng: '', message: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg glassmorphism rounded-2xl border border-brand-cyan/30 shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden"
          >
            {/* Top glowing bar */}
            <div className="h-1 w-full bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-blue" />
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-cyan">
                    Log Grid Anomaly
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">AI automated complaint resolution</p>
                </div>
                <button 
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <RiCloseLine className="text-xl" />
                </button>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-cyan tracking-wider uppercase">Anomaly Type</label>
                    <select 
                      value={formData.type}
                      onChange={e => setFormData({...formData, type: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] appearance-none"
                    >
                      <option className="bg-[#12141D]" value="Low Voltage">Low Voltage</option>
                      <option className="bg-[#12141D]" value="Power Outage">Power Outage</option>
                      <option className="bg-[#12141D]" value="Transformer Sparking">Transformer Sparking</option>
                      <option className="bg-[#12141D]" value="Line Damage">Line Damage</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-cyan tracking-wider uppercase">Severity</label>
                    <select 
                      value={formData.severity}
                      onChange={e => setFormData({...formData, severity: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] appearance-none"
                    >
                      <option className="bg-[#12141D]" value="warning">Warning</option>
                      <option className="bg-[#12141D]" value="high">High</option>
                      <option className="bg-[#12141D]" value="critical">Critical</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1 relative">
                  <label className="text-xs font-semibold text-brand-cyan tracking-wider uppercase">Location coordinates</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <RiMapPinLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Lat (e.g. 27.8849)"
                        value={formData.lat}
                        onChange={e => setFormData({...formData, lat: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-10 text-white focus:outline-none focus:border-brand-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                      />
                    </div>
                    <div className="relative flex-1">
                      <input 
                        type="text" 
                        placeholder="Lng (e.g. 79.9077)"
                        value={formData.lng}
                        onChange={e => setFormData({...formData, lng: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-cyan tracking-wider uppercase">Description</label>
                  <textarea 
                    rows="3"
                    placeholder="Describe the issue..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-brand-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] resize-none"
                  ></textarea>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white font-bold tracking-wide shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-shadow"
                >
                  <RiSendPlaneFill /> Transmit Data
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
