import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { AppRoute } from '../types';

const RoomCard = ({ title, category, count, time, images, isLive }: any) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(AppRoute.ROOM)}
      className="group relative bg-dark-surface rounded-3xl p-5 mb-4 border border-white/5 active:scale-[0.98] transition-all cursor-pointer hover:border-primary/30"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight leading-snug">{title}</h3>
          <p className="text-sm text-slate-400 mt-1">{category}</p>
        </div>
        {time && (
          <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
            <span className="material-symbols-outlined text-primary text-[16px]">timer</span>
            <span className="text-primary font-bold text-sm tabular-nums">{time}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-[-8px] mb-5 pl-2">
        {images.map((img: string, i: number) => (
          <div key={i} className="-ml-3 w-10 h-10 rounded-full border-2 border-dark-surface bg-slate-700 overflow-hidden">
             <img src={img} alt="User" className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="-ml-3 w-10 h-10 rounded-full border-2 border-dark-surface bg-slate-800 flex items-center justify-center text-xs font-bold text-white">
          +2
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-slate-500 text-[20px]">group</span>
          <span className="text-sm font-semibold text-slate-300">{count}/8</span>
        </div>
        <button className="bg-white/5 hover:bg-primary text-white text-sm font-semibold py-2 px-5 rounded-full transition-colors">
          Katıl
        </button>
      </div>
    </div>
  );
};

export const Home = () => {
  return (
    <Layout>
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 bg-dark-bg sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center size-8 rounded-full bg-gradient-to-tr from-primary to-purple-500">
            <span className="material-symbols-outlined text-white text-lg">graphic_eq</span>
          </div>
          <p className="text-[20px] font-bold tracking-tight text-white">MatchTalk</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-slate-400">notifications</span>
            <span className="absolute top-2 right-2 size-2.5 bg-red-500 rounded-full border-2 border-dark-bg"></span>
          </button>
          <div className="size-10 rounded-full bg-slate-700 p-[2px] ring-2 ring-transparent hover:ring-primary/50 overflow-hidden cursor-pointer">
            <img src="https://picsum.photos/100/100?random=1" className="w-full h-full object-cover rounded-full" alt="Profile"/>
          </div>
        </div>
      </header>

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-lg font-bold text-white">Aktif Odalar</h2>
          <button className="text-sm text-primary font-medium">Tümünü Gör</button>
        </div>

        <RoomCard 
          title="Chill Vibes & Music" 
          category="Müzik ve Sohbet" 
          time="04:32"
          count={6}
          images={["https://picsum.photos/100?random=2", "https://picsum.photos/100?random=3", "https://picsum.photos/100?random=4"]}
        />
        
        <RoomCard 
          title="Startup Konuşmaları 🚀" 
          category="Teknoloji" 
          time="12:05"
          count={4}
          images={["https://picsum.photos/100?random=5", "https://picsum.photos/100?random=6", "https://picsum.photos/100?random=7"]}
        />

        <RoomCard 
          title="İngilizce Pratik" 
          category="Eğitim" 
          time="09:15"
          count={7}
          images={["https://picsum.photos/100?random=8", "https://picsum.photos/100?random=9", "https://picsum.photos/100?random=10"]}
        />
      </div>
    </Layout>
  );
};