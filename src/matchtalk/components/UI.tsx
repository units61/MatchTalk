import React from 'react';
import { motion } from 'framer-motion';

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  fullWidth?: boolean;
  icon?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  icon,
  className = '',
  ...props 
}) => {
  const baseStyles = "h-14 rounded-2xl font-semibold text-base flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary hover:bg-primary-dark text-white shadow-primary/25",
    secondary: "bg-dark-surface border border-white/10 text-white hover:bg-white/5",
    accent: "bg-accent hover:bg-accent-dark text-slate-900 shadow-accent/20",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-red-500/25",
  };

  return (
    <motion.button 
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="material-symbols-outlined">{icon}</span>}
      {children}
    </motion.button>
  );
};

// --- Input ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
  actionIcon?: string;
  onActionClick?: () => void;
}

export const Input: React.FC<InputProps> = ({ label, icon, actionIcon, onActionClick, className, ...props }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="text-sm font-medium text-slate-400 ml-1">{label}</label>}
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">{icon}</span>
          </div>
        )}
        <input 
          className={`w-full h-14 bg-dark-surface border border-white/10 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all ${icon ? 'pl-12' : 'pl-4'} ${actionIcon ? 'pr-12' : 'pr-4'}`}
          {...props}
        />
        {actionIcon && (
          <button 
            type="button"
            onClick={onActionClick}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">{actionIcon}</span>
          </button>
        )}
      </div>
    </div>
  );
};

// --- Header ---
export const Header = ({ title, showBack = false, onBack }: { title: string, showBack?: boolean, onBack?: () => void }) => (
  <header className="sticky top-0 z-40 bg-dark-bg/95 backdrop-blur-md border-b border-white/5">
    <div className="flex items-center justify-between px-4 py-3 h-[60px]">
      {showBack ? (
        <button onClick={onBack} className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full active:bg-white/10 transition-colors text-white">
          <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
        </button>
      ) : <div className="w-10" />}
      
      <h1 className="text-lg font-bold tracking-tight text-center text-white">{title}</h1>
      
      <div className="w-10" /> 
    </div>
  </header>
);