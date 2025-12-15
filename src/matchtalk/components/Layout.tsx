import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AppRoute } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
  theme?: 'dark' | 'light';
}

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: 'home', label: 'Ana Sayfa', path: AppRoute.HOME },
    { icon: 'search', label: 'Keşfet', path: AppRoute.HOME }, // Placeholder for demo
    { icon: 'chat_bubble', label: 'Sohbet', path: AppRoute.NOTIFICATIONS },
    { icon: 'person', label: 'Profil', path: AppRoute.PROFILE },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-dark-bg/90 backdrop-blur-lg border-t border-white/5 pb-safe pt-2 px-6 z-50">
      <div className="flex justify-between items-center h-16 max-w-md mx-auto">
        {navItems.slice(0, 2).map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center w-16 gap-1 group transition-colors ${
              location.pathname === item.path ? 'text-primary' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className={`material-symbols-outlined text-[26px] ${location.pathname === item.path ? 'fill-1' : ''}`}>
              {item.icon}
            </span>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}

        {/* Floating Action Button */}
        <div className="relative -top-6">
          <button 
            onClick={() => navigate(AppRoute.CREATE_ROOM)}
            className="flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-primary to-purple-600 rounded-full shadow-[0_4px_20px_rgba(99,102,241,0.4)] text-white hover:scale-105 transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined text-[28px]">add</span>
          </button>
        </div>

        {navItems.slice(2).map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center w-16 gap-1 group transition-colors ${
              location.pathname === item.path ? 'text-primary' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className={`material-symbols-outlined text-[26px] ${location.pathname === item.path ? 'fill-1' : ''}`}>
              {item.icon}
            </span>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children, showNav = true, theme = 'dark' }) => {
  return (
    <div className={`min-h-screen w-full flex justify-center ${theme === 'dark' ? 'bg-dark-bg text-white' : 'bg-[#f8f8f5] text-slate-900'}`}>
      <div className="w-full max-w-md relative flex flex-col min-h-screen shadow-2xl overflow-hidden bg-inherit">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex-1 flex flex-col h-full overflow-y-auto no-scrollbar"
          >
            {children}
            {showNav && <div className="h-24 shrink-0" />} 
          </motion.div>
        </AnimatePresence>
        {showNav && <BottomNav />}
      </div>
    </div>
  );
};