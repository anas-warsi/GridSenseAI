import React from 'react';
import { motion } from 'framer-motion';
import { RiSmartphoneLine, RiBrainLine, RiMapPinRangeFill, RiDashboard3Fill, RiFlashlightFill } from 'react-icons/ri';

const steps = [
  {
    icon: RiSmartphoneLine,
    title: "1. Citizen Reporting",
    desc: "Users instantly log power outages, sparking transformers, or low voltage issues via the public portal."
  },
  {
    icon: RiBrainLine,
    title: "2. AI Processing",
    desc: "GridSense AI analyzes incoming complaint patterns against historical load data and weather conditions."
  },
  {
    icon: RiMapPinRangeFill,
    title: "3. Risk Zone Detection",
    desc: "The system automatically isolates affected areas and calculates predicted grid failure probabilities."
  },
  {
    icon: RiDashboard3Fill,
    title: "4. Admin Alerting",
    desc: "Operational dashboards update in real-time, pinging engineers with prioritized critical alerts."
  },
  {
    icon: RiFlashlightFill,
    title: "5. Rapid Resolution",
    desc: "Field teams deploy precisely to verified anomaly locations, dramatically reducing total outage times."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative z-10 bg-[#06070A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
          >
            How GridSense <span className="text-brand-cyan">AI Works</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            An end-to-end intelligent ecosystem bridging the gap between citizen reporting and rapid infrastructure repair.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glassmorphism p-6 rounded-2xl border border-white/5 hover:border-brand-cyan/40 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-brand-cyan/10 group-hover:border-brand-cyan/30 transition-colors shadow-[0_0_0_rgba(0,240,255,0)] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                <step.icon className="text-3xl text-gray-500 group-hover:text-brand-cyan transition-colors" />
              </div>
              
              <h3 className="text-lg font-bold text-white mb-3 tracking-wide">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
