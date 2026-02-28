
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ModuleType, AppSettings } from '../types';
import { Shield, Activity, Cpu, Database, Network, Zap, Coins, ChevronRight } from 'lucide-react';

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
      color: '#00ff00'
    },
    { 
      type: ModuleType.TOGEL_PRED, 
      name: settings.sliders[ModuleType.TOGEL_PRED]?.title || 'NUMEROLOGY', 
      desc: 'Pseudo-random number engine and market trend calculator.',
      img: settings.sliders[ModuleType.TOGEL_PRED]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-2.png',
      icon: Database,
      color: '#ff00ff'
    },
    { 
      type: ModuleType.BANK_VALIDATOR, 
      name: settings.sliders[ModuleType.BANK_VALIDATOR]?.title || 'GATEWAY CHECK', 
      desc: 'Offline banking protocol validation and prefix detection.',
      img: settings.sliders[ModuleType.BANK_VALIDATOR]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-3.png',
      icon: Network,
      color: '#00ffff'
    },
    { 
      type: ModuleType.SYAIR_HOKI, 
      name: settings.sliders[ModuleType.SYAIR_HOKI]?.title || 'ORACLE SYAIR', 
      desc: 'Mystical sentence generator for fortune-based operations.',
      img: settings.sliders[ModuleType.SYAIR_HOKI]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-4.png',
      icon: Zap,
      color: '#ffff00'
    },
    { 
      type: ModuleType.NAWALA_CHECK, 
      name: settings.sliders[ModuleType.NAWALA_CHECK]?.title || 'FIREWALL SCAN', 
      desc: 'Domain risk assessment and keyword blacklist filtering.',
      img: settings.sliders[ModuleType.NAWALA_CHECK]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-5.png',
      icon: Shield,
      color: '#ff3e3e'
    },
    { 
      type: ModuleType.PASARAN_SCHEDULE, 
      name: settings.sliders[ModuleType.PASARAN_SCHEDULE]?.title || 'MARKET TIMES', 
      desc: 'Real-time daily market opening and closing schedule logs.',
      img: settings.sliders[ModuleType.PASARAN_SCHEDULE]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-1.png',
      icon: Cpu,
      color: '#4f46e5'
    },
    { 
      type: ModuleType.SLOT_WIN_CALC, 
      name: settings.sliders[ModuleType.SLOT_WIN_CALC]?.title || 'WIN TRACKER', 
      desc: 'Freespin and Buyspin profitability monitor for PG and Pragmatic.',
      img: settings.sliders[ModuleType.SLOT_WIN_CALC]?.image || 'https://assets.codepen.io/3617690/cyberpunk-character-alt-2.png',
      icon: Coins,
      color: '#f59e0b'
    }
  ];

  return (
    <div className="flex w-full h-[700px] gap-4 items-center justify-center py-10 px-4 overflow-hidden">
      {slides.map((slide, i) => {
        const Icon = slide.icon;
        const isActive = activeIndex === i;

        return (
          <motion.div 
            key={i}
            layout
            initial={false}
            animate={{ 
              flex: isActive ? 4 : 1,
              opacity: isActive ? 1 : 0.4,
              scale: isActive ? 1 : 0.95
            }}
            whileHover={!isActive ? { 
              scale: 0.98,
              opacity: 1,
              boxShadow: `0 0 40px ${slide.color}66`,
              borderColor: `${slide.color}aa`
            } : {}}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              opacity: { duration: 0.5 }
            }}
            onClick={() => isActive ? onSelectModule(slide.type) : setActiveIndex(i)}
            className={`
              relative h-full rounded-[40px] md:rounded-[60px] cursor-pointer border-2 overflow-hidden group
              ${isActive ? 'border-[var(--primary-color)] shadow-[0_0_50px_rgba(0,255,0,0.15)]' : 'border-white/10 grayscale hover:grayscale-0 transition-all duration-500'}
            `}
          >
            {/* BACKGROUND GLOW */}
            <div 
              className="absolute inset-0 opacity-20 transition-opacity duration-700 group-hover:opacity-60"
              style={{ background: `radial-gradient(circle at center, ${slide.color}66 0%, transparent 70%)` }}
            />

            {/* SHIMMER ANIMATION ON HOVER */}
            {!isActive && (
              <motion.div 
                className="absolute inset-0 z-20 pointer-events-none"
                initial={{ x: '-100%' }}
                whileHover={{ 
                  x: '100%',
                  transition: { duration: 0.8, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }
                }}
              >
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-20" />
              </motion.div>
            )}

            {/* CHARACTER LAYER */}
            <motion.div 
              className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
              style={{ backgroundImage: `url(${slide.img})` }}
              animate={{ 
                filter: isActive ? 'brightness(1) contrast(1.1)' : 'brightness(0.5) contrast(0.8)'
              }}
            />

            {/* OVERLAY GRADIENT */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-90' : 'opacity-40'}`} />
            
            {/* CONTENT */}
            <AnimatePresence mode="wait">
              {isActive && (
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="absolute inset-0 p-10 flex flex-col justify-end text-white z-10"
                >
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center space-x-4 mb-6"
                  >
                     <div className="p-3 bg-black/80 border border-[var(--primary-color)] rounded-2xl text-[var(--primary-color)] shadow-[0_0_20px_rgba(0,255,0,0.3)]">
                       <Icon className="w-6 h-6" />
                     </div>
                     <div className="h-[2px] w-12 bg-[var(--primary-color)] shadow-[0_0_10px_rgba(0,255,0,0.5)]"></div>
                  </motion.div>

                  <motion.h3 
                    layoutId={`title-${i}`}
                    className="font-orbitron font-black text-[var(--primary-color)] neon-text-primary text-4xl md:text-5xl mb-4 uppercase tracking-tighter leading-none"
                  >
                    {slide.name}
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="font-orbitron text-[10px] text-white/70 mb-10 leading-relaxed max-w-[320px] uppercase tracking-[0.2em]"
                  >
                    {slide.desc}
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative group/btn w-fit"
                  >
                    <button className="relative overflow-hidden bg-[var(--primary-color)] text-black font-black font-orbitron text-[10px] px-10 py-4 rounded-full uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all flex items-center group">
                      <span className="relative z-10">INITIALIZE PROTOCOL</span>
                      <ChevronRight className="w-4 h-4 ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* VERTICAL TEXT (INACTIVE) */}
            {!isActive && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                 <p className="font-orbitron font-black text-white/10 text-3xl -rotate-90 uppercase tracking-[0.8em] whitespace-nowrap transition-all duration-500 group-hover:text-white/30 group-hover:tracking-[1em]">
                   {slide.name.split(' ')[0]}
                 </p>
              </motion.div>
            )}

            {/* SCANLINE EFFECT ON ACTIVE */}
            {isActive && (
              <div className="absolute inset-0 pointer-events-none bg-scanline opacity-10 mix-blend-overlay animate-pulse" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ModuleNavigator;
