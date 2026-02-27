
import React, { useState } from 'react';
import { ModuleType, AppSettings } from '../types';
import { Shield, Activity, Cpu, Database, Network, Zap, Coins } from 'lucide-react';

interface Props {
  onSelectModule: (module: ModuleType) => void;
  settings: AppSettings;
}

const ModuleNavigator: React.FC<Props> = ({ onSelectModule, settings }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    { 
      type: ModuleType.FOOTBALL_PRED, 
      name: settings.sliders[ModuleType.FOOTBALL_PRED]?.title || 'FOOTBALL OPS', 
      desc: 'Advanced match analytics and probability prediction generator.',
      img: settings.sliders[ModuleType.FOOTBALL_PRED]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-1.png',
      icon: Activity
    },
    { 
      type: ModuleType.TOGEL_PRED, 
      name: settings.sliders[ModuleType.TOGEL_PRED]?.title || 'NUMEROLOGY', 
      desc: 'Pseudo-random number engine and market trend calculator.',
      img: settings.sliders[ModuleType.TOGEL_PRED]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-2.png',
      icon: Database
    },
    { 
      type: ModuleType.BANK_VALIDATOR, 
      name: settings.sliders[ModuleType.BANK_VALIDATOR]?.title || 'GATEWAY CHECK', 
      desc: 'Offline banking protocol validation and prefix detection.',
      img: settings.sliders[ModuleType.BANK_VALIDATOR]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-3.png',
      icon: Network
    },
    { 
      type: ModuleType.SYAIR_HOKI, 
      name: settings.sliders[ModuleType.SYAIR_HOKI]?.title || 'ORACLE SYAIR', 
      desc: 'Mystical sentence generator for fortune-based operations.',
      img: settings.sliders[ModuleType.SYAIR_HOKI]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-4.png',
      icon: Zap
    },
    { 
      type: ModuleType.NAWALA_CHECK, 
      name: settings.sliders[ModuleType.NAWALA_CHECK]?.title || 'FIREWALL SCAN', 
      desc: 'Domain risk assessment and keyword blacklist filtering.',
      img: settings.sliders[ModuleType.NAWALA_CHECK]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-5.png',
      icon: Shield
    },
    { 
      type: ModuleType.PASARAN_SCHEDULE, 
      name: settings.sliders[ModuleType.PASARAN_SCHEDULE]?.title || 'MARKET TIMES', 
      desc: 'Real-time daily market opening and closing schedule logs.',
      img: settings.sliders[ModuleType.PASARAN_SCHEDULE]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-1.png',
      icon: Cpu
    },
    { 
      type: ModuleType.SLOT_WIN_CALC, 
      name: settings.sliders[ModuleType.SLOT_WIN_CALC]?.title || 'WIN TRACKER', 
      desc: 'Freespin and Buyspin profitability monitor for PG and Pragmatic.',
      img: settings.sliders[ModuleType.SLOT_WIN_CALC]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-2.png',
      icon: Coins
    }
  ];

  return (
    <div className="flex w-full h-[650px] gap-3 md:gap-4 items-center justify-center py-6">
      {slides.map((slide, i) => {
        const Icon = slide.icon;
        const isActive = activeIndex === i;

        return (
          <div 
            key={i}
            onClick={() => isActive ? onSelectModule(slide.type) : setActiveIndex(i)}
            className={`
              slide group relative flex-1 h-full rounded-[40px] md:rounded-[50px] cursor-pointer border-2 transition-all duration-700
              ${isActive ? 'active border-[var(--primary-color)]' : 'border-white/10 opacity-60 grayscale hover:opacity-100'}
            `}
          >
            {/* CHARACTER */}
            <div 
              className="char-layer absolute inset-0 bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.img})` }}
            />
            
            {/* CONTENT */}
            <div className={`
              absolute inset-0 p-8 flex flex-col justify-end text-white transition-all duration-700 z-10
              ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
            `}>
              <div className="flex items-center space-x-3 mb-4">
                 <div className="p-2 bg-black/60 border border-[var(--primary-color)]/30 rounded-lg text-[var(--primary-color)]">
                   <Icon className="w-4 h-4" />
                 </div>
                 <div className="h-[1px] w-8 bg-[var(--primary-color)] opacity-30"></div>
              </div>

              <h3 className="font-orbitron font-black text-[var(--primary-color)] neon-text-primary text-3xl md:text-4xl mb-2 uppercase tracking-tighter leading-none">
                {slide.name}
              </h3>
              
              <p className="font-orbitron text-[9px] text-white/50 mb-8 leading-relaxed max-w-[250px] uppercase tracking-widest">
                {slide.desc}
              </p>
              
              <div className="relative group/btn w-fit">
                <button className="relative bg-[var(--primary-color)] text-black font-black font-orbitron text-[9px] px-8 py-3 rounded-full uppercase tracking-[0.3em] hover:scale-105 transition-all">
                  INITIALIZE PROTOCOL
                </button>
              </div>
            </div>

            {/* VERTICAL TEXT (INACTIVE) */}
            {!isActive && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <p className="font-orbitron font-black text-white/5 text-2xl -rotate-90 uppercase tracking-[0.6em] whitespace-nowrap">
                   {slide.name.split(' ')[0]}
                 </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ModuleNavigator;
