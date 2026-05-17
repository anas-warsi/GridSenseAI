import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import { AnimatePresence } from 'framer-motion';

export default function Layout() {
  return (
    <div className="h-screen w-screen bg-[#0A0A0B] text-white flex overflow-hidden font-sans relative">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.03)_0%,rgba(10,10,11,1)_70%)] pointer-events-none" />

      {/* Main Layout */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        <TopNavbar />
        
        <main className="flex-1 overflow-y-auto relative min-h-0">
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
