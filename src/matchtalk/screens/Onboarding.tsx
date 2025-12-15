import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/UI';
import { AppRoute } from '../types';

export const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <Layout showNav={false} theme="light">
      <div className="flex flex-col h-full min-h-screen relative p-6">
        
        {/* Header */}
        <header className="w-full flex justify-center items-center pt-8 pb-4 z-10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-3xl text-slate-900">graphic_eq</span>
            <span className="text-xl font-bold tracking-tight uppercase text-slate-900">MatchTalk</span>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          
          {/* Timer Visual */}
          <div className="mb-10 relative">
             <div className="relative w-64 h-64 rounded-full border-[6px] border-[#eadd05] bg-white flex items-center justify-center shadow-xl">
                <svg className="absolute inset-0 w-full h-full -rotate-90 transform p-1" viewBox="0 0 100 100">
                  <circle className="text-[#f9f506]" cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeDasharray="283" strokeDashoffset="0" strokeLinecap="round" strokeWidth="6" />
                </svg>
                <div className="flex flex-col items-center justify-center z-10">
                  <span className="text-6xl font-bold text-slate-900 tracking-tighter">5:00</span>
                  <span className="text-xs font-medium uppercase tracking-widest text-slate-400 mt-2">Dakika</span>
                </div>
                {/* Knob */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-[#f9f506] rounded-full shadow-sm"></div>
             </div>
          </div>

          <div className="max-w-xs text-center space-y-4">
            <h2 className="text-slate-900 text-[28px] font-bold leading-tight tracking-tight">
              5 Dakikalık Sohbetler
            </h2>
            <p className="text-slate-500 text-base font-normal leading-relaxed">
              Her sohbet 5 dakika. İsterseniz 3 dakika daha uzatabilirsiniz.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full pb-8 flex flex-col items-center gap-8">
          {/* Indicators */}
          <div className="flex flex-row items-center justify-center gap-3">
            <div className="h-2 w-2 rounded-full bg-slate-200"></div>
            <div className="h-2 w-2 rounded-full bg-slate-200"></div>
            <div className="h-2 w-8 rounded-full bg-[#f9f506] shadow-[0_0_10px_rgba(249,245,6,0.5)]"></div>
          </div>

          <Button 
            variant="accent" 
            fullWidth 
            onClick={() => navigate(AppRoute.LOGIN)}
            icon="arrow_forward"
          >
            İleri
          </Button>
        </div>
      </div>
    </Layout>
  );
};