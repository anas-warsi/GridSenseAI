import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiFlashlightFill, RiMenu3Line, RiCloseLine } from 'react-icons/ri';

export default function PublicNavbar({ onLoginClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Live Grid', href: '#live-grid' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'System Status', href: '#status' },
    { name: 'Report Issue', href: '#report' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0A0A0B]/80 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-cyan/50 blur-[10px] group-hover:blur-[15px] transition-all rounded-full" />
            <RiFlashlightFill className="text-3xl text-brand-cyan relative z-10" />
          </div>
          <span className="text-xl font-bold tracking-widest text-white">
            GRID<span className="text-brand-cyan">SENSE</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-brand-cyan transition-colors tracking-wide relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-cyan transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Admin Access Button */}
        <div className="hidden md:block">
          <button 
            onClick={onLoginClick}
            className="px-6 py-2.5 rounded-full border border-brand-cyan/50 text-brand-cyan text-sm font-bold tracking-wide hover:bg-brand-cyan/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center gap-2 group"
          >
            <span className="w-2 h-2 rounded-full bg-brand-cyan group-hover:animate-pulse" />
            Admin Access
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-2xl text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-[#0A0A0B]/95 backdrop-blur-xl border-b border-white/10 px-6 py-4"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-brand-cyan transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onLoginClick();
              }}
              className="mt-2 py-3 rounded-xl border border-brand-cyan/50 text-brand-cyan text-center font-bold tracking-wide hover:bg-brand-cyan/10 transition-all flex items-center justify-center gap-2"
            >
              Admin Access
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
