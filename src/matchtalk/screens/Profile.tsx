import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { AppRoute } from '../types';

const StatCard = ({ value, label }: { value: string, label: string }) => (
  <div className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-dark-surface p-4 border border-white/5 hover:border-primary/30 transition-colors">
    <p className="text-white text-2xl font-bold">{value}</p>
    <p className="text-slate-400 text-xs font-medium">{label}</p>
  </div>
);

const Badge = ({ icon, label, locked = false, color = "from-blue-400 to-indigo-500" }: any) => (
  <div className={`flex flex-col items-center gap-2 rounded-2xl bg-dark-surface p-4 border border-white/5 ${locked ? 'opacity-50 grayscale' : ''}`}>
    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${locked ? 'from-slate-600 to-slate-700' : color} flex items-center justify-center shadow-lg text-white`}>
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </div>
    <span className="text-xs text-slate-300 font-medium">{label}</span>
  </div>
);

export const Profile = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col">
        {/* Profile Header */}
        <div className="relative w-full bg-gradient-to-b from-primary to-[#7c3aed] pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-2xl z-10">
          <div className="flex flex-col items-center gap-4">
             <div className="relative group cursor-pointer">
                <div className="h-[120px] w-[120px] rounded-full border-4 border-white bg-slate-800 overflow-hidden shadow-xl">
                  <img src="https://picsum.photos/200?random=20" alt="Profile" className="w-full h-full object-cover"/>
                </div>
                <div className="absolute bottom-1 right-1 bg-emerald-500 w-5 h-5 rounded-full border-2 border-white"></div>
             </div>
             <div className="text-center">
               <h1 className="text-white text-2xl font-bold tracking-tight mb-1">Elif Yılmaz</h1>
               <p className="text-white/90 text-sm font-semibold bg-white/10 px-3 py-1 rounded-full inline-block">Seviye 5</p>
             </div>
             {/* XP Bar */}
             <div className="w-full max-w-[240px] flex flex-col gap-2">
               <div className="flex justify-between text-xs font-medium text-white/80 px-1">
                 <span>1200 XP</span>
                 <span>2500 XP</span>
               </div>
               <div className="h-2 w-full rounded-full bg-black/20 backdrop-blur-sm overflow-hidden">
                 <div className="h-full rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ width: '48%' }}></div>
               </div>
             </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6 p-5">
           <div className="grid grid-cols-3 gap-3">
             <StatCard value="128" label="saat" />
             <StatCard value="42" label="oda" />
             <StatCard value="15" label="kişi" />
           </div>

           <div className="flex flex-col gap-4">
             <div className="flex items-center justify-between px-1">
               <h3 className="text-white text-lg font-semibold">Rozetlerim</h3>
               <button className="text-primary text-sm font-medium">Tümünü Gör</button>
             </div>
             <div className="grid grid-cols-3 gap-3">
               <Badge icon="mic" label="Konuşkan" color="from-yellow-400 to-orange-500" />
               <Badge icon="group" label="Sosyal" color="from-blue-400 to-indigo-500" />
               <Badge icon="rocket_launch" label="Roket" locked />
             </div>
           </div>

           <div className="flex flex-col gap-3 pb-8">
              <h3 className="text-white text-lg font-semibold px-1">Ayarlar</h3>
              <div className="bg-dark-surface rounded-2xl overflow-hidden border border-white/5">
                {[
                  { icon: 'edit', label: 'Profili Düzenle', onClick: () => navigate(AppRoute.SETTINGS) },
                  { icon: 'notifications', label: 'Bildirimler', onClick: () => navigate(AppRoute.NOTIFICATIONS) },
                  { icon: 'lock', label: 'Gizlilik' },
                  { icon: 'logout', label: 'Çıkış Yap', color: 'text-red-500' }
                ].map((item, i) => (
                  <button 
                    key={i} 
                    onClick={item.onClick}
                    className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                  >
                     <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined ${item.color || 'text-slate-400'}`}>{item.icon}</span>
                        <span className={`text-sm font-medium ${item.color || 'text-white'}`}>{item.label}</span>
                     </div>
                     <span className="material-symbols-outlined text-slate-600">chevron_right</span>
                  </button>
                ))}
              </div>
           </div>
        </div>
      </div>
    </Layout>
  );
};