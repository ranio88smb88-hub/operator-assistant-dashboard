
import React from 'react';
import { PASARAN_SCHEDULE } from '../../constants';
import { Clock, Info, ShieldCheck } from 'lucide-react';

export default function PasaranSchedule({ showToast }: {
  showToast: (message: string, type?: 'success' | 'error') => void;
}) {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-end shrink-0">
        <div>
          <h3 className="text-2xl font-black font-orbitron text-white uppercase tracking-tighter">Market Schedule</h3>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Real-time daily market synchronization</p>
        </div>
        <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
           <ShieldCheck className="w-4 h-4 text-emerald-500" />
           <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Protocol Secured</span>
        </div>
      </div>

      {/* FIXED SCROLLABLE CONTAINER */}
      <div className="glass-panel rounded-[30px] border border-white/5 overflow-hidden flex flex-col min-h-0 flex-1 bg-black/20" style={{ maxHeight: 'calc(100vh - 350px)' }}>
        <div className="overflow-y-auto overflow-x-auto flex-1 custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="sticky top-0 z-20">
              <tr className="bg-[#0f0f0f] border-b border-white/10">
                <th className="px-6 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Pasaran Name</th>
                <th className="px-6 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Closing Time</th>
                <th className="px-6 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-center">Result Time</th>
                <th className="px-6 py-5 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Market Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {PASARAN_SCHEDULE.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.03] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 bg-[var(--primary-color)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="font-bold text-sm text-zinc-200 uppercase tracking-tight">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-rose-400 font-mono text-xs font-black bg-rose-400/5 px-3 py-1.5 rounded-lg border border-rose-400/10">{p.close}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-emerald-400 font-mono text-xs font-black bg-emerald-400/5 px-3 py-1.5 rounded-lg border border-emerald-400/10">{p.open}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase tracking-tighter">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-zinc-950/40 border border-white/5 flex items-start space-x-4 shrink-0">
        <Info className="w-5 h-5 text-zinc-600 mt-1 shrink-0" />
        <p className="text-[10px] text-zinc-600 leading-relaxed font-bold italic">
          Data jadwal pasaran diperbarui secara otomatis berdasarkan zona waktu WIB (UTC+7). 
          Pastikan waktu perangkat Anda akurat untuk sinkronisasi optimal.
        </p>
      </div>
    </div>
  );
}
