import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Header } from '../components/UI';

const ToggleItem = ({ icon, label, defaultChecked = false }: any) => (
  <div className="flex items-center justify-between w-full bg-dark-surface p-4 rounded-2xl border border-white/5">
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <span className="text-white text-[15px] font-medium">{label}</span>
    </div>
    <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
        <input type="checkbox" name="toggle" defaultChecked={defaultChecked} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-transparent left-1 top-1 checked:right-0 checked:border-primary transition-all duration-300"/>
        <label className="toggle-label block overflow-hidden h-8 rounded-full bg-slate-700 cursor-pointer"></label>
    </div>
  </div>
);

export const Settings = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header title="Ayarlar" showBack onBack={() => navigate(-1)} />
      
      <div className="px-4 py-2 space-y-6">
        
        <div className="space-y-2">
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest pl-2">Bildirimler</h3>
          <ToggleItem icon="notifications" label="Push Bildirimleri" defaultChecked />
          <ToggleItem icon="mark_email_unread" label="E-posta Bildirimleri" />
          <ToggleItem icon="group_add" label="Oda Davetleri" defaultChecked />
        </div>

        <div className="space-y-2">
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest pl-2">Uygulama</h3>
           <button className="flex items-center justify-between w-full bg-dark-surface p-4 rounded-2xl border border-white/5 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">dark_mode</span>
                </div>
                <span className="text-white text-[15px] font-medium">Tema</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-sm">Koyu</span>
                <span className="material-symbols-outlined">chevron_right</span>
              </div>
           </button>
        </div>

        <div className="space-y-2">
           <button className="w-full bg-dark-surface p-4 rounded-2xl border border-white/5 text-red-500 font-medium">
             Çıkış Yap
           </button>
        </div>

      </div>
      
      {/* Inline styles for the toggle switch simulation */}
      <style>{`
        .toggle-checkbox:checked { right: 0; border-color: #6366F1; }
        .toggle-checkbox:checked + .toggle-label { background-color: #6366F1; }
      `}</style>
    </Layout>
  );
};