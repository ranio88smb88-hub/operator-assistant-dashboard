
import React, { useState, useEffect } from 'react';
import { PASARAN_SCHEDULE } from '../../constants';
import { Clock, Info, ExternalLink, CheckCircle, AlertCircle, RefreshCcw } from 'lucide-react';

export default function PasaranSchedule({ showToast }: {
  showToast: (message: string, type?: 'success' | 'error') => void;
}) {
  const [completedMarkets, setCompletedMarkets] = useState<Set<string>>(new Set());

  // Load saved state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('market_done_status');
    if (saved) {
      try {
        setCompletedMarkets(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error("Failed to parse market status", e);
      }
    } else {
      // Initialize with default values from constants
      const initial = new Set<string>();
      PASARAN_SCHEDULE.forEach(p => {
        if (p.initialDone) initial.add(p.id);
      });
      setCompletedMarkets(initial);
    }
  }, []);

  // Save to localStorage whenever status changes
  const toggleStatus = (id: string, name: string) => {
    const newSet = new Set(completedMarkets);
    const isDone = newSet.has(id);
    
    if (isDone) {
      newSet.delete(id);
      showToast(`${name} set to PENDING`, 'error');
    } else {
      newSet.add(id);
      showToast(`${name} set to DONE`, 'success');
    }
    
    setCompletedMarkets(newSet);
    localStorage.setItem('market_done_status', JSON.stringify(Array.from(newSet)));
  };

  const resetToday = () => {
    const empty = new Set<string>();
    setCompletedMarkets(empty);
    localStorage.setItem('market_done_status', JSON.stringify([]));
    showToast('Semua status direset ke PENDING');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h3 className="text-2xl font-black font-orbitron text-white uppercase tracking-tighter">Market Protocol Schedule</h3>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Real-time daily market tracking console.</p>
        </div>
        <button 
          onClick={resetToday}
          className="flex items-center px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/5 rounded-xl text-[10px] font-black text-zinc-400 uppercase tracking-widest transition-all"
        >
          <RefreshCcw className="w-3 h-3 mr-2" /> Reset Status Harian
        </button>
      </div>

      <div className="glass-panel rounded-3xl border border-white/5 overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto custom-scrollbar overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="sticky top-0 z-20 bg-[#0a0a0a]/90 backdrop-blur-md">
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">No</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Nama Pasaran</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Bet Close</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Jam Tutup</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Prize</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Live Draw</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Status Result</th>
                <th className="px-6 py-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {PASARAN_SCHEDULE.map((p) => {
                const isDone = completedMarkets.has(p.id);
                return (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 text-[11px] font-black text-zinc-600 font-mono">{p.id.padStart(2, '0')}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-sm text-zinc-200 uppercase flex items-center">
                        {p.name}
                        {isDone && <CheckCircle className="w-3 h-3 ml-2 text-emerald-500" />}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-rose-400 font-mono text-xs font-black px-2 py-1 rounded bg-rose-500/5">{p.betClose}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-emerald-400 font-mono text-xs font-black px-2 py-1 rounded bg-emerald-500/5">{p.open}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-[10px] font-black text-zinc-500 uppercase">{p.prize}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${p.liveDraw === 'ADA LIVE' ? 'bg-blue-500/10 text-blue-400' : 'bg-zinc-800 text-zinc-600'}`}>
                        {p.liveDraw}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => toggleStatus(p.id, p.name)}
                        className={`
                          min-w-[90px] px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all
                          ${isDone 
                            ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                            : 'bg-rose-600/20 text-rose-500 border border-rose-500/30 hover:bg-rose-600/40'
                          }
                        `}
                      >
                        {isDone ? 'DONE' : 'PENDING'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a 
                        href={p.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2 inline-flex items-center justify-center bg-white/5 border border-white/5 rounded-lg text-zinc-500 hover:text-[var(--primary-color)] hover:border-[var(--primary-color)]/30 transition-all"
                        title="Situs Acuan WLA"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="p-5 rounded-3xl bg-zinc-950/50 border border-white/5 flex items-start space-x-4">
        <Info className="w-5 h-5 text-zinc-600 mt-1 shrink-0" />
        <div className="space-y-1">
          <h5 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Protocol Advisory</h5>
          <p className="text-[10px] text-zinc-600 leading-relaxed font-bold italic">
            Klik pada badge status <span className="text-rose-500">PENDING</span> untuk menandai pasaran sebagai <span className="text-emerald-500">DONE</span> setelah result keluar. 
            Data status disimpan secara lokal di browser Anda dan akan bertahan meskipun halaman direfresh. Gunakan "Reset Status Harian" setiap awal hari operasional.
          </p>
        </div>
      </div>
    </div>
  );
}
