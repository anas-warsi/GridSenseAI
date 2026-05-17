import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { RiSendPlaneFill, RiMapPinLine, RiErrorWarningLine } from 'react-icons/ri';
import { GridContext } from '../../context/GridContext';

export default function ReportIssue() {
  const { addComplaint } = useContext(GridContext);
  const [formData, setFormData] = useState({
    type: 'Low Voltage',
    severity: 'high',
    lat: '',
    lng: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addComplaint({
      type: formData.type,
      severity: formData.severity,
      message: formData.message || 'Citizen reported anomaly.',
      lat: formData.lat ? parseFloat(formData.lat) : undefined,
      lng: formData.lng ? parseFloat(formData.lng) : undefined
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ type: 'Low Voltage', severity: 'high', lat: '', lng: '', message: '' });
    }, 4000);
  };

  return (
    <section id="report" className="py-24 relative z-10 bg-[#06070A] overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-brand-red/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-red/30 bg-brand-red/10 text-brand-red text-sm font-semibold tracking-wide mb-6"
          >
            <RiErrorWarningLine /> Citizen Reporting Active
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            Report an <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-500">Electricity Anomaly</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg mb-8 leading-relaxed"
          >
            Experiencing a power outage, low voltage, or noticed a sparking transformer? Log the issue directly into the GridSense AI system. Our routing algorithm prioritizes complaints and dispatches field teams automatically.
          </motion.p>
          
          {/* Decorative Elements */}
          <div className="hidden lg:flex items-center gap-6 mt-12 opacity-50">
            <div className="w-16 h-1 bg-gradient-to-r from-brand-red to-transparent rounded-full" />
            <div className="text-xs font-mono text-brand-red tracking-widest uppercase">Direct Uplink</div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glassmorphism p-8 rounded-3xl border border-brand-red/30 shadow-[0_0_50px_rgba(255,51,102,0.15)] relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-brand-red to-orange-500" />
          
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                <RiSendPlaneFill className="text-4xl text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Report Transmitted</h3>
              <p className="text-gray-400">GridSense AI has logged the anomaly. Field teams have been notified via the dashboard.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 tracking-wider uppercase">Anomaly Type</label>
                  <select 
                    required
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-red/50 focus:shadow-[0_0_20px_rgba(255,51,102,0.2)] appearance-none transition-all"
                  >
                    <option className="bg-[#12141D]" value="Low Voltage">Low Voltage</option>
                    <option className="bg-[#12141D]" value="Power Outage">Power Outage</option>
                    <option className="bg-[#12141D]" value="Transformer Sparking">Transformer Sparking</option>
                    <option className="bg-[#12141D]" value="Line Damage">Line Damage</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 tracking-wider uppercase">Severity Level</label>
                  <select 
                    required
                    value={formData.severity}
                    onChange={e => setFormData({...formData, severity: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-red/50 focus:shadow-[0_0_20px_rgba(255,51,102,0.2)] appearance-none transition-all"
                  >
                    <option className="bg-[#12141D]" value="high">High</option>
                    <option className="bg-[#12141D]" value="critical">Critical</option>
                    <option className="bg-[#12141D]" value="warning">Warning</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 relative">
                <label className="text-xs font-bold text-gray-400 tracking-wider uppercase">GPS Coordinates</label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <RiMapPinLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                      required
                      type="text" 
                      placeholder="Lat (e.g. 27.8849)"
                      value={formData.lat}
                      onChange={e => setFormData({...formData, lat: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 pl-11 text-white focus:outline-none focus:border-brand-red/50 focus:shadow-[0_0_20px_rgba(255,51,102,0.2)] transition-all"
                    />
                  </div>
                  <div className="relative flex-1">
                    <input 
                      required
                      type="text" 
                      placeholder="Lng (e.g. 79.9077)"
                      value={formData.lng}
                      onChange={e => setFormData({...formData, lng: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-red/50 focus:shadow-[0_0_20px_rgba(255,51,102,0.2)] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 tracking-wider uppercase">Additional Details</label>
                <textarea 
                  required
                  rows="4"
                  placeholder="Provide any specific details about the anomaly..."
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-brand-red/50 focus:shadow-[0_0_20px_rgba(255,51,102,0.2)] resize-none transition-all"
                ></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-brand-red to-orange-500 text-white font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(255,51,102,0.4)] flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(255,51,102,0.6)] transition-all"
              >
                <RiSendPlaneFill className="text-xl" /> Submit Report
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
