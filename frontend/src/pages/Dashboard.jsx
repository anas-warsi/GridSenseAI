import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import StatsCards from '../components/StatsCards';
import DashboardMap from '../components/DashboardMap';
import AIInsightsPanel from '../components/AIInsightsPanel';
import LiveAlertsFeed from '../components/LiveAlertsFeed';
import GridRiskMeter from '../components/GridRiskMeter';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

export default function Dashboard() {

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.4 }}
      className="min-h-full flex flex-col gap-6 p-6"
    >
      <StatsCards />
      
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-[700px]">
        {/* Map Area */}
        <div className="flex-1 relative rounded-2xl overflow-hidden group border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] min-h-[400px]">
          <DashboardMap />
        </div>

        {/* Right Side Panels */}
        <div className="w-full lg:w-96 flex flex-col gap-6 shrink-0 lg:max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
          <div className="shrink-0">
            <GridRiskMeter />
          </div>
          <div className="shrink-0 min-h-[300px]">
            <AIInsightsPanel />
          </div>
          <div className="shrink-0 min-h-[300px]">
            <LiveAlertsFeed />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
