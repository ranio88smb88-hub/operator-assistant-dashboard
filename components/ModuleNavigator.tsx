import React, { useState } from 'react';
import { ModuleType, AppSettings } from '../types';

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
      img: settings.sliders[ModuleType.FOOTBALL_PRED]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-1.png'
    },
    { 
      type: ModuleType.TOGEL_PRED, 
      name: settings.sliders[ModuleType.TOGEL_PRED]?.title || 'NUMEROLOGY', 
      desc: 'Pseudo-random number engine and market trend calculator.',
      img: settings.sliders[ModuleType.TOGEL_PRED]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-2.png'
    },
    { 
      type: ModuleType.BANK_VALIDATOR, 
      name: settings.sliders[ModuleType.BANK_VALIDATOR]?.title || 'GATEWAY CHECK', 
      desc: 'Offline banking protocol validation and prefix detection.',
      img: settings.sliders[ModuleType.BANK_VALIDATOR]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-3.png'
    },
    { 
      type: ModuleType.SYAIR_HOKI, 
      name: settings.sliders[ModuleType.SYAIR_HOKI]?.title || 'ORACLE SYAIR', 
      desc: 'Mystical sentence generator for fortune-based operations.',
      img: settings.sliders[ModuleType.SYAIR_HOKI]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-4.png'
    },
    { 
      type: ModuleType.NAWALA_CHECK, 
      name: settings.sliders[ModuleType.NAWALA_CHECK]?.title || 'FIREWALL SCAN', 
      desc: 'Domain risk assessment and keyword blacklist filtering.',
      img: settings.sliders[ModuleType.NAWALA_CHECK]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-5.png'
    },
    { 
      type: ModuleType.PASARAN_SCHEDULE, 
      name: settings.sliders[ModuleType.PASARAN_SCHEDULE]?.title || 'MARKET TIMES', 
      desc: 'Real-time daily market opening and closing schedule logs.',
      img: settings.sliders[ModuleType.PASARAN_SCHEDULE]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-1.png'
    }
  ];

  return (
    <div className="flex w-full h-[600px] gap-2 md:gap-4 items-center justify-center py-4 md:py-10">
      {slides.map((slide, i) => (
        <div 
          key={i}
          onClick={() => activeIndex === i ? onSelectModule(slide.type) : setActiveIndex(i)}
          className={`
            slide group relative flex-1 h-full rounded-[30px] md:rounded-[40px] bg-center bg-cover bg-no-repeat cursor-pointer border-2 transition-all duration-[1200ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
            ${activeIndex === i ? 'active border-[var(--primary-color)] basis-[50%] md:basis-[40%]' : 'border-white/10 opacity-60 grayscale hover:grayscale-0 hover:opacity-100'}
          `}
          style={{ backgroundImage: `url(${slide.img})`, boxShadow: activeIndex === i ? `0 0 20px ${settings.primaryColor}44` : 'none' }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent rounded-[28px] md:rounded-[38px]"></div>
          
          <div className={`
            slide__text absolute bottom-6 md:bottom-10 left-4 md:left-8 right-4 md:right-8 text-white transition-all duration-500
            ${activeIndex === i ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
          `}>
            <p className="font-orbitron font-black text-[var(--primary-color)] neon-text-primary text-xl md:text-3xl mb-1 md:mb-2 uppercase tracking-tighter">
              {slide.name}
            </p>
            <p className="font-orbitron text-[10px] md:text-xs text-white/80 mb-4 md:mb-6 leading-relaxed max-w-xs">
              {slide.desc}
            </p>
            <div className="inline-flex items-center text-[8px] md:text-[10px] font-black tracking-[0.3em] text-[var(--primary-color)] bg-black/80 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-primary-fade animate-pulse">
              INITIALIZE INTERFACE {'>>'}
            </div>
          </div>

          {activeIndex !== i && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <p className="font-orbitron font-black text-white/20 text-sm md:text-xl -rotate-90 uppercase tracking-[0.5em] group-hover:text-white/40 transition-colors whitespace-nowrap">
                 {slide.name.split(' ')[0]}
               </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ModuleNavigator;
