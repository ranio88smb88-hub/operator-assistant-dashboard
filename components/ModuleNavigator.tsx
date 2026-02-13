
import React, { useState } from 'react';
import { ModuleType } from '../types';

interface Props {
  onSelectModule: (module: ModuleType) => void;
}

const ModuleNavigator: React.FC<Props> = ({ onSelectModule }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    { 
      type: ModuleType.FOOTBALL_PRED, 
      name: 'FOOTBALL OPS', 
      desc: 'Advanced match analytics and probability prediction generator.',
      img: 'https://assets.codepen.io/3617690/cyberpunk-character-alt-1.png'
    },
    { 
      type: ModuleType.TOGEL_PRED, 
      name: 'NUMEROLOGY', 
      desc: 'Pseudo-random number engine and market trend calculator.',
      img: 'https://assets.codepen.io/3617690/cyberpunk-character-alt-2.png'
    },
    { 
      type: ModuleType.BANK_VALIDATOR, 
      name: 'GATEWAY CHECK', 
      desc: 'Offline banking protocol validation and prefix detection.',
      img: 'https://assets.codepen.io/3617690/cyberpunk-character-alt-3.png'
    },
    { 
      type: ModuleType.SYAIR_HOKI, 
      name: 'ORACLE SYAIR', 
      desc: 'Mystical sentence generator for fortune-based operations.',
      img: 'https://assets.codepen.io/3617690/cyberpunk-character-alt-4.png'
    },
    { 
      type: ModuleType.NAWALA_CHECK, 
      name: 'FIREWALL SCAN', 
      desc: 'Domain risk assessment and keyword blacklist filtering.',
      img: 'https://assets.codepen.io/3617690/cyberpunk-character-alt-5.png'
    }
  ];

  return (
    <div className="flex w-full h-[600px] gap-4 items-center justify-center py-10">
      {slides.map((slide, i) => (
        <div 
          key={i}
          onClick={() => activeIndex === i ? onSelectModule(slide.type) : setActiveIndex(i)}
          className={`
            slide group relative flex-1 h-full rounded-[40px] bg-center bg-cover bg-no-repeat cursor-pointer border-2
            ${activeIndex === i ? 'active border-[#0f0] neon-border-green basis-[40%]' : 'border-white/10 opacity-60 grayscale hover:grayscale-0 hover:opacity-100'}
          `}
          style={{ backgroundImage: `url(${slide.img})` }}
        >
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-[38px]"></div>
          
          <div className={`
            slide__text absolute bottom-10 left-8 right-8 text-white transition-all duration-500
            ${activeIndex === i ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
          `}>
            <p className="font-orbitron font-black text-[#0f0] neon-text-green text-3xl mb-2 uppercase tracking-tighter">
              {slide.name}
            </p>
            <p className="font-orbitron text-xs text-white/80 mb-6 leading-relaxed max-w-xs">
              {slide.desc}
            </p>
            <div className="inline-flex items-center text-[10px] font-black tracking-[0.3em] text-[#0f0] bg-black/80 px-4 py-2 rounded-full border border-[#0f0]/30 animate-pulse">
              INITIALIZE INTERFACE >>
            </div>
          </div>

          {/* Label for non-active */}
          {activeIndex !== i && (
            <div className="absolute inset-0 flex items-center justify-center">
               <p className="font-orbitron font-black text-white/20 text-xl -rotate-90 uppercase tracking-[0.5em] group-hover:text-white/40 transition-colors">
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
