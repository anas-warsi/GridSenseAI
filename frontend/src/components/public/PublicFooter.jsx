import React from 'react';
import { RiFlashlightFill, RiGithubFill, RiTwitterXFill, RiLinkedinFill } from 'react-icons/ri';

export default function PublicFooter() {
  return (
    <footer className="bg-[#0A0A0B] relative z-10 pt-20 pb-10 border-t border-white/5 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-cyan/5 blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="flex items-center gap-3 group mb-6 inline-flex">
              <RiFlashlightFill className="text-3xl text-brand-cyan drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
              <span className="text-2xl font-bold tracking-widest text-white">
                GRID<span className="text-brand-cyan">SENSE</span>
              </span>
            </a>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
              Pioneering the future of smart-city infrastructure with real-time AI-powered electricity grid monitoring and automated response routing.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-cyan hover:bg-brand-cyan/10 hover:border-brand-cyan/30 transition-all">
                <RiTwitterXFill className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-cyan hover:bg-brand-cyan/10 hover:border-brand-cyan/30 transition-all">
                <RiGithubFill className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand-cyan hover:bg-brand-cyan/10 hover:border-brand-cyan/30 transition-all">
                <RiLinkedinFill className="text-lg" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold tracking-wider mb-6">PLATFORM</h4>
            <ul className="space-y-4">
              <li><a href="#live-grid" className="text-gray-400 hover:text-brand-cyan transition-colors text-sm">Live Monitoring Map</a></li>
              <li><a href="#report" className="text-gray-400 hover:text-brand-cyan transition-colors text-sm">Report Grid Anomaly</a></li>
              <li><a href="#status" className="text-gray-400 hover:text-brand-cyan transition-colors text-sm">System Status</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-brand-cyan transition-colors text-sm">AI Engine Workflow</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold tracking-wider mb-6">RESOURCES</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-brand-cyan transition-colors text-sm">Developer API</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-cyan transition-colors text-sm">Smart City Integration</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-cyan transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-cyan transition-colors text-sm">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} GridSense AI Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
            </span>
            <span className="text-sm font-bold text-gray-400 tracking-widest uppercase">System Core: Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
