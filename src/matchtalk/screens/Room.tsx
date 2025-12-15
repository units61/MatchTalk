import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '../components/Layout';

const AvatarNode = ({ img, name, position, isSpeaking, isMuted }: any) => {
  // Grid position mapping based on a 3x3 grid logic
  const posStyles: {[key: string]: string} = {
    1: 'col-start-2 row-start-1 translate-y-2', // Top
    2: 'col-start-3 row-start-1 translate-y-6 -translate-x-2', // Top Right
    3: 'col-start-3 row-start-2 -translate-x-1', // Right
    4: 'col-start-3 row-start-3 -translate-y-6 -translate-x-2', // Bottom Right
    5: 'col-start-2 row-start-3 -translate-y-2', // Bottom
    6: 'col-start-1 row-start-3 -translate-y-6 translate-x-2', // Bottom Left
    7: 'col-start-1 row-start-2 translate-x-1', // Left
    8: 'col-start-1 row-start-1 translate-y-6 translate-x-2', // Top Left
  };

  return (
    <div className={`flex flex-col items-center justify-center ${posStyles[position]} z-10 transition-all duration-300`}>
      <div className="relative">
        <div className={`w-[72px] h-[72px] rounded-full border-[3px] overflow-hidden transition-all duration-300 ${isSpeaking ? 'border-primary shadow-[0_0_15px_rgba(99,102,241,0.5)] scale-110' : 'border-slate-700 bg-slate-800'}`}>
           <img src={img} alt={name} className="w-full h-full object-cover" />
        </div>
        {isSpeaking && (
          <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1 border-2 border-dark-bg">
            <span className="material-symbols-outlined !text-[14px]">mic</span>
          </div>
        )}
        {isMuted && (
           <div className="absolute -bottom-1 -right-1 bg-red-500 text-white rounded-full p-1 border-2 border-dark-bg">
            <span className="material-symbols-outlined !text-[14px]">mic_off</span>
          </div>
        )}
      </div>
      <span className="mt-2 text-xs font-medium text-white/90 drop-shadow-md">{name}</span>
    </div>
  );
};

export const Room = () => {
  const navigate = useNavigate();
  const [showVoteModal, setShowVoteModal] = useState(false);

  useEffect(() => {
    // Simulate a voting event after 3 seconds
    const timer = setTimeout(() => setShowVoteModal(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-full bg-dark-bg text-white overflow-hidden relative flex flex-col items-center">
      
      {/* Header */}
      <header className="flex items-center justify-between w-full p-4 pt-6 z-20">
        <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10">
          <span className="material-symbols-outlined">expand_more</span>
        </button>
        <div className="text-center">
          <h2 className="text-sm font-bold">Startups & Coffee ☕️</h2>
          <div className="flex items-center justify-center gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>
             <span className="text-xs text-slate-400">Live</span>
          </div>
        </div>
        <button className="flex size-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </header>

      {/* Main Circular Layout */}
      <div className="flex-1 w-full max-w-md flex items-center justify-center relative px-4">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="relative w-full aspect-square grid grid-cols-3 grid-rows-3 items-center justify-items-center">
          
          {/* Center Timer */}
          <div className="col-start-2 row-start-2 z-0 relative flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border-4 border-slate-800 bg-dark-bg/50 backdrop-blur-sm flex items-center justify-center relative">
               <svg className="absolute inset-0 w-full h-full -rotate-90 p-1" viewBox="0 0 100 100">
                  <circle className="text-slate-700/50" cx="50" cy="50" fill="none" r="46" stroke="currentColor" strokeWidth="3" />
                  <circle className="text-primary drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" cx="50" cy="50" fill="none" r="46" stroke="currentColor" strokeDasharray="289" strokeDashoffset="50" strokeLinecap="round" strokeWidth="3" />
               </svg>
               <span className="text-4xl font-bold tracking-tight">4:32</span>
            </div>
          </div>

          {/* Avatars */}
          <AvatarNode position={1} name="Alice" img="https://picsum.photos/100?random=11" />
          <AvatarNode position={2} name="David" img="https://picsum.photos/100?random=12" isSpeaking />
          <AvatarNode position={3} name="Sarah" img="https://picsum.photos/100?random=13" />
          <AvatarNode position={4} name="Jean" img="https://picsum.photos/100?random=14" />
          <AvatarNode position={5} name="Kenji" img="https://picsum.photos/100?random=15" isMuted />
          <AvatarNode position={6} name="Ghost" img="https://picsum.photos/100?random=16" />
          <AvatarNode position={7} name="Elena" img="https://picsum.photos/100?random=17" />
          <AvatarNode position={8} name="Invite" img="" /> {/* Empty/Invite state handled by logic usually */}
           <div className="col-start-1 row-start-1 translate-y-6 translate-x-2 flex flex-col items-center">
              <div className="w-[72px] h-[72px] rounded-full border-2 border-dashed border-slate-600 bg-slate-800/50 flex items-center justify-center hover:bg-slate-700/50 cursor-pointer">
                 <span className="material-symbols-outlined text-slate-400">add</span>
              </div>
              <span className="mt-2 text-xs font-medium text-slate-400">Invite</span>
           </div>

        </div>
      </div>

      {/* Footer Controls */}
      <footer className="w-full p-6 pb-10 flex items-center justify-between max-w-md relative z-20">
        <div className="w-16" /> {/* Spacer */}
        
        <button className="group relative flex items-center justify-center w-20 h-20 rounded-full bg-primary shadow-lg shadow-primary/40 hover:scale-105 active:scale-95 transition-all">
          <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20"></div>
          <span className="material-symbols-outlined text-white !text-[36px]">mic</span>
        </button>

        <div className="w-16 flex justify-end">
           <button onClick={() => navigate(-1)} className="flex flex-col items-center gap-1 group">
             <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
               <span className="material-symbols-outlined text-red-500">call_end</span>
             </div>
             <span className="text-[10px] font-bold text-red-500 uppercase tracking-wide">Leave</span>
           </button>
        </div>
      </footer>

      {/* Voting Modal Overlay */}
      <AnimatePresence>
        {showVoteModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-dark-bg/80 backdrop-blur-md px-6"
          >
             <motion.div 
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.9, y: 20 }}
               className="w-full max-w-sm bg-dark-surface border border-white/10 rounded-3xl p-8 flex flex-col items-center shadow-2xl"
             >
                <h3 className="text-xl font-bold text-center mb-2">3 dakika daha konuşmak ister misiniz?</h3>
                
                <div className="relative my-8">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                  <span className="relative text-6xl font-bold text-primary drop-shadow-lg">10</span>
                </div>

                <div className="flex w-full gap-4">
                  <button onClick={() => setShowVoteModal(false)} className="flex-1 h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-lg transition-colors">
                    Evet
                  </button>
                  <button onClick={() => setShowVoteModal(false)} className="flex-1 h-14 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold text-lg transition-colors">
                    Hayır
                  </button>
                </div>
                <p className="mt-6 text-slate-500 text-xs font-bold uppercase tracking-widest">Oylama Başladı</p>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};