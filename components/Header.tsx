
import React from 'react';
import { ModuleType } from '../types';
import { Menu, Terminal, Box } from 'lucide-react';

interface HeaderProps {
  activeModule: ModuleType | 'HOME';
  onToggleMenu: () => void;
  onGoHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeModule, onToggleMenu, onGoHome }) => {
  const getTitle = () => {
    if (activeModule === 'HOME') return 'COMMAND CENTER';
    return activeModule.replace('_', ' ');
  };

  return (
    <header className="h-20 glass-panel border-b border-[#0f0]/20 flex items-center px-4 md:px-8 z-10 sticky top-0">
      <button 
        onClick={onToggleMenu}
        className="lg:hidden p-2 mr-4 bg-[#0f0]/5 hover:bg-[#0f0]/10 rounded-lg text-[#0f0] border border-[#0f0]/20 transition-all"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="flex items-center space-x-3 cursor-pointer group" onClick={onGoHome}>
        <div className="p-2 bg-[#0f0]/10 rounded border border-[#0f0]/30 group-hover:bg-[#0f0]/20 transition-all">
          <Terminal className="w-5 h-5 text-[#0f0]" />
        </div>
        <div className="flex flex-col">
          <h2 className="font-orbitron text-xs md:text-sm font-black text-[#0f0] neon-text-green tracking-widest uppercase">
            {getTitle()}
          </h2>
          <span className="text-[8px] font-black text-zinc-600 tracking-[0.3em] uppercase hidden md:block">
            System Interface Status: Active
          </span>
        </div>
      </div>
      
      <div className="ml-auto flex items-center space-x-6">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-[9px] font-black text-zinc-600 tracking-widest uppercase mb-1">Local Server Node</span>
          <div className="flex items-center space-x-2 text-[#0f0] font-mono text-xs font-bold">
            <Box className="w-3 h-3" />
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
