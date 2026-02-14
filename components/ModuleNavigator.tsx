
import React, { useState, useMemo } from 'react';
import { ModuleType, AppSettings } from '../types';
import { Shield, Activity, Cpu, Database, Network, Zap } from 'lucide-react';

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
      icon: Activity,
      tag: 'SCANNING_MATCH_LOGS'
    },
    { 
      type: ModuleType.TOGEL_PRED, 
      name: settings.sliders[ModuleType.TOGEL_PRED]?.title || 'NUMEROLOGY', 
      desc: 'Pseudo-random number engine and market trend calculator.',
      img: settings.sliders[ModuleType.TOGEL_PRED]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-2.png',
      icon: Database,
      tag: 'DECRYPTING_SEQUENCES'
    },
    { 
      type: ModuleType.BANK_VALIDATOR, 
      name: settings.sliders[ModuleType.BANK_VALIDATOR]?.title || 'GATEWAY CHECK', 
      desc: 'Offline banking protocol validation and prefix detection.',
      img: settings.sliders[ModuleType.BANK_VALIDATOR]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-3.png',
      icon: Network,
      tag: 'VALIDATING_CHANNELS'
    },
    { 
      type: ModuleType.SYAIR_HOKI, 
      name: settings.sliders[ModuleType.SYAIR_HOKI]?.title || 'ORACLE SYAIR', 
      desc: 'Mystical sentence generator for fortune-based operations.',
      img: settings.sliders[ModuleType.SYAIR_HOKI]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-4.png',
      icon: Zap,
      tag: 'FETCHING_ORACLES'
    },
    { 
      type: ModuleType.NAWALA_CHECK, 
      name: settings.sliders[ModuleType.NAWALA_CHECK]?.title || 'FIREWALL SCAN', 
      desc: 'Domain risk assessment and keyword blacklist filtering.',
      img: settings.sliders[ModuleType.NAWALA_CHECK]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-5.png',
      icon: Shield,
      tag: 'DEFENSE_PROTOCOL_V4'
    },
    { 
      type: ModuleType.PASARAN_SCHEDULE, 
      name: settings.sliders[ModuleType.PASARAN_SCHEDULE]?.title || 'MARKET TIMES', 
      desc: 'Real-time daily market opening and closing schedule logs.',
      img: settings.sliders[ModuleType.PASARAN_SCHEDULE]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-1.png',
      icon: Cpu,
      tag: 'MARKET_SYNC_ACTIVE'
    }
  ];

  const embers = useMemo(() => [...Array(10)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    size: `${2 + Math.random() * 3}px`,
    color: i % 2 === 0 ? 'var(--cyber-fire)' : 'var(--primary-color)'
  })), []);

  return (
    <div className="flex w-full h-[700px] gap-2 md:gap-4 items-center justify-center py-4 md:py-10">
      {slides.map((slide, i) => {
        const Icon = slide.icon;
        const isActive = activeIndex === i;

        return (
          <div 
            key={i}
            onClick={() => isActive ? onSelectModule(slide.type) : setActiveIndex(i)}
            className={`
              slide group relative flex-1 h-full rounded-[40px] md:rounded-[50px] cursor-pointer border-2 transition-all duration-[1200ms]
              ${isActive ? 'active border-[var(--primary-color)]' : 'border-white/10 opacity-60 grayscale hover:grayscale-0 hover:opacity-100'}
            `}
          >
            {isActive && (
              <div className="smoke-container">
                <div className="smoke-particle" style={{ left: '-10%', animation: 'smoke-fluid 12s infinite ease-out' }}></div>
                <div className="smoke-particle" style={{ left: '30%', animation: 'smoke-fluid 15s infinite ease-out 2s' }}></div>
                <div className="smoke-particle" style={{ left: '60%', animation: 'smoke-fluid 10s infinite ease-out 4s' }}></div>
              </div>
            )}

            <div 
              className="char-layer absolute inset-0 bg-no-repeat"
              style={{ backgroundImage: `url(${slide.img})`, filter: isActive ? 'url(#cyber-heat)' : '' }}
            />
            
            {isActive && (
              <div className="fire-foundation h-full">
                <div className="fire-inner fire-fluid-pulse" style={{ opacity: 0.3, filter: 'blur(30px)' }}></div>
                <div className="fire-inner fire-fluid-pulse" style={{ width: '80%', left: '10%', animationDelay: '0.2s', opacity: 0.4, filter: 'blur(20px)' }}></div>
                <div className="fire-inner fire-fluid-pulse" style={{ width: '60%', left: '20%', animationDelay: '0.4s', opacity: 0.5, filter: 'blur(10px)' }}></div>
                
                {embers.map((ember) => (
                  <div 
                    key={ember.id} 
                    className="ember" 
                    style={{ 
                      left: ember.left, 
                      bottom: '0', 
                      width: ember.size, 
                      height: ember.size,
                      backgroundColor: ember.color,
                      animation: `ember-drift ${3 + Math.random() * 2}s infinite linear ${ember.delay}` 
                    }}
                  />
                ))}
              </div>
            )}

            <div className={`
              absolute inset-0 p-10 flex flex-col justify-end text-white transition-all duration-1000 z-10
              ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}>
              <div className="flex items-center space-x-3 mb-4">
                 <div className="p-2.5 bg-black/60 border border-[var(--primary-color)]/40 rounded-xl backdrop-blur-md">
                   <Icon className="w-5 h-5 text-[var(--primary-color)]" />
                 </div>
                 <div className="h-[1px] w-12 bg-[var(--primary-color)] opacity-40"></div>
              </div>

              <h3 
                data-text={slide.name}
                className={`
                  glitch-title font-orbitron font-black text-[var(--primary-color)] neon-text-primary text-3xl md:text-5xl mb-3 uppercase tracking-tighter leading-none
                  ${isActive ? 'opacity-100' : 'opacity-0'}
                `}
              >
                {slide.name}
              </h3>
              
              <p className="font-orbitron text-[10px] md:text-[11px] text-white/50 mb-10 leading-relaxed max-w-sm uppercase tracking-widest">
                {slide.desc}
              </p>
              
              <div className="relative inline-flex items-center group/btn w-fit">
                <div className="absolute -inset-1 bg-[var(--primary-color)] blur opacity-20 group-hover/btn:opacity-50 transition duration-500 rounded-full"></div>
                <button className="relative flex items-center text-[10px] font-black tracking-[0.5em] text-black bg-[var(--primary-color)] px-10 py-4 rounded-full uppercase transition-all hover:px-12 active:scale-95 shadow-[0_0_20px_rgba(0,255,0,0.3)]">
                  INITIALIZE
                </button>
              </div>
            </div>

            {!isActive && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                 <p className="font-orbitron font-black text-white/5 text-xl md:text-3xl -rotate-90 uppercase tracking-[0.8em] group-hover:text-white/20 transition-all whitespace-nowrap">
                   {slide.name.split(' ')[0]}
                 </p>
              </div>
            )}

            {isActive && (
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[var(--primary-color)] opacity-40 shadow-[0_0_10px_var(--primary-color)] animate-[scanline_4s_linear_infinite] z-20"></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ModuleNavigator;
