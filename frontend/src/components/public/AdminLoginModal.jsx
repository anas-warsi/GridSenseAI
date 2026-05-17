import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RiCloseLine, RiLockPasswordLine, RiUserLine, RiLoginCircleLine } from 'react-icons/ri';

export default function AdminLoginModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsAuthenticating(true);

    // Mock Authentication Delay for cinematic feel
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        navigate('/dashboard');
      } else {
        setError('Invalid system credentials.');
        setIsAuthenticating(false);
      }
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md glassmorphism rounded-2xl border border-brand-cyan/40 shadow-[0_0_60px_rgba(0,240,255,0.2)] overflow-hidden"
          >
            {/* Glowing borders and animated backgrounds */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-blue" />
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-brand-cyan/20 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="p-8 relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-wide flex items-center gap-2">
                    <RiLockPasswordLine className="text-brand-cyan" />
                    Admin Access
                  </h2>
                  <p className="text-sm text-gray-400 mt-2">Enter credentials to access operational dashboard</p>
                </div>
                <button 
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <RiCloseLine className="text-xl" />
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-cyan tracking-widest uppercase">Username</label>
                  <div className="relative">
                    <RiUserLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      value={credentials.username}
                      onChange={e => setCredentials({...credentials, username: e.target.value})}
                      placeholder="Enter username"
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 pl-11 text-white focus:outline-none focus:border-brand-cyan/50 focus:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-cyan tracking-widest uppercase">Password</label>
                  <div className="relative">
                    <RiLockPasswordLine className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="password" 
                      value={credentials.password}
                      onChange={e => setCredentials({...credentials, password: e.target.value})}
                      placeholder="••••••••"
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-3 pl-11 text-white focus:outline-none focus:border-brand-cyan/50 focus:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all"
                    />
                  </div>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-brand-red text-sm font-medium bg-brand-red/10 border border-brand-red/30 p-3 rounded-lg text-center"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-white font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isAuthenticating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <RiLoginCircleLine className="text-xl" /> Initialize Uplink
                    </>
                  )}
                </motion.button>
              </form>
              
              <div className="mt-6 text-center text-xs text-gray-500 font-mono">
                Mock Credentials: admin / admin123
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
