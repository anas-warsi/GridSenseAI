import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PublicNavbar from '../components/public/PublicNavbar';
import PublicHero from '../components/public/PublicHero';
import PublicMap from '../components/public/PublicMap';
import HowItWorks from '../components/public/HowItWorks';
import PublicStatus from '../components/public/PublicStatus';
import PublicAlerts from '../components/public/PublicAlerts';
import ReportIssue from '../components/public/ReportIssue';
import PublicFooter from '../components/public/PublicFooter';
import AdminLoginModal from '../components/public/AdminLoginModal';

export default function PublicHome() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-[#0A0B10] text-white font-sans overflow-x-hidden"
    >
      <PublicNavbar onLoginClick={() => setIsLoginModalOpen(true)} />
      
      <main>
        <PublicHero />
        <PublicAlerts />
        <PublicMap />
        <HowItWorks />
        <PublicStatus />
        <ReportIssue />
      </main>

      <PublicFooter />

      <AdminLoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </motion.div>
  );
}
