
import React, { useState } from 'react';
import { ModuleType } from '../types';
import { 
  Trophy, 
  Dices, 
  Zap, 
  CreditCard, 
  Calendar, 
  Calculator, 
  Settings2, 
  TrendingUp, 
  History, 
  ShieldAlert, 
  Sparkles,
  Home,
  Menu,
  X,
  Terminal,
  Settings as SettingsIcon
} from 'lucide-react';

interface NavbarProps {
  activeModule: ModuleType | 'HOME';
  onModuleChange: (module: ModuleType | 'HOME') => void;
  primaryColor: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeModule, onModuleChange, primaryColor }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { type: ModuleType.FOOTBALL_PRED, label: 'BOLA', icon: Trophy },
    { type: ModuleType.TOGEL_PRED, label: 'TOGEL', icon: Dices },
    { type: ModuleType.SYAIR_HOKI, label: 'SYAIR', icon: Sparkles },
    { type: ModuleType.BANK_VALIDATOR, label: 'BANK', icon: CreditCard },
    { type: ModuleType.PASARAN_SCHEDULE, label: 'JADWAL', icon: Calendar },
    { type: ModuleType.PRIZE_CALC, label: 'HADIAH', icon: Calculator },
    { type: ModuleType.TOGEL_CALC, label: 'ENGINE', icon: Settings2 },
    { type: ModuleType.FOOTBALL_CALC, label: 'BOLA BET', icon: TrendingUp },
    { type: ModuleType.RESULT_VIEWER, label: 'ARCHIVE', icon: History },
    { type: ModuleType.NAWALA_CHECK, label: 'NAWALA', icon: ShieldAlert },
    { type: ModuleType.SHIO_REF, label: 'SHIO', icon: Zap },
  ];

  const handleNav = (type: ModuleType | 'HOME') => {
    onModuleChange(type);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-primary-fade backdrop-blur-2xl">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group shrink-0" 
          onClick={() => handleNav('HOME')}
        >
          <div className="p-2 bg-primary-fade rounded border border-primary-fade group-hover:neon-border-primary transition-all">
            <Terminal className="w-5 h-5 text-[var(--primary-color)]" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-orbitron text-sm md:text-lg font-black text-[var(--primary-color)] neon-text-primary tracking-tighter uppercase leading-none">
              CYBER-OPS
            </h1>
            <span className="text-[8px] font-black text-zinc-600 tracking-[0.3em] uppercase hidden md:block mt-1">
              SYSTEM STATUS: ACTIVE
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1 overflow-x-auto no-scrollbar mx-8 px-4 border-l border-r border-white/5">
          <button
            onClick={() => handleNav('HOME')}
            className={`px-4 py-2 rounded-xl text-[10px] font-black font-orbitron tracking-widest transition-all ${
              activeModule === 'HOME' 
                ? 'bg-primary-fade text-[var(--primary-color)] border border-primary-fade' 
                : 'text-zinc-500 hover:text-white'
            }`}
          >
            HOME
          </button>
          
          {menuItems.map((item) => (
            <button
              key={item.type}
              onClick={() => handleNav(item.type)}
              className={`flex items-center px-4 py-2 rounded-xl text-[10px] font-black font-orbitron tracking-widest transition-all whitespace-nowrap ${
                activeModule === item.type 
                  ? 'bg-primary-fade text-[var(--primary-color)] border border-primary-fade' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-3.5 h-3.5 mr-2 opacity-70" />
              {item.label}
            </button>
          ))}
        </div>

        {/* System Settings & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleNav(ModuleType.SETTINGS)}
            className={`hidden md:flex p-3 rounded-xl border transition-all ${
              activeModule === ModuleType.SETTINGS 
                ? 'bg-primary-fade border-[var(--primary-color)] text-[var(--primary-color)]' 
                : 'border-white/5 text-zinc-500 hover:text-white hover:border-white/20'
            }`}
          >
            <SettingsIcon className="w-5 h-5" />
          </button>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3 bg-primary-fade rounded-xl border border-primary-fade text-[var(--primary-color)]"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        lg:hidden absolute top-20 left-0 w-full glass-panel border-b border-primary-fade backdrop-blur-3xl overflow-hidden transition-all duration-500
        ${isMobileMenuOpen ? 'max-h-[85vh] opacity-100 border-b' : 'max-h-0 opacity-0 border-b-0'}
      `}>
        <div className="p-6 grid grid-cols-2 gap-3 overflow-y-auto max-h-[75vh] custom-scrollbar">
          <button
            onClick={() => handleNav('HOME')}
            className={`col-span-2 flex items-center p-4 rounded-2xl text-[11px] font-black font-orbitron tracking-widest ${
              activeModule === 'HOME' ? 'bg-primary-fade text-[var(--primary-color)] border border-primary-fade' : 'bg-black/40 text-zinc-500'
            }`}
          >
            <Home className="w-4 h-4 mr-3" /> DASHBOARD HOME
          </button>
          
          {menuItems.map((item) => (
            <button
              key={item.type}
              onClick={() => handleNav(item.type)}
              className={`flex items-center p-4 rounded-2xl text-[10px] font-black font-orbitron tracking-widest ${
                activeModule === item.type ? 'bg-primary-fade text-[var(--primary-color)] border border-primary-fade' : 'bg-black/40 text-zinc-500'
              }`}
            >
              <item.icon className="w-4 h-4 mr-3" /> {item.label}
            </button>
          ))}

          <button
            onClick={() => handleNav(ModuleType.SETTINGS)}
            className={`col-span-2 flex items-center p-4 rounded-2xl text-[11px] font-black font-orbitron tracking-widest ${
              activeModule === ModuleType.SETTINGS ? 'bg-primary-fade text-[var(--primary-color)] border border-primary-fade' : 'bg-black/40 text-zinc-500'
            }`}
          >
            <SettingsIcon className="w-4 h-4 mr-3" /> SYSTEM SETTINGS
          </button>
        </div>
        <div className="p-4 bg-black/60 border-t border-white/5 flex items-center justify-between text-[8px] font-black tracking-[0.3em] text-zinc-600">
          <span>OPERATOR INTERFACE V3.0</span>
          <span className="text-[var(--primary-color)] animate-pulse">SYNCED</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
