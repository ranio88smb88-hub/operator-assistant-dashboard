
import React from 'react';
import { PASARAN_SCHEDULE } from '../../constants';
import { Clock, Info } from 'lucide-react';

export default function PasaranSchedule({ showToast }: {
  showToast: (message: string, type?: 'success' | 'error') => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-xl font-bold">Pasaran Schedule</h3>
          <p className="text-zinc-500 text-sm">Real-time daily market hours.</p>
        </div>
      </div>

      {/* Kontainer dengan scroll vertikal dan max-height */}
      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
        <div className="max-h-[550px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-[#0a0a0a]">
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase">Pasaran</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase text-center">Close</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase text-center">Result</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {PASARAN_SCHEDULE.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-semibold text-zinc-200">{p.name}</td>
                  <td className="px-6 py-4 text-center text-rose-400 font-mono">{p.close}</td>
                  <td className="px-6 py-4 text-center text-emerald-400 font-mono">{p.open}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Catatan Info */}
      <div className="flex items-center space-x-2 text-zinc-500 italic">
        <Info className="w-4 h-4" />
        <p className="text-xs">Gunakan scroll pada tabel untuk melihat daftar lengkap pasaran.</p>
      </div>
    </div>
  );
}
