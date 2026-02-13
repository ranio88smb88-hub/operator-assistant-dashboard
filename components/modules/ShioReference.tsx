import React from 'react';
import { SHIO_DATA } from '../../constants';
import { Info } from 'lucide-react';

export default function ShioReference({ showToast }: {
  showToast: (message: string, type?: 'success' | 'error') => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Shio Reference 2024</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SHIO_DATA.map((shio, i) => (
          <div key={i} className="glass-card p-6 rounded-3xl border border-white/5 hover:border-amber-500/20 transition-all group">
            <h4 className="text-xl font-black text-white mb-1">{shio.name}</h4>
            <p className="text-xs text-zinc-500 font-medium mb-4">{shio.years}</p>
            <div className="bg-zinc-950/50 p-3 rounded-xl border border-white/5">
              <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-1">Lucky Numbers</div>
              <div className="flex space-x-2">
                {shio.luckyNumbers.split(',').map(n => (
                  <span key={n} className="px-2 py-1 bg-amber-500/20 rounded text-[10px] font-bold text-amber-500">{n.trim()}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
