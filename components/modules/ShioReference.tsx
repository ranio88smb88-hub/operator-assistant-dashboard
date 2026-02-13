import React from 'react';
import { SHIO_DATA } from '../../constants';
import { Zap, Info } from 'lucide-react';

interface Props {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

// Add showToast to component props to align with other modules
const ShioReference: React.FC<Props> = ({ showToast }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Shio Reference 2024</h3>
          <p className="text-zinc-500 text-sm">Full zodiac cycle, lucky numbers, and characteristics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SHIO_DATA.map((shio, i) => (
          <div key={i} className="glass-card p-6 rounded-3xl border border-white/5 hover:border-amber-500/20 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/10 text-amber-500 font-bold group-hover:bg-amber-500 group-hover:text-black transition-all">
                {shio.name.substring(0, 1)}
              </div>
              <div className="text-right">
                <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Element</div>
                <div className="text-sm font-bold text-amber-200">{shio.element}</div>
              </div>
            </div>

            <h4 className="text-xl font-black text-white mb-1">{shio.name}</h4>
            <p className="text-xs text-zinc-500 font-medium mb-4">{shio.years}</p>
            
            <div className="space-y-3">
              <div className="bg-zinc-950/50 p-3 rounded-xl border border-white/5">
                <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Lucky Numbers</div>
                <div className="flex space-x-2">
                  {shio.luckyNumbers.split(',').map(n => (
                    <span key={n} className="w-6 h-6 bg-amber-500/20 rounded flex items-center justify-center text-[10px] font-bold text-amber-500">{n.trim()}</span>
                  ))}
                </div>
              </div>
              <div className="text-xs text-zinc-400 italic">
                <span className="font-bold text-zinc-600 uppercase text-[9px] mr-2">Trait:</span>
                "{shio.trait}"
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex items-start space-x-4">
        <div className="p-2 bg-amber-500/10 rounded-lg">
          <Info className="w-4 h-4 text-amber-500" />
        </div>
        <p className="text-xs text-amber-500/80 leading-relaxed font-medium">
          The Shio cycle updates every Lunar New Year. Reference these numbers for Togel predictions based on dream interpretation or daily zodiac rotation. Internal algorithm uses these weights for generator logic.
        </p>
      </div>
    </div>
  );
};

export default ShioReference;