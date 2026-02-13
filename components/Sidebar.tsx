
import React from 'react';
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
  X,
  Home
} from 'lucide-react';

interface SidebarProps {
  activeModule: ModuleType | 'HOME';
  onModuleChange: (module: ModuleType | 'HOME') => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, onModuleChange, isOpen, onClose }) => {
  const menuItems = [
    { type: ModuleType.FOOTBALL_PRED, label: 'BOLA PREDIKSI', icon: Trophy },
    { type: ModuleType.TOGEL_PRED, label: 'TOGEL PREDIKSI', icon: Dices },
    { type: ModuleType.SYAIR_HOKI, label: 'SYAIR HOKI', icon: Sparkles },
    { type: ModuleType.BANK_VALIDATOR, label: 'BANK VALIDATOR', icon: CreditCard },
    { type: ModuleType.PASARAN_SCHEDULE, label: 'JADWAL PASARAN', icon: Calendar },
    { type: ModuleType.PRIZE_CALC, label: 'HADIAH CALC', icon: Calculator },
    { type: ModuleType.TOGEL_CALC, label: 'TOGEL ENGINE', icon: Settings2 },
    { type: ModuleType.FOOTBALL_CALC, label: 'BOLA BET CALC', icon: TrendingUp },
    { type: ModuleType.RESULT_VIEWER, label: 'RESULT ARCHIVE', icon: History },
    { type: ModuleType.NAWALA_CHECK, label: 'NAWALA CHECK', icon: ShieldAlert },
    { type: ModuleType.SHIO_REF, label: 'SHIO REFERENCE', icon: Zap },
  ];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-64 glass-panel border-r border-[#0f0]/20 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)]
      lg:relative lg:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="p-6 border-b border-[#0f0]/10 flex items-center justify-between">
        <div>
          <h1 className="font-orbitron text-xl font-black text-[#0f0] neon-text-green tracking-tighter">
            CYBER-OPS
          </h1>
          <p className="text-[9px] text-zinc-500 mt-1 uppercase tracking-[0.3em] font-bold">
            V 3.0 // OPERATOR
          </p>
        </div>
        <button onClick={onClose} className="lg:hidden p-1 hover:bg-[#0f0]/10 rounded border border-[#0f0]/20">
          <X className="w-5 h-5 text-[#0f0]" />
        </button>
      </div>
      
      <nav className="flex-1 py-4 overflow-y-auto custom-scrollbar">
        <button
          onClick={() => onModuleChange('HOME')}
          className={`w-full flex items-center px-6 py-4 text-xs font-black tracking-widest transition-all duration-300 group ${
            activeModule === 'HOME' 
              ? 'bg-[#0f0]/10 text-[#0f0] border-r-4 border-[#0f0]' 
              : 'text-zinc-500 hover:text-[#0f0] hover:bg-[#0f0]/5'
          }`}
        >
          <Home className="w-4 h-4 mr-4" />
          <span className="font-orbitron">DASHBOARD HOME</span>
        </button>

        <div className="px-6 py-4 text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em]">Modules Selection</div>

        {menuItems.map((item) => (
          <button
            key={item.type}
            onClick={() => onModuleChange(item.type)}
            className={`w-full flex items-center px-6 py-3.5 text-[11px] font-bold transition-all duration-300 group border-b border-white/[0.02] ${
              activeModule === item.type 
                ? 'bg-[#0f0]/10 text-[#0f0] border-r-4 border-[#0f0]' 
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon className={`w-4 h-4 mr-4 ${activeModule === item.type ? 'text-[#0f0]' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
            <span className="font-orbitron uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-[#0f0]/10 bg-black/40">
        <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest">
           <span className="text-zinc-600">CONNECTION:</span>
           <span className="text-[#0f0] animate-pulse">ENCRYPTED</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
