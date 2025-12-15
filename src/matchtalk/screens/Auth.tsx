import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button, Input } from '../components/UI';
import { AppRoute } from '../types';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <Layout showNav={false} theme="dark">
      <div className="flex flex-col min-h-screen p-6 relative">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="flex-1 flex flex-col justify-center w-full max-w-sm mx-auto z-10">
          
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 ring-1 ring-primary/30">
              <span className="material-symbols-outlined text-primary text-4xl">graphic_eq</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">MatchTalk</h1>
            <p className="text-slate-400">Hoş Geldiniz</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate(AppRoute.HOME); }}>
            <Input 
              type="email" 
              placeholder="E-posta adresiniz" 
              icon="mail"
            />
            <Input 
              type="password" 
              placeholder="Şifre" 
              icon="lock"
              actionIcon="visibility"
            />
            
            <div className="flex justify-end">
              <button type="button" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                Şifremi Unuttum?
              </button>
            </div>

            <Button type="submit" fullWidth variant="primary" className="mt-4">
              Giriş Yap
            </Button>
          </form>
          
        </div>

        <div className="py-6 text-center w-full z-10">
          <p className="text-sm text-slate-400">
            Hesabın yok mu? 
            <button className="text-primary font-bold hover:underline ml-1">Kayıt Ol</button>
          </p>
        </div>
      </div>
    </Layout>
  );
};